import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../types';
import { petService } from '../services/petService';
import PetImage from '../components/PetImage';

const MyPets: React.FC = () => {
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState<Pet | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMyPets();
  }, []);

  const loadMyPets = async () => {
    try {
      setLoading(true);
      // En un caso real, el servicio filtraría por userId
      const allPets = await petService.getAllPets();
      // Simular filtrado por usuario (en realidad vendría del backend)
      const userPets: Pet[] = [];
      setMyPets(userPets);
    } catch (err) {
      setError('Error al cargar tus publicaciones');
      console.error('Error loading my pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPet = (pet: Pet) => {
    navigate(`/edit-pet/${pet.id}`);
  };

  const handleDeletePet = (pet: Pet) => {
    setPetToDelete(pet);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!petToDelete) return;

    try {
      await petService.deletePet(petToDelete.id);
      setMyPets(myPets.filter(pet => pet.id !== petToDelete.id));
      setShowDeleteModal(false);
      setPetToDelete(null);
    } catch (err) {
      setError('Error al eliminar la publicación');
      console.error('Error deleting pet:', err);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPetToDelete(null);
  };

  const handlePublishNew = () => {
    navigate('/publish');
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
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>🐾 Mis Publicaciones</h1>
          <p className="text-muted">Gestiona tus publicaciones de mascotas perdidas</p>
        </div>
        <Button variant="primary" onClick={handlePublishNew}>
          <i className="bi bi-plus-circle me-2"></i>
          Nueva Publicación
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3>{myPets.length}</h3>
              <p className="text-muted mb-0">Total Publicaciones</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3>{myPets.filter(pet => !pet.found).length}</h3>
              <p className="text-muted mb-0">Sin Encontrar</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3>{myPets.filter(pet => pet.found).length}</h3>
              <p className="text-muted mb-0">Encontradas</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3>{myPets.filter(pet => pet.found).length}</h3>
              <p className="text-muted mb-0">Tasa de Éxito</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pets Grid */}
      {myPets.length > 0 ? (
        <Row>
          {myPets.map((pet) => (
            <Col key={pet.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 position-relative">
                {/* Action Buttons - Top Right */}
                <div className="position-absolute top-0 end-0 p-2" style={{ zIndex: 10 }}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-1"
                    onClick={() => handleEditPet(pet)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeletePet(pet)}
                    title="Eliminar"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>

                {/* Pet Content */}
                <div style={{ padding: '1rem' }}>
                  <PetImage src={pet.imageUrl} alt={pet.name} />
                  <Card.Body className="px-0">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{pet.name}</h5>
                      {pet.found && (
                        <span className="badge bg-success">Encontrada</span>
                      )}
                    </div>
                    <p className="text-muted mb-2">{pet.breed} • {pet.type}</p>
                    <p className="text-muted small mb-2">
                      <i className="bi bi-geo-alt me-1"></i>
                      {pet.location}
                    </p>
                    <p className="text-muted small mb-3">
                      <i className="bi bi-calendar me-1"></i>
                      Perdida el {new Date(pet.last_seen_time).toLocaleDateString()}
                    </p>
                    
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate(`/pet/${pet.id}`)}
                        className="flex-fill"
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-inbox display-1 text-muted"></i>
          <h4 className="mt-3">No tienes publicaciones</h4>
          <p className="text-muted">Comienza publicando tu primera mascota perdida</p>
          <Button variant="primary" onClick={handlePublishNew}>
            <i className="bi bi-plus-circle me-2"></i>
            Crear Primera Publicación
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar la publicación de "{petToDelete?.name}"?
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyPets; 