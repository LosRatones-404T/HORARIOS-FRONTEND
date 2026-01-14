import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, useTheme, Container } from '@mui/material';
import { IoHome } from 'react-icons/io5';

/**
 * Pantalla 404 - Página no encontrada
 * Redirige automáticamente al home después de 5 segundos
 */
function NotFound404() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.mode === 'light'
          ? theme.palette.background.default
          : theme.palette.background.default,
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 4,
            boxShadow: 8,
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >

          {/* Código 404 */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '4rem', sm: '6rem' },
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
              textShadow: theme.palette.mode === 'light' 
                ? '2px 2px 4px rgba(0,0,0,0.1)' 
                : 'none',
            }}
          >
            404
          </Typography>

          {/* Título */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            Página no encontrada
          </Typography>

          {/* Descripción */}
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              fontSize: '1.1rem',
            }}
          >
            La página que buscas no existe o ha sido movida.
          </Typography>

          {/* Countdown */}
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
              fontStyle: 'italic',
            }}
          >
            Redirigiendo al inicio en {countdown} segundo{countdown !== 1 ? 's' : ''}...
          </Typography>

          {/* Botón */}
          <Button
            variant="contained"
            size="large"
            startIcon={<IoHome size={20} />}
            onClick={handleGoHome}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 3,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
                boxShadow: 6,
              },
            }}
          >
            Volver al inicio ahora
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default NotFound404;
