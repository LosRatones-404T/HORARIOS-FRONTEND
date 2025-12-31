import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            display: 'flex',
            borderRadius: 2,
            overflow: 'hidden',
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {/* Lado izquierdo - Formulario */}
          <Box
            sx={{
              flex: 1.2,
              p: 4,
              px: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              bgcolor: 'background.default',
            }}
          >
            {/* Botón de regresar */}
            <Box sx={{ mb: 2 }}>
              <Button
                startIcon={<MdArrowBack />}
                onClick={handleBackToLogin}
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                Volver al inicio de sesión
              </Button>
            </Box>

            {/* Logo y título */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                component="img"
                src={logoUnsis}
                alt="Logo UNSIS"
                sx={{
                  height: 100,
                  mb: 1.5,
                }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                ¿Olvidaste algo?
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxWidth: 350,
                  mx: 'auto',
                  mb: 2,
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
                    borderRadius: 2,
                  }}
                >
                  Se han enviado las instrucciones a tu correo electrónico
                </Alert>
              )}

              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
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
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'primary.light',
                    borderRadius: theme => theme.shape.borderRadius * 3,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdEmail color="#666" size={20} />
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
                  py: 1.2,
                  bgcolor: 'tertiary.main',
                  '&:hover': {
                    bgcolor: 'tertiary.dark',
                  },
                  borderRadius: theme => theme.shape.borderRadius * 2,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Confirmar
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="caption" color="text.secondary">
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
