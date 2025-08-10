import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PetForm from './pages/PetForm';
import PetDetail from './pages/PetDetail';
import MyPets from './pages/MyPets';
import EditPet from './pages/EditPet';

const mainContentStyles = {
  marginLeft: '280px',
  minHeight: '100vh',
  backgroundColor: '#f8f9fa'
};

const mobileMainContentStyles = {
  marginLeft: 0,
  minHeight: '100vh',
  backgroundColor: '#f8f9fa'
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <main style={mainContentStyles} className="d-none d-lg-block">
            <Routes>

              {/* Rutas de autenticación (solo para usuarios NO autenticados) */}
              <Route path="/login" element={
                <ProtectedRoute requireAuth={false} redirectTo="/">
                  <Login />
                </ProtectedRoute>
              } />
              <Route path="/register" element={
                <ProtectedRoute requireAuth={false} redirectTo="/">
                  <Register />
                </ProtectedRoute>
              } />
              
              {/* Rutas protegidas (solo para usuarios autenticados) */}
              <Route path="/" element={
                <ProtectedRoute requireAuth={true}>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/pet/:id" element={
                <ProtectedRoute requireAuth={true}>
                  <PetDetail />
                </ProtectedRoute>
              } />
              <Route path="/publish" element={
                <ProtectedRoute>
                  <PetForm />
                </ProtectedRoute>
              } />
              <Route path="/my-pets" element={
                <ProtectedRoute>
                  <MyPets />
                </ProtectedRoute>
              } />
              <Route path="/edit-pet/:id" element={
                <ProtectedRoute>
                  <EditPet />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <main style={mobileMainContentStyles} className="d-lg-none">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/pet/:id" element={<PetDetail />} />
              
              {/* Rutas de autenticación (solo para usuarios NO autenticados) */}
              <Route path="/login" element={
                <ProtectedRoute requireAuth={false} redirectTo="/">
                  <Login />
                </ProtectedRoute>
              } />
              <Route path="/register" element={
                <ProtectedRoute requireAuth={false} redirectTo="/">
                  <Register />
                </ProtectedRoute>
              } />
              
              {/* Rutas protegidas (solo para usuarios autenticados) */}
              <Route path="/publish" element={
                <ProtectedRoute>
                  <PetForm />
                </ProtectedRoute>
              } />
              <Route path="/my-pets" element={
                <ProtectedRoute>
                  <MyPets />
                </ProtectedRoute>
              } />
              <Route path="/edit-pet/:id" element={
                <ProtectedRoute>
                  <EditPet />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 