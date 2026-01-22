import PropTypes from 'prop-types';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, IconButton, Chip, useTheme, Switch, FormControlLabel } from '@mui/material';
import { MdSchool, MdAdd, MdDelete, MdComputer, MdEdit } from 'react-icons/md';
import { useState } from 'react';

/**
 * Componente de tarjeta de materia con información completa
 * Muestra nombre, profesor, sinodales, modalidad y academia
 */
const MateriaCard = ({ 
  nombre,
  profesor,
  aplicador = '',
  sinodales = [],
  modalidad,
  academia = false,
  sx = {},
  onChange
}) => {
  const theme = useTheme();

  // Lista simulada de profesores (esto debería venir de una API)
  const profesoresDisponibles = [
    'Dr. Alejandro Jarillo Silva',
    'Dr. Amando Alejandro Ruiz Figueroa',
    'Dr. Arisel Darío Barragán López',
    'Dr. Arturo Benítez Hernández',
    'Dr. Jesús Cruz Ahuactzil',
    'Dr. José J. Hernández Barriga',
    'Dra. Aidee Cruz Barragán',
    'M.C. Enrique García Reyes',
    'M.C. Mónica Pérez Meza',
    'M.C. Teresita de J. Mijangos Martínez',
    'M.C.A.C. José Alberto Cruz Tolentino',
    'Dr. Eric Melecio Castro Leal',
    'M.C.C. Lirio Ruiz Guerra',
    'M.C.C. Silviana Juárez Chalini',
    'M.C.M. Jesús Pacheco Mendoza',
    'M.C.M. Oscar Cuauhtémoc Esperanza Contreras',
    'M.I.T.I. Oswaldo Rey Ávila Barrón',
    'M.T.C.A. Rolando Pedro Gabriel',
    'M.T.E. Everardo de Jesús Pacheco Antonio',
    'M.T.I.E. Irving Ulises Hernández Miguel',
    'M.C.C. Eliezer Alcázar Silva',
  ];

  const handleFieldChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  const handleAddSinodal = () => {
    if (sinodales.length < 3) { // Máximo 3 sinodales
      handleFieldChange('sinodales', [...sinodales, '']);
    }
  };

  const handleRemoveSinodal = (index) => {
    const newSinodales = sinodales.filter((_, i) => i !== index);
    handleFieldChange('sinodales', newSinodales);
  };

  const handleSinodalChange = (index, value) => {
    const newSinodales = [...sinodales];
    newSinodales[index] = value;
    handleFieldChange('sinodales', newSinodales);
  };

  // Color suave del background para la card
  const cardBgColor = theme.palette.mode === 'light' 
    ? theme.palette.background.paper 
    : theme.palette.background.paper;

  return (
    <Box
      sx={{
        bgcolor: cardBgColor,
        borderRadius: 2,
        p: 2.5,
        boxShadow: 2,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
        ...sx,
      }}
    >
      {/* Nombre de la materia */}
      <Box sx={{ mb: 2.5, pb: 2, borderBottom: `2px solid ${theme.palette.primary.main}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdSchool size={24} color={theme.palette.primary.main} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              color: theme.palette.text.primary,
              flex: 1,
              fontSize: '1rem'
            }}
          >
            {nombre}
          </Typography>
        </Box>
      </Box>

      {/* Profesor */}
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600, 
            color: theme.palette.text.primary,
            mb: 1,
            fontSize: '0.875rem'
          }}
        >
          Profesor
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={profesor}
            onChange={(e) => handleFieldChange('profesor', e.target.value)}
            displayEmpty
            sx={{
              bgcolor: theme.palette.mode === 'light' 
                ? theme.palette.background.default 
                : theme.palette.background.default,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>Seleccionar profesor</em>
            </MenuItem>
            {profesoresDisponibles.map((prof, index) => (
              <MenuItem key={index} value={prof}>
                {prof}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Aplicador */}
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600, 
            color: theme.palette.text.primary,
            mb: 1,
            fontSize: '0.875rem'
          }}
        >
          Aplicador
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={aplicador}
            onChange={(e) => handleFieldChange('aplicador', e.target.value)}
            displayEmpty
            sx={{
              bgcolor: theme.palette.mode === 'light' 
                ? theme.palette.background.default 
                : theme.palette.background.default,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="">
              <em>Mismo que el profesor</em>
            </MenuItem>
            {profesoresDisponibles.map((prof, index) => (
              <MenuItem key={index} value={prof}>
                {prof}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Sinodales */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600, 
              color: theme.palette.text.primary,
              fontSize: '0.875rem'
            }}
          >
            Sinodales {sinodales.length > 0 && `(${sinodales.length})`}
          </Typography>
          {sinodales.length < 3 && (
            <IconButton 
              size="small" 
              onClick={handleAddSinodal}
              sx={{ 
                color: theme.palette.primary.main,
                bgcolor: theme.palette.mode === 'light' 
                  ? theme.palette.primary.light + '30' 
                  : theme.palette.primary.dark + '30',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'light' 
                    ? theme.palette.primary.light + '50' 
                    : theme.palette.primary.dark + '50',
                }
              }}
            >
              <MdAdd size={18} />
            </IconButton>
          )}
        </Box>
        
        {sinodales.length === 0 ? (
          <Typography 
            variant="caption" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
              display: 'block',
              textAlign: 'center',
              py: 1
            }}
          >
            Sin sinodales asignados
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {sinodales.map((sinodal, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <FormControl fullWidth size="small">
                  <Select
                    value={sinodal}
                    onChange={(e) => handleSinodalChange(index, e.target.value)}
                    displayEmpty
                    sx={{
                      bgcolor: theme.palette.mode === 'light' 
                        ? theme.palette.background.default 
                        : theme.palette.background.default,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.divider,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Seleccionar sinodal</em>
                    </MenuItem>
                    {profesoresDisponibles.map((prof, idx) => (
                      <MenuItem key={idx} value={prof}>
                        {prof}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton 
                  size="small" 
                  onClick={() => handleRemoveSinodal(index)}
                  sx={{ 
                    color: theme.palette.error.main,
                    '&:hover': {
                      bgcolor: theme.palette.error.main + '20',
                    }
                  }}
                >
                  <MdDelete size={18} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Modalidad */}
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600, 
            color: theme.palette.text.primary,
            mb: 1,
            fontSize: '0.875rem'
          }}
        >
          Modalidad
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={modalidad}
            onChange={(e) => handleFieldChange('modalidad', e.target.value)}
            sx={{
              bgcolor: theme.palette.mode === 'light' 
                ? theme.palette.background.default 
                : theme.palette.background.default,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="Digital">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MdComputer size={18} />
                Digital en sala de cómputo
              </Box>
            </MenuItem>
            <MenuItem value="Tradicional">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MdEdit size={18} />
                Tradicional escrito
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Academia */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mt: 2,
        pt: 2,
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600, 
            color: theme.palette.text.primary,
            fontSize: '0.875rem'
          }}
        >
          Academia
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={academia}
              onChange={(e) => handleFieldChange('academia', e.target.checked)}
              color="primary"
            />
          }
          label={academia ? 'Sí' : 'No'}
          labelPlacement="start"
          sx={{
            m: 0,
            gap: 1,
            '& .MuiFormControlLabel-label': {
              fontWeight: 600,
              fontSize: '0.875rem',
              color: theme.palette.text.secondary,
            }
          }}
        />
      </Box>
    </Box>
  );
};

MateriaCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  profesor: PropTypes.string.isRequired,
  aplicador: PropTypes.string,
  sinodales: PropTypes.arrayOf(PropTypes.string),
  modalidad: PropTypes.oneOf(['Digital', 'Tradicional']).isRequired,
  academia: PropTypes.bool,
  sx: PropTypes.object,
  onChange: PropTypes.func,
};

export default MateriaCard;
