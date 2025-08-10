import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { petService } from '../services/petService';
import { breedsByType, provinces, provincesAndCities } from '../data/filterOptions';

const EditPet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'perro' as 'perro' | 'gato' | 'otro',
    breed: '',
    location: '',
    ownerName: '',
    ownerPhone: '',
    imageUrl: '',
    found: false
  });

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    loadPet();
  }, [id]);

  const loadPet = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const pet = await petService.getPetById(id);
      
      if (!pet) {
        setError('Mascota no encontrada');
        return;
      }

      setFormData({
        name: pet.name,
        description: pet.description,
        type: pet.type as 'perro' | 'gato' | 'otro',
        breed: pet.breed,
        location: pet.location,
        ownerName: pet.ownerName,
        ownerPhone: pet.ownerPhone,
        imageUrl: pet.imageUrl || '',
        found: pet.found || false
      });

      const locationParts = pet.location.split(', ');
      if (locationParts.length >= 2) {
        setSelectedProvince(locationParts[0]);
        setSelectedCity(locationParts[1]);
      }

    } catch (err) {
      setError('Error al cargar la mascota');
      console.error('Error loading pet:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedCity('');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const fullLocation = selectedProvince && selectedCity 
        ? `${selectedProvince}, ${selectedCity}`
        : formData.location;

      const updatedPet = {
        ...formData,
        location: fullLocation
      };

      await petService.updatePet(id, updatedPet);
      setSuccess('Mascota actualizada exitosamente');
      
      setTimeout(() => {
        navigate('/my-pets');
      }, 1500);

    } catch (err) {
      setError('Error al actualizar la mascota');
      console.error('Error updating pet:', err);
    } finally {
      setSaving(false);
    }
  };

  const getAvailableBreeds = () => {
    return breedsByType[formData.type] || [];
  };

  const getAvailableCities = () => {
    if (!selectedProvince) return [];
    return provincesAndCities[selectedProvince] || [];
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>✏️ Editar Mascota</h1>
          <p className="text-muted">Actualiza la información de tu mascota perdida</p>
        </div>
        <Button variant="outline-secondary" onClick={() => navigate('/my-pets')}>
          <i className="bi bi-arrow-left me-2"></i>
          Volver
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la mascota *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de mascota *</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="otro">Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Raza *</Form.Label>
                  <Form.Select
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona una raza</option>
                    {getAvailableBreeds().map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del dueño *</Form.Label>
                  <Form.Control
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Provincia *</Form.Label>
                  <Form.Select
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    required
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
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad *</Form.Label>
                  <Form.Select
                    value={selectedCity}
                    onChange={handleCityChange}
                    disabled={!selectedProvince}
                    required
                  >
                    <option value="">
                      {selectedProvince ? 'Selecciona una ciudad' : 'Selecciona una provincia primero'}
                    </option>
                    {getAvailableCities().map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono de contacto *</Form.Label>
              <Form.Control
                type="tel"
                name="ownerPhone"
                value={formData.ownerPhone}
                onChange={handleInputChange}
                placeholder="+54 11 1234-5678"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de la imagen</Form.Label>
              <Form.Control
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <Form.Text className="text-muted">
                Deja vacío para usar una imagen por defecto
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe las características de tu mascota, dónde se perdió, etc."
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                name="found"
                checked={formData.found}
                onChange={handleInputChange}
                label="Marcar como encontrada"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                type="submit"
                variant="primary"
                disabled={saving}
                className="flex-fill"
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Actualizando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Actualizar Mascota
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => navigate('/my-pets')}
                disabled={saving}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditPet; 