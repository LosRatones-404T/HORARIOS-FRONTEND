import PropTypes from 'prop-types';
import { Plus, Printer, FileCheck, ArrowRight } from 'lucide-react';
import Button from './Button';

/**
 * Botones de acción predefinidos para operaciones comunes
 */

export const AgregarButton = ({ onClick, children = 'Agregar', ...props }) => {
  return (
    <Button 
      variant="primary" 
      icon={<Plus size={20} strokeWidth={2.5} />} 
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export const ExportarButton = ({ onClick, children = 'Exportar', ...props }) => {
  return (
    <Button 
      variant="primary" 
      icon={<Printer size={20} strokeWidth={2.5} />} 
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export const GenerarButton = ({ onClick, children = 'Generar', ...props }) => {
  return (
    <Button 
      variant="primary" 
      icon={<Plus size={20} strokeWidth={2.5} />} 
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export const RevisarButton = ({ onClick, children = 'Revisar', ...props }) => {
  return (
    <Button 
      variant="secondary" 
      icon={<ArrowRight size={20} strokeWidth={2.5} />} 
      iconPosition="right"
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

AgregarButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

ExportarButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

GenerarButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

RevisarButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
