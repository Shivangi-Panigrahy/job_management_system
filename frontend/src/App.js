import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Container, Spinner } from 'react-bootstrap';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';

import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

const AppContent = () => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} />} 
        />
        <Route 
          path="/register" 
          element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} 
        />


        {/* Protected user routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          } 
        />

        {/* Protected admin routes */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />

        {/* Default redirect */}
        <Route 
          path="/" 
          element={
            isAuthenticated 
              ? <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} />
              : <Navigate to="/login" />
          } 
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App; 