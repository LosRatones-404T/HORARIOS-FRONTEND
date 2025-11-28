import { useState } from 'react';
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
} from '@mui/material';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import logoUnsis from '../assets/logo-unsis.png';
import loginIlustration from '../assets/login-ilustration.png';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
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
    console.log('Login:', formData);
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
              bgcolor: '#F5F7FA',
            }}
          >
            {/* Logo y título */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                component="img"
                src={logoUnsis}
                alt="Logo UNSIS"
                sx={{
                  height: 120,
                  mb: 1.5,
                }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                UNSIS
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" fontWeight="bold">
                Universidad de la Sierra Sur
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" fontWeight="Bold">
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
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
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
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#E8F0FE',
                    borderRadius: '25px',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser color="#666" />
                    </InputAdornment>
                  ),
                }}
              />

              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
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
                  mb: 1.5,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#E8F0FE',
                    borderRadius: '25px',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock color="#666" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link
                  href="#"
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.2,
                  bgcolor: '#7B318F',
                  '&:hover': {
                    bgcolor: '#6A2B7D',
                  },
                  borderRadius: 25,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Iniciar Sesión
              </Button>
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