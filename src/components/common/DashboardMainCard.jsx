import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';
import UserListItem from './UserListItem';
import Button from './Button';

/**
 * Componente principal de tarjeta del dashboard
 * Muestra contenido diferente según el tipo de usuario
 */
const DashboardMainCard = ({ 
  userType = 'admin',
  title,
  subtitle,
  actionButton,
  data = [],
  onActionClick,
  className = ''
}) => {
  // Renderiza la tarjeta de Gestión de Usuarios (Administrador)
  const renderUserManagement = () => (
    <div className="space-y-3">
      {data.map((user, index) => (
        <UserListItem
          key={index}
          nombre={user.nombre}
          email={user.email}
          rol={user.rol}
          avatar={user.avatar}
          onMenuClick={() => user.onMenuClick?.(user)}
        />
      ))}
    </div>
  );

  // Renderiza tabla de horarios (Secretaria y Jefe de Carrera)
  const renderScheduleTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="text-left text-sm font-medium border-b border-blue-400">
            <th className="pb-3 px-2">Departamento</th>
            <th className="pb-3 px-2">Autor</th>
            <th className="pb-3 px-2">Periodo</th>
            <th className="pb-3 px-2">Fecha</th>
            <th className="pb-3 px-2">Estado</th>
            <th className="pb-3 px-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-blue-400/50 hover:bg-blue-600/30 transition-colors">
              <td className="py-3 px-2 text-sm">{item.departamento}</td>
              <td className="py-3 px-2 text-sm">{item.autor}</td>
              <td className="py-3 px-2 text-sm">{item.periodo}</td>
              <td className="py-3 px-2 text-sm">{item.fecha}</td>
              <td className="py-3 px-2 text-sm">{item.estado}</td>
              <td className="py-3 px-2">
                <button
                  onClick={() => item.onAction?.(item)}
                  className="bg-blue-200 text-blue-900 px-4 py-1.5 rounded-lg hover:bg-blue-300 transition-colors text-sm font-medium"
                >
                  Revisar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Determina qué contenido mostrar según el tipo de usuario
  const renderContent = () => {
    switch (userType) {
      case 'admin':
        return renderUserManagement();
      case 'secretaria':
      case 'jefe':
        return renderScheduleTable();
      default:
        return renderUserManagement();
    }
  };

  return (
    <div className={`bg-blue-500 rounded-2xl p-6 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="text-white">
          <h2 className="text-xl font-bold mb-1">{title}</h2>
          <p className="text-blue-100 text-sm">{subtitle}</p>
        </div>
        
        {actionButton && (
          <button
            onClick={onActionClick}
            className="flex items-center gap-2 bg-pink-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-pink-400 transition-colors font-medium"
          >
            <Plus size={18} />
            {actionButton}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

DashboardMainCard.propTypes = {
  userType: PropTypes.oneOf(['admin', 'secretaria', 'jefe']).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actionButton: PropTypes.string,
  data: PropTypes.array,
  onActionClick: PropTypes.func,
  className: PropTypes.string,
};

export default DashboardMainCard;
