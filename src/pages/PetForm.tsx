import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PetForm as PetFormType } from '../types';
import { petService } from '../services/petService';
import { breedsByType, provincesAndCities, provinces } from '../data/filterOptions';

const PetForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PetFormType>({
    name: '',
    description: '',
    type: 'perro',
    breed: '',
    last_seen_time: '',
    last_seen_province: '',
    last_seen_city: '',
    imageUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState('');

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  const [errors, setErrors] = useState<Partial<PetFormType>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof PetFormType]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value;
    setSelectedProvince(province);
    // Reset city when province changes
    setFormData(prev => ({
      ...prev,
      last_seen_province: province,
      last_seen_city: ''
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          imageUrl: 'Por favor selecciona un archivo de imagen válido'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          imageUrl: 'La imagen no puede ser mayor a 5MB'
        }));
        return;
      }

      setSelectedFile(file);
      setErrors(prev => ({ ...prev, imageUrl: '' }));

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PetFormType> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre de la mascota es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!formData.breed.trim()) {
      newErrors.breed = 'La raza es requerida';
    }

    if (!formData.last_seen_province.trim()) {
      newErrors.last_seen_province = 'La provincia es requerida';
    }

    if (!formData.last_seen_city.trim()) {
      newErrors.last_seen_city = 'La ciudad es requerida';
    }

    if (!formData.last_seen_time.trim()) {
      newErrors.last_seen_time = 'La fecha es requerida';
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear FormData para enviar archivo
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('breed', formData.breed);
      formDataToSend.append('last_seen_time', formData.last_seen_time);
      formDataToSend.append('last_seen_province', formData.last_seen_province);
      formDataToSend.append('last_seen_city', formData.last_seen_city);
      
      if (selectedFile) {
        formDataToSend.append('picture', selectedFile);
      }

      // Usar el servicio para crear la mascota
      await petService.createPetWithImage(formDataToSend);
      
      // Redirigir al home después de crear exitosamente
      navigate('/');
    } catch (error) {
      setSubmitError('Error al publicar la mascota. Intenta nuevamente.');
      console.error('Error creating pet:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="text-center mb-4">
        <h2>🐾 Publicar Mascota Perdida</h2>
        <p className="text-muted">Completa la información para ayudar a encontrar tu mascota</p>
      </div>

      <Row className="justify-content-center">
        <Col xl={10} lg={11} md={12}>
          <Card>
            <Card.Body className="p-4 p-lg-5">
              {submitError && (
                <Alert variant="danger" dismissible onClose={() => setSubmitError('')}>
                  {submitError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Información básica de la mascota */}
                <div className="mb-4">
                  <h5 className="mb-3">📋 Información de la mascota</h5>
                  
                  {/* Nombre de la mascota - primer campo */}
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de la mascota *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      isInvalid={!!errors.name}
                      placeholder="Ej: Luna, Max, etc."
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Tipo y Raza en la misma fila */}
                  <Row>
                    <Col lg={6} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tipo de mascota *</Form.Label>
                        <Form.Select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                        >
                          <option value="perro">Perro</option>
                          <option value="gato">Gato</option>
                          <option value="otro">Otro</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Raza *</Form.Label>
                        <Form.Select
                          name="breed"
                          value={formData.breed}
                          onChange={handleInputChange}
                          isInvalid={!!errors.breed}
                        >
                          <option value="">Selecciona una raza</option>
                          {formData.type && breedsByType[formData.type as keyof typeof breedsByType]?.map((breed) => (
                            <option key={breed} value={breed}>
                              {breed}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.breed}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Provincia *</Form.Label>
                        <Form.Select
                          value={selectedProvince}
                          onChange={handleProvinceChange}
                        >
                          <option value="">Selecciona una provincia</option>
                          {provinces.map((province) => (
                            <option key={province} value={province}>
                              {province}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ciudad *</Form.Label>
                        <Form.Select
                          name="last_seen_city"
                          value={formData.last_seen_city}
                          onChange={handleInputChange}
                          isInvalid={!!errors.last_seen_city}
                          disabled={!selectedProvince}
                        >
                          <option value="">
                            {selectedProvince ? 'Selecciona una ciudad' : 'Selecciona una provincia primero'}
                          </option>
                          {selectedProvince && provincesAndCities[selectedProvince as keyof typeof provincesAndCities]?.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.last_seen_city}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de última vez visto *</Form.Label>
                        <Form.Control
                          type="date"
                          name="last_seen_time"
                          value={formData.last_seen_time}
                          onChange={handleInputChange}
                          isInvalid={!!errors.last_seen_time}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.last_seen_time}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Imagen de la mascota (opcional)</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          isInvalid={!!errors.imageUrl}
                        />
                        <Form.Text className="text-muted">
                          Formatos aceptados: JPG, PNG, GIF. Máximo 5MB
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                          {errors.imageUrl}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Preview de la imagen */}
                  {previewUrl && (
                    <div className="mb-3">
                      <Form.Label>Vista previa de la imagen:</Form.Label>
                      <div className="text-center">
                        <img 
                          src={previewUrl} 
                          alt="Vista previa" 
                          className="img-thumbnail" 
                          style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                      </div>
                    </div>
                  )}

                  <Form.Group className="mb-4">
                    <Form.Label>Descripción detallada *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      isInvalid={!!errors.description}
                      placeholder="Describe las características de tu mascota, color, tamaño, marcas especiales, comportamiento, última vez que la viste, etc."
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>



                {/* Botones de acción */}
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate('/')}
                    size="lg"
                  >
                    ← Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? 'Publicando...' : '🐾 Publicar Mascota'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PetForm; 