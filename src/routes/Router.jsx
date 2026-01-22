import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/common';
import Home from '../screens/Home.jsx';
import Login from '../screens/Login.jsx';
import ForgotPassword from '../screens/ForgotPassword.jsx';
import NotFound404 from '../screens/NotFound404.jsx';
import Generar from '../screens/Generar.jsx';
import Preferencias from '../screens/Preferencias.jsx';
import Calendario from '../screens/Calendario.jsx';
import Revision from '../screens/Revision.jsx';
import Usuarios from '../screens/Usuarios.jsx';
import PeriodoAcademico from '../screens/PeriodoAcademico.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Rutas principales - requieren autenticación */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Rutas de administrador - solo para admin */}
        <Route 
          path="/usuarios" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Usuarios />
            </ProtectedRoute>
          } 
        />
        
        {/* Rutas de secretaría/servicios escolares - para admin y secretaria */}
        <Route 
          path="/periodo-academico" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'escolares']}>
              <PeriodoAcademico />
            </ProtectedRoute>
          } 
        />
        
        {/* Rutas compartidas - todos los usuarios autenticados */}
        <Route 
          path="/generar" 
          element={
            <ProtectedRoute>
              <Generar />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/calendario" 
          element={
            <ProtectedRoute>
              <Calendario />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/preferencias" 
          element={
            <ProtectedRoute>
              <Preferencias />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/revision" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'escolares']}>
              <Revision />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;