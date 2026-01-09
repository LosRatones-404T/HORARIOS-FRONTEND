import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, Typography, useTheme } from '@mui/material';

/**
 * Componente de tarjeta para el dashboard
 * Muestra un título y un valor numérico
 */
const DashboardCard = ({ 
  title, 
  value, 
  onClick,
  sx = {} 
}) => {
  const theme = useTheme();
  
  const cardContent = (
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        minHeight: 140,
        textAlign: 'center',
      }}
    >
      <Typography 
        variant="body1" 
        sx={{ 
          fontWeight: 500,
          lineHeight: 1.3,
          color: theme.palette.primary.contrastText,
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 700,
          color: theme.palette.primary.contrastText,
        }}
      >
        {value}
      </Typography>
    </CardContent>
  );

  if (onClick) {
    return (
      <Card
        sx={{
          bgcolor: theme.palette.primary.main,
          borderRadius: 3,
          boxShadow: 2,
          ...sx,
        }}
      >
        <CardActionArea onClick={onClick}>
          {cardContent}
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        bgcolor: theme.palette.primary.main,
        borderRadius: 3,
        boxShadow: 2,
        ...sx,
      }}
    >
      {cardContent}
    </Card>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func,
  sx: PropTypes.object,
};

export default DashboardCard;
