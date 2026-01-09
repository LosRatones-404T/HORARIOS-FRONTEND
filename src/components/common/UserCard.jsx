import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';

/**
 * Componente de tarjeta de usuario con información y acción
 * Diseñado para mostrar información de licenciaturas/materias con estado
 */
const UserCard = ({ 
  licenciatura,
  nombre,
  codigo,
  fecha,
  estado = 'Pendiente',
  onRevisar,
  variant = 'default',
  className = ''
}) => {
  // Variantes de color basadas en el tipo de usuario/contexto
  const variants = {
    default: 'bg-blue-500',
    primary: 'bg-blue-500',
    secondary: 'bg-indigo-500',
    tertiary: 'bg-blue-600',
  };

  const bgColor = variants[variant] || variants.default;

  return (
    <div className={`${bgColor} rounded-lg p-4 shadow-md ${className}`}>
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-6 flex-1">
          <span className="font-medium">{licenciatura}</span>
          <span className="font-medium">{nombre}</span>
          <span className="font-medium">{codigo}</span>
          <span className="font-medium">{fecha}</span>
          <span className="font-medium">{estado}</span>
        </div>
        
        <button
          onClick={onRevisar}
          className="flex items-center gap-2 bg-blue-200 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-300 transition-colors font-medium"
        >
          Revisar
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  licenciatura: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  codigo: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  estado: PropTypes.string,
  onRevisar: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary']),
  className: PropTypes.string,
};

export default UserCard;
