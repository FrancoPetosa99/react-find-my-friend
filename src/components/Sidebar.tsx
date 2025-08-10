import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ProtectedComponent from './ProtectedComponent';

const sidebarStyles = {
  sidebar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    height: '100vh',
    width: '280px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    zIndex: 1000,
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
  },
  sidebarContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    padding: '1.5rem'
  },
  sidebarHeader: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255,255,255,0.2)'
  },
  sidebarBrand: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  sidebarNav: {
    flex: 1
  },
  navLink: {
    color: 'rgba(255,255,255,0.8)',
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none'
  },
  navLinkHover: {
    color: 'white',
    background: 'rgba(255,255,255,0.1)',
    textDecoration: 'none'
  },
  navLinkActive: {
    color: 'white',
    background: 'rgba(255,255,255,0.2)',
    fontWeight: 500
  },
  sidebarFooter: {
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255,255,255,0.2)'
  }
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleCloseMobileMenu = () => setShowMobileMenu(false);
  const handleShowMobileMenu = () => setShowMobileMenu(true);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="d-none d-lg-block" style={sidebarStyles.sidebar}>
        <div style={sidebarStyles.sidebarContent}>
          <div style={sidebarStyles.sidebarHeader}>
            <Link to="/" style={sidebarStyles.sidebarBrand}>
              🐾 Find My Friend
            </Link>
          </div>
          
         
          <nav style={sidebarStyles.sidebarNav}>
            <ul className="nav flex-column">
              <ProtectedComponent requireAuth={true}>
              <li className="nav-item">
                <Link 
                  to="/" 
                  style={{
                    ...sidebarStyles.navLink,
                    ...(isActive('/') ? sidebarStyles.navLinkActive : {})
                  }}
                >
                  <i className="bi bi-house-door"></i>
                  <span>Inicio</span>
                </Link>
              </li>
              </ProtectedComponent>
              
              
                <ProtectedComponent requireAuth={true}>
                  <li className="nav-item">
                    <Link 
                      to="/publish" 
                      style={{
                        ...sidebarStyles.navLink,
                        ...(isActive('/publish') ? sidebarStyles.navLinkActive : {})
                      }}
                    >
                      <i className="bi bi-plus-circle"></i>
                      <span>Publicar Mascota</span>
                    </Link>
                  </li>
                </ProtectedComponent>

                <ProtectedComponent requireAuth={false}>
              <li className="nav-item">
                <Link 
                  to="/login" 
                  style={{
                    ...sidebarStyles.navLink,
                    ...(isActive('/login') ? sidebarStyles.navLinkActive : {})
                  }}
                >
                  <i className="bi bi-person"></i>
                  <span>Iniciar Sesión</span>
                </Link>
              </li>
                </ProtectedComponent>

                <ProtectedComponent requireAuth={false}>
              <li className="nav-item">
                <Link 
                  to="/register" 
                  style={{
                    ...sidebarStyles.navLink,
                    ...(isActive('/register') ? sidebarStyles.navLinkActive : {})
                  }}
                >
                  <i className="bi bi-person-plus"></i>
                  <span>Registrarse</span>
                  </Link>
                </li>
              </ProtectedComponent>
            </ul>
          </nav>
          
          {isAuthenticated && (
            <div style={sidebarStyles.sidebarFooter}>
              <div className="mb-2">
                <small className="text-muted">Bienvenido</small>
              </div>
              <Button variant="outline-danger" size="sm" className="w-100" onClick={logout}>
                <i className="bi bi-box-arrow-right"></i>
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="d-lg-none mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            🐾 Find My Friend
          </Navbar.Brand>
          <Button
            variant="outline-light"
            onClick={handleShowMobileMenu}
            className="d-lg-none"
          >
            <i className="bi bi-list"></i>
          </Button>
        </Container>
      </Navbar>

      {/* Mobile Menu Offcanvas */}
      <Offcanvas show={showMobileMenu} onHide={handleCloseMobileMenu} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>🐾 Find My Friend</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">

            <ProtectedComponent requireAuth={true}>
              <Nav.Link 
                as={Link} 
                to="/" 
                active={isActive('/')}
                onClick={handleCloseMobileMenu}
              >
                <i className="bi bi-house-door me-2"></i>
                Inicio
              </Nav.Link>
            </ProtectedComponent>

            <ProtectedComponent requireAuth={true}>
              <Nav.Link 
                as={Link} 
                to="/publish" 
                active={isActive('/publish')}
                onClick={handleCloseMobileMenu}
              >
              <i className="bi bi-plus-circle me-2"></i>
                Publicar Mascota
              </Nav.Link>
            </ProtectedComponent>
        
            <ProtectedComponent requireAuth={false}>
            <Nav.Link 
              as={Link} 
              to="/login" 
              active={isActive('/login')}
              onClick={handleCloseMobileMenu}
            >
              <i className="bi bi-person me-2"></i>
              Iniciar Sesión
            </Nav.Link>
            </ProtectedComponent>

            <ProtectedComponent requireAuth={false}>
            <Nav.Link 
              as={Link} 
              to="/register" 
              active={isActive('/register')}
              onClick={handleCloseMobileMenu}
            >
              <i className="bi bi-person-plus me-2"></i>
              Registrarse
            </Nav.Link>
            </ProtectedComponent>

            <ProtectedComponent requireAuth={true}>
              <Button variant="outline-danger" className="mt-3" onClick={logout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Cerrar Sesión
              </Button>
            </ProtectedComponent>
           
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar; 