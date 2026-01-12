import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Container,
  Paper,
  Link,
  Alert,
} from '@mui/material';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import logoUnsis from '../assets/logo-unsis.png';
import loginIlustration from '../assets/login-ilustration.png';
import { login } from '../store/authStore';

function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!formData.usuario || !formData.contrasena) {
      setError('Por favor completa todos los campos');
      return;
    }

    // Intentar autenticar
    const result = login(formData.usuario, formData.contrasena);
    
    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
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
            {/* Logo y título */}
            <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
              <Box
                component="img"
                src={logoUnsis}
                alt="Logo UNSIS"
                sx={{
                  height: { xs: 80, sm: 100, md: 120 },
                  mb: 1.5,
                }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                UNSIS
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" fontWeight="bold" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Universidad de la Sierra Sur
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" fontWeight="Bold" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Miahuatlán de Porfirio Díaz, Oaxaca
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
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                Usuario
              </Typography>
              <TextField
                fullWidth
                name="usuario"
                placeholder="Ingresa tu usuario"
                value={formData.usuario}
                onChange={handleChange}
                size="small"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                    borderRadius: theme => theme.shape.borderRadius * 3,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser color="#666" size={14} />
                    </InputAdornment>
                  ),
                }}
              />

              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                Contraseña
              </Typography>
              <TextField
                fullWidth
                name="contrasena"
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                value={formData.contrasena}
                onChange={handleChange}
                size="small"
                sx={{
                  mb: { xs: 1, sm: 1.5 },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                    borderRadius: theme => theme.shape.borderRadius * 3,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock color="#666" size={14} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right', mb: { xs: 1.5, sm: 2 } }}>
                <Link
                  component="button"
                  type="button"
                  onClick={handleForgotPassword}
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
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
                Iniciar Sesión
              </Button>

              {/* Credenciales de prueba */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                  Credenciales de prueba:
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontFamily: 'monospace' }}>
                  admin / pass123
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontFamily: 'monospace' }}>
                  secretaria / pass123
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontFamily: 'monospace' }}>
                  jefe / pass123
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

export default Login;