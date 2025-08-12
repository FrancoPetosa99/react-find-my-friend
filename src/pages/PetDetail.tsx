import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge, Button, Alert, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { PetDetail as PetDetailView } from '../types';
import { petService } from '../services/petService';
import PetImage from '../components/PetImage';

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<PetDetailView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [markingAsFound, setMarkingAsFound] = useState(false);

  useEffect(() => {
    const loadPet = async () => {
      if (!id) {
        setError('ID de mascota no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const petData = await petService.getPetById(id);
        
        if (petData) {
          setPet(petData);
        } else {
          setError('Mascota no encontrada');
        }
      } catch (err) {
        setError('Error al cargar la información de la mascota');
        console.error('Error loading pet:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [id]);

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'perro': return 'primary';
      case 'gato': return 'success';
      default: return 'secondary';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEdit = () => {
    navigate(`/edit-pet/${pet?.id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!pet) return;

    try {
      setDeleting(true);
      await petService.deletePet(pet.id);
      navigate('/');
    } catch (err) {
      setError('Error al eliminar la publicación');
      console.error('Error deleting pet:', err);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleMarkAsFound = async () => {
    if (!pet) return;

    try {
      setMarkingAsFound(true);
      await petService.markPetAsFound(pet.id);
      setPet({ ...pet, found: true });
      setError('');
    } catch (err) {
      setError('Error al marcar la mascota como encontrada');
      console.error('Error marking pet as found:', err);
    } finally {
      setMarkingAsFound(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Container>
    );
  }

  if (error || !pet) {
    return (
              <Container className="py-5">
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>{error || 'No se pudo cargar la información de la mascota'}</p>
            <Button variant="outline-danger" onClick={() => navigate('/')}>
              Volver al inicio
            </Button>
          </Alert>
        </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/')}
        >
          ← Volver al inicio
        </Button>
        
        {(pet.can_edit && pet.can_delete) && (
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={handleEdit}>
              <i className="bi bi-pencil me-2"></i>
              Editar
            </Button>
            <Button variant="outline-danger" onClick={handleDelete}>
              <i className="bi bi-trash me-2"></i>
              Eliminar
            </Button>
          </div>
        )}
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <div style={{ height: '400px', overflow: 'hidden' }}>
              <PetImage
                src={pet.imageUrl || '/images/pets/default-pet.jpg'}
                alt={pet.name}
                className="w-100 h-100"
              />
            </div>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <Card.Title className="h2 mb-1">{pet.name}</Card.Title>
                  <Badge bg={getTypeBadgeVariant(pet.type)} className="fs-6">
                    {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
                  </Badge>
                </div>
                <small className="text-muted">
                  Perdido: {formatDate(pet.createdAt)}
                </small>
              </div>

              <Card.Text className="fs-5 mb-3">
                {pet.description}
              </Card.Text>

              <Row className="mb-3">
                <Col md={6}>
                  <strong>Raza:</strong> {pet.breed}
                </Col>
                <Col md={6}>
                  <strong>Ubicación:</strong> {pet.location}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">💡 ¿Viste esta mascota?</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">
                Si has visto a {pet.name}, por favor contacta inmediatamente al dueño. 
                Cualquier información puede ser muy valiosa para encontrarla.
              </p>
              {pet.ownerName !== 'Información no disponible' && pet.ownerPhone !== 'Información no disponible' ? (
                <div className="d-grid gap-2">
                  <Button variant="primary" href={`tel:${pet.ownerPhone}`}>
                    📞 Llamar al dueño
                  </Button>
                  <Button variant="outline-primary" href={`https://wa.me/${pet.ownerPhone.replace(/\D/g, '')}`}>
                    💬 Enviar WhatsApp
                  </Button>
                </div>
              ) : (
                <Alert variant="info">
                  <i className="bi bi-info-circle me-2"></i>
                  La información de contacto del dueño no está disponible en este momento.
                </Alert>
              )}
            </Card.Body>
          </Card>
          {pet.can_edit && !pet.found && (
            <Card className="mt-3">
              <Card.Header>
                <h5 className="mb-0">✅ Marcar como encontrada</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-3">
                  Si has encontrado a {pet.name}, puedes marcar esta publicación como resuelta.
                </p>
                <div className="d-grid">
                  <Button 
                    variant="success" 
                    onClick={handleMarkAsFound}
                    disabled={markingAsFound}
                  >
                    {markingAsFound ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Marcando como encontrada...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Marcar como encontrada
                      </>
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
          {pet.found && (
            <Card className="mt-3 border-success">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">🎉 ¡Mascota encontrada!</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-success mb-0">
                  <i className="bi bi-check-circle me-2"></i>
                  {pet.name} ha sido marcada como encontrada. ¡Gracias por usar nuestra plataforma!
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar la publicación de "{pet?.name}"?
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmDelete}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PetDetail; 