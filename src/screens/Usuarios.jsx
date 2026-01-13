import { Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import UsuariosAdmin from '../components/usuarios/UsuariosAdmin';
import { getCurrentUser } from '../store/authStore';

function Usuarios() {
  const user = getCurrentUser();

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Solo admin puede acceder a esta sección
  if (user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return (
    <MainLayout showSidebar={true}>
      <UsuariosAdmin />
    </MainLayout>
  );
}

export default Usuarios;
