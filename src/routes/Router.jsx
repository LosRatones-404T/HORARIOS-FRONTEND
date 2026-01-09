import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../screens/Home.jsx';
import Login from '../screens/Login.jsx';
import ForgotPassword from '../screens/ForgotPassword.jsx';
import NotFound404 from '../screens/NotFound404.jsx';
import Horarios from '../screens/Horarios.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Rutas principales */}
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        
        {/* Rutas de administrador */}
        <Route path="/profesores" element={<Home />} />
        <Route path="/materias" element={<Home />} />
        <Route path="/aulas" element={<Home />} />
        
        {/* Rutas compartidas */}
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/generar" element={<Home />} />
        <Route path="/configuracion" element={<Home />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;