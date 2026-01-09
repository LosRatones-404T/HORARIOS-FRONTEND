import PropTypes from 'prop-types';
import { FiUser } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';

/**
 * Componente universal de lista de usuarios
 * Muestra avatar, nombre, email, rol y menú de opciones
 */
const UserListItem = ({ 
  nombre,
  email,
  rol,
  avatar,
  onMenuClick,
  className = ''
}) => {
  return (
    <div className={`bg-blue-500 rounded-lg p-4 flex items-center justify-between hover:bg-blue-600 transition-colors ${className}`}>
      <div className="flex items-center gap-4 flex-1">
        {/* Avatar */}
        <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center text-white">
          {avatar ? (
            <img src={avatar} alt={nombre} className="w-full h-full rounded-full object-cover" />
          ) : (
            <FiUser size={20} />
          )}
        </div>

        {/* Información del usuario */}
        <div className="flex-1">
          <h3 className="text-white font-medium">{nombre}</h3>
          <p className="text-blue-100 text-sm">{email}</p>
        </div>

        {/* Rol */}
        <div className="text-white font-medium px-4">
          {rol}
        </div>
      </div>

      {/* Menú de opciones */}
      <button
        onClick={onMenuClick}
        className="text-white hover:bg-blue-400 p-2 rounded-lg transition-colors"
        aria-label="Opciones"
      >
        <BsThreeDotsVertical size={20} />
      </button>
    </div>
  );
};

UserListItem.propTypes = {
  nombre: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  rol: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  onMenuClick: PropTypes.func,
  className: PropTypes.string,
};

export default UserListItem;
