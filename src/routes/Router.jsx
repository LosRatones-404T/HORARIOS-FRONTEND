import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../screens/Home.jsx';
import Login from '../screens/Login.jsx';
import ForgotPassword from '../screens/ForgotPassword.jsx';
import NotFound404 from '../screens/NotFound404.jsx';
import Generar from '../screens/Generar.jsx';
import Preferencias from '../screens/Preferencias.jsx';
import Calendario from '../screens/Calendario.jsx';
import Revision from '../screens/Revision.jsx';

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
        <Route path="/generar" element={<Generar />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/preferencias" element={<Preferencias />} />
        <Route path="/revision" element={<Revision />} />
        <Route path="/generar" element={<Home />} />
        <Route path="/configuracion" element={<Home />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;