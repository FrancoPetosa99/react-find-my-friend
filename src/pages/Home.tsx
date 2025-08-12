import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Pet, FilterOptions } from '../types';
import { petService } from '../services/petService';
import PetCard from '../components/PetCard';
import Pagination from '../components/Pagination';
import { breedsByType, cities } from '../data/filterOptions';
import { useNavigate } from 'react-router-dom';

const heroSectionStyles = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '4rem 0',
  marginBottom: '2rem',
  textAlign: 'center' as const,
  borderRadius: '0.375rem'
};

const Home: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        const petsData = await petService.getAllPets();
        setPets(petsData);
        setFilteredPets(petsData);
      } catch (err) {
        setError('Error al cargar las mascotas');
        console.error('Error loading pets:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    
    if (key === 'type') {
      newFilters.breed = '';
    }
    
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters: FilterOptions) => {
    let filtered = pets;

    if (currentFilters.type) {
      filtered = filtered.filter(pet => pet.type === currentFilters.type);
    }

    if (currentFilters.breed) {
      filtered = filtered.filter(pet => pet.breed === currentFilters.breed);
    }

    if (currentFilters.city) {
      filtered = filtered.filter(pet => pet.location.includes(currentFilters.city!));
    }

    setFilteredPets(filtered);
    setCurrentPage(1);
  };

  const getAvailableBreeds = () => {
    if (!filters.type) {
      return [];
    }
    return breedsByType[filters.type as keyof typeof breedsByType] || [];
  };



  return (
    <Container>
      <div style={heroSectionStyles} className="mb-4">
        <h1>🐾 Encuentra tu mascota perdida</h1>
        <p className="lead">Ayudamos a reunir familias con sus mascotas perdidas</p>
        <Button variant="light" size="lg" onClick={() => navigate('/publish')}>
          Publicar Mascota Perdida
        </Button>
      </div>
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Tipo de mascota</Form.Label>
                <Form.Select
                  value={filters.type || ''}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="">Todos los tipos</option>
                  <option value="perro">Perro</option>
                  <option value="gato">Gato</option>
                  <option value="otro">Otro</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Raza</Form.Label>
                <Form.Select
                  value={filters.breed || ''}
                  onChange={(e) => handleFilterChange('breed', e.target.value)}
                  disabled={!filters.type}
                >
                  <option value="">
                    {filters.type ? 'Todas las razas' : 'Selecciona un tipo primero'}
                  </option>
                  {getAvailableBreeds().map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Ciudad</Form.Label>
                <Form.Select
                  value={filters.city || ''}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                >
                  <option value="">Todas las ciudades</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => {
                  setFilters({});
                  setFilteredPets(pets);
                }}
              >
                Limpiar filtros
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="mb-3">
        <h4>Mascotas perdidas ({filteredPets.length})</h4>
      </div>
      <Row>
        {filteredPets
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((pet) => (
            <Col key={pet.id} lg={4} md={6} className="mb-4">
              <PetCard pet={pet} />
            </Col>
          ))}
      </Row>
      {filteredPets.length > 0 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPets.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            totalItems={filteredPets.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
      {filteredPets.length === 0 && (
        <div className="text-center py-5">
          <h5>No se encontraron mascotas con los filtros aplicados</h5>
          <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </Container>
  );
};

export default Home; 