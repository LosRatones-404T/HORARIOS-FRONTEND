import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Container,
  Paper,
  Link,
  Alert,
} from '@mui/material';
import { MdEmail, MdArrowBack } from 'react-icons/md';
import logoUnsis from '../assets/logo-unsis.png';
import loginIlustration from '../assets/login-ilustration.png';

function ForgotPassword() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recuperar contraseña para:', email);
    setSubmitted(true);
    // Aquí iría la lógica para enviar el correo de recuperación
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        py: { xs: 3, sm: 4 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            display: 'flex',
            borderRadius: { xs: 1, sm: 2 },
            overflow: 'hidden',
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {/* Lado izquierdo - Formulario */}
          <Box
            sx={{
              flex: 1.2,
              p: { xs: 3, sm: 4, md: 4 },
              px: { xs: 3, sm: 4, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              bgcolor: 'background.default',
            }}
          >
            {/* Botón de regresar */}
            <Box sx={{ mb: { xs: 3, sm: 4 }, mt: { xs: -1, sm: -2 } }}>
              <Button
                startIcon={<MdArrowBack size={16} />}
                onClick={handleBackToLogin}
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  p: { xs: 0.5, sm: 1 },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                Volver al inicio de sesión
              </Button>
            </Box>

            {/* Logo y título */}
            <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
              <Box
                component="img"
                src={logoUnsis}
                alt="Logo UNSIS"
                sx={{
                  height: { xs: 70, sm: 90, md: 100 },
                  mb: 1.5,
                }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                ¿Olvidaste algo?
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxWidth: 350,
                  mx: 'auto',
                  mb: 2,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  px: { xs: 1, sm: 0 },
                }}
              >
                Ingresa tu correo para recibir instrucciones para restablecer tu contraseña
              </Typography>
            </Box>

            {/* Formulario */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                maxWidth: 400,
                mx: 'auto',
                width: '100%',
              }}
            >
              {submitted && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 2,
                    borderRadius: { xs: 1, sm: 2 },
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  }}
                >
                  Se han enviado las instrucciones a tu correo electrónico
                </Alert>
              )}

              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                Correo
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                required
                sx={{
                  mb: { xs: 2, sm: 3 },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                    borderRadius: theme => theme.shape.borderRadius * 3,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdEmail color="#666" size={18} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!email || submitted}
                sx={{
                  py: { xs: 1, sm: 1.2 },
                  bgcolor: theme.palette.tertiary.main,
                  '&:hover': {
                    bgcolor: theme.palette.tertiary.dark,
                  },
                  borderRadius: theme.shape.borderRadius * 2,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                }}
              >
                Confirmar
              </Button>

              <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 3 } }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  ¿Recordaste tu contraseña?{' '}
                  <Link
                    component="button"
                    type="button"
                    onClick={handleBackToLogin}
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Iniciar sesión
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Lado derecho - Imagen/Ilustración */}
          <Box
            sx={{
              flex: 1.3,
              bgcolor: 'primary.light',
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Box
              component="img"
              src={loginIlustration}
              alt="Ilustración de login"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 2,
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
