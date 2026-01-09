import PropTypes from 'prop-types';

/**
 * Componente de botón reutilizable con soporte para iconos y variantes
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon, 
  iconPosition = 'left',
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-purple-300 text-gray-800 hover:bg-purple-400 active:bg-purple-500',
    secondary: 'bg-blue-300 text-white hover:bg-blue-400 active:bg-blue-500',
    outline: 'border-2 border-purple-300 text-purple-800 hover:bg-purple-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };

  const variantStyle = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyle} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="text-xl">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="text-xl">{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
