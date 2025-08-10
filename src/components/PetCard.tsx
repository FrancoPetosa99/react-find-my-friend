import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Pet } from '../types';
import PetImage from './PetImage';
import { useNavigate } from 'react-router-dom';

const petCardStyles = {
  card: {
    transition: 'transform 0.2s',
    cursor: 'pointer',
    height: '100%',
    position: 'relative' as const
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  }
};

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'perro': return 'primary';
      case 'gato': return 'success';
      default: return 'secondary';
    }
  };

  const cardStyle = {
    ...petCardStyles.card,
    ...(isHovered && petCardStyles.cardHover)
  };

  return (
    <Card 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de "Encontrada" - esquina superior derecha */}
      {pet.found && (
        <div className="position-absolute top-0 end-0 m-2 z-1">
          <Badge bg="success" className="px-2 py-1 shadow-sm">
            ✅ Encontrada
          </Badge>
        </div>
      )}
      
      <div className="card-img-top" style={{ height: '200px', overflow: 'hidden' }}>
        <PetImage
          src={pet.imageUrl || '/images/pets/default-pet.jpg'}
          alt={pet.name}
          className="w-100 h-100"
        />
      </div>
      
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{pet.name}</Card.Title>
          <Badge bg={getTypeBadgeVariant(pet.type)}>{pet.type}</Badge>
        </div>
        
        <Card.Text className="text-muted small mb-2">
          <strong>Raza:</strong> {pet.breed}
        </Card.Text>
        
        <Card.Text className="text-muted small mb-2">
          <strong>Ubicación:</strong> {pet.location}
        </Card.Text>
        
        <Card.Text className="mb-3">
          {pet.description.length > 100 
            ? `${pet.description.substring(0, 100)}...` 
            : pet.description
          }
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Perdido: {pet.createdAt.toLocaleDateString()}
          </small>
          <Button variant="outline-primary" size="sm" onClick={() => navigate(`/pet/${pet.id}`)}>
            Ver detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PetCard; 