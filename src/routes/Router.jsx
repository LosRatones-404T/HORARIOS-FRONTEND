import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../screens/Home.jsx';
import Login from '../screens/Login.jsx';
import ForgotPassword from '../screens/ForgotPassword.jsx';
import NotFound from '../screens/NotFound.jsx';
import Horarios from '../screens/Horarios.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;