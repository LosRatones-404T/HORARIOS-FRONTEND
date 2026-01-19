import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../../store/authStore';

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente hijo a renderizar si está autenticado
 * @param {Array<string>} props.allowedRoles - Roles permitidos (opcional)
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Verificar si está autenticado
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si hay roles especificados, verificar que el usuario tenga uno de ellos
  if (allowedRoles.length > 0) {
    const user = getCurrentUser();
    
    if (!user || !allowedRoles.includes(user.role)) {
      // Si no tiene el rol necesario, redirigir al home
      return <Navigate to="/home" replace />;
    }
  }

  // Si está autenticado y tiene el rol correcto, renderizar el componente
  return children;
};

export default ProtectedRoute;
