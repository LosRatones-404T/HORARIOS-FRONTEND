import PropTypes from 'prop-types';

/**
 * Componente de tarjeta para el dashboard
 * Muestra un título y un valor numérico
 */
const DashboardCard = ({ 
  title, 
  value, 
  onClick,
  className = '' 
}) => {
  const CardWrapper = onClick ? 'button' : 'div';
  
  return (
    <CardWrapper
      onClick={onClick}
      className={`
        bg-blue-500 
        rounded-2xl 
        p-6 
        shadow-md 
        text-white 
        text-center
        min-h-[140px]
        flex 
        flex-col 
        items-center 
        justify-center
        gap-3
        ${onClick ? 'hover:bg-blue-600 cursor-pointer transition-colors' : ''}
        ${className}
      `}
    >
      <h3 className="text-base font-medium leading-tight">
        {title}
      </h3>
      <p className="text-4xl font-bold">
        {value}
      </p>
    </CardWrapper>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default DashboardCard;
