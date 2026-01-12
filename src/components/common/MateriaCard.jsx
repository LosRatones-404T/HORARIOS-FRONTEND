import PropTypes from 'prop-types';
import { Box, Typography, Chip, TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, useTheme } from '@mui/material';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';

/**
 * Componente de tarjeta de materia con información completa
 * Muestra nombre, profesor, sinodales, modalidad y academia
 */
const MateriaCard = ({ 
  nombre,
  profesor,
  sinodales = [],
  modalidad,
  academia = false,
  variant = 'default',
  sx = {},
  onChange
}) => {
  const theme = useTheme();

  const handleFieldChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  // Variantes de color basadas en el contexto
  const variants = {
    default: theme.palette.primary.main,
    primary: theme.palette.primary.main,
    secondary: theme.palette.primary.light,
    tertiary: theme.palette.primary.dark,
  };

  const bgColor = variants[variant] || variants.default;

  return (
    <Box
      sx={{
        bgcolor: bgColor,
        borderRadius: 2,
        p: 2.5,
        boxShadow: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
        ...sx,
      }}
    >
      {/* Nombre de la materia */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <MdSchool size={22} color={theme.palette.primary.contrastText} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            color: theme.palette.primary.contrastText,
            flex: 1
          }}
        >
          {nombre}
        </Typography>
      </Box>

      {/* Profesor */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <FaChalkboardTeacher 
            size={16} 
            color={theme.palette.primary.contrastText} 
          />
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 500, 
              color: theme.palette.primary.contrastText 
            }}
          >
            Profesor:
          </Typography>
        </Box>
        <TextField
          fullWidth
          size="small"
          value={profesor}
          onChange={(e) => handleFieldChange('profesor', e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        />
      </Box>

      {/* Sinodales */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <FaUserGraduate 
            size={16} 
            color={theme.palette.primary.contrastText}
          />
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 500, 
              color: theme.palette.primary.contrastText
            }}
          >
            Sinodales:
          </Typography>
        </Box>
        <TextField
          fullWidth
          size="small"
          value={sinodales.join(', ')}
          onChange={(e) => handleFieldChange('sinodales', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
          placeholder="Separar por comas"
          multiline
          rows={2}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        />
      </Box>

      {/* Modalidad y Academia */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: 'column' }}>
        <FormControl size="small" fullWidth>
          <InputLabel sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            px: 0.5
          }}>Modalidad</InputLabel>
          <Select
            value={modalidad}
            label="Modalidad"
            onChange={(e) => handleFieldChange('modalidad', e.target.value)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            <MenuItem value="Digital">Digital (Sala de cómputo)</MenuItem>
            <MenuItem value="Tradicional">Tradicional (A mano)</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={academia}
              onChange={(e) => handleFieldChange('academia', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: theme.palette.success.main,
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: theme.palette.success.main,
                },
              }}
            />
          }
          label={
            <Typography sx={{ color: theme.palette.primary.contrastText, fontWeight: 500 }}>
              Academia
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};

MateriaCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  profesor: PropTypes.string.isRequired,
  sinodales: PropTypes.arrayOf(PropTypes.string),
  modalidad: PropTypes.oneOf(['Digital', 'Tradicional']).isRequired,
  academia: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary']),
  sx: PropTypes.object,
  onChange: PropTypes.func,
};

export default MateriaCard;
