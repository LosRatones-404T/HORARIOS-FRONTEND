import { 
  Box,
  Typography, 
  Card,
  CardContent,
  Button,
  useTheme,
  Stack,
  Chip,
  TextField,
  Alert,
  AlertTitle,
  IconButton,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  MdPersonAdd,
  MdRefresh,
  MdDelete,
  MdEdit,
  MdClose,
  MdSearch,
  MdInfo,
  MdSettings
} from 'react-icons/md';
import { useState, useEffect } from 'react';
import { authApi, usersApi } from '../../services';

// Mapeo de roles del backend al frontend
const mapRoleToFrontend = (backendRole) => {
  const roleMap = {
    'ADMIN': 'admin',
    'JEFE_CARRERA': 'jefe',
    'JEFE_ESCOLARES': 'escolares',
    'SECRETARIA': 'escolares',
  };
  return roleMap[backendRole] || backendRole.toLowerCase();
};

// Mapeo de roles del frontend al backend
const mapRoleToBackend = (frontendRole) => {
  const roleMap = {
    'admin': 'ADMIN',
    'jefe': 'JEFE_CARRERA',
    'escolares': 'SECRETARIA', // Por defecto usamos SECRETARIA para escolares
  };
  return roleMap[frontendRole] || 'SECRETARIA';
};

const UsuariosAdmin = () => {
  const theme = useTheme();
  
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados principales
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRol, setFilterRol] = useState('todos');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Formulario de usuario
  const [formData, setFormData] = useState({ username: '', email: '', rol: 'jefe', password: '' });
  const [isNewUser, setIsNewUser] = useState(false);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersApi.getAllUsers();
      
      // Mapear usuarios del backend al formato del frontend
      const mappedUsers = data.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email || '',
        rol: mapRoleToFrontend(user.role),
        roleBackend: user.role, // Guardar rol original del backend
        estado: user.is_active ? 'activo' : 'inactivo',
        ultimaActividad: new Date().toISOString().split('T')[0] // Por ahora usar fecha actual
      }));
      
      setUsuarios(mappedUsers);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setErrorMessage('Error al cargar usuarios: ' + error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsuarios = usuarios.filter(u => {
    const matchSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRol === 'todos' || u.rol === filterRol;
    return matchSearch && matchRole;
  });

  const handleEditUser = (usuario) => {
    setSelectedUsuario(usuario);
    setFormData({ 
      username: usuario.username, 
      email: usuario.email, 
      rol: usuario.rol,
      password: ''
    });
    setIsNewUser(false);
    setOpenEditDialog(true);
  };

  const handleNewUser = () => {
    setIsNewUser(true);
    setFormData({ username: '', email: '', rol: 'jefe', password: '' });
    setSelectedUsuario(null);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUsuario(null);
    setFormData({ username: '', email: '', rol: 'jefe', password: '' });
    setIsNewUser(false);
    setErrorMessage(''); // Limpiar errores al cerrar
  };

  const handleSaveUser = async () => {
    if (!formData.username.trim() || !formData.email.trim()) {
      setErrorMessage('Por favor, completa todos los campos');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (isNewUser && !formData.password.trim()) {
      setErrorMessage('La contraseña es requerida para nuevos usuarios');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setLoadingSave(true);
    setErrorMessage('');

    try {
      if (isNewUser) {
        // Registrar nuevo usuario
        const userData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: mapRoleToBackend(formData.rol)
        };
        
        await authApi.register(userData);
        setSuccessMessage(`Usuario ${formData.username} creado exitosamente`);
        
        // Recargar la lista de usuarios
        await loadUsers();
        handleCloseEditDialog();
      } else {
        // Actualizar usuario existente
        const promises = [];
        
        // Cambiar rol si cambió
        if (mapRoleToBackend(formData.rol) !== selectedUsuario.roleBackend) {
          promises.push(usersApi.changeRole(selectedUsuario.username, mapRoleToBackend(formData.rol)));
        }
        
        // Cambiar email si cambió
        if (formData.email !== selectedUsuario.email) {
          promises.push(usersApi.changeEmail(selectedUsuario.username, formData.email));
        }
        
        await Promise.all(promises);
        setSuccessMessage(`Usuario ${formData.username} actualizado exitosamente`);
        
        // Recargar la lista de usuarios
        await loadUsers();
        handleCloseEditDialog();
      }

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setErrorMessage('Error al guardar: ' + error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleToggleActive = async () => {
    if (!selectedUsuario) return;

    try {
      await usersApi.toggleActive(selectedUsuario.username);
      setSuccessMessage(`Usuario ${selectedUsuario.username} ${selectedUsuario.estado === 'activo' ? 'desactivado' : 'activado'}`);
      setTimeout(() => setSuccessMessage(''), 5000);
      
      // Recargar usuarios
      await loadUsers();
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      setErrorMessage('Error al cambiar estado: ' + error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleOpenResetDialog = () => {
    setNewPassword('');
    setOpenResetDialog(true);
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      setErrorMessage('Por favor, ingresa una contraseña');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setLoadingReset(true);
    setErrorMessage('');

    try {
      await usersApi.updatePassword(selectedUsuario.username, newPassword);
      setSuccessMessage(`Contraseña actualizada para ${selectedUsuario.username}`);
      setTimeout(() => setSuccessMessage(''), 5000);
      setOpenResetDialog(false);
      setNewPassword('');
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      setErrorMessage('Error al actualizar contraseña: ' + error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setLoadingReset(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUsuario) return;

    setLoadingDelete(true);
    setErrorMessage('');

    try {
      await usersApi.deleteUser(selectedUsuario.username);
      setSuccessMessage(`Usuario ${selectedUsuario.username} eliminado exitosamente`);
      setTimeout(() => setSuccessMessage(''), 5000);
      setOpenDeleteDialog(false);
      
      // Recargar usuarios
      await loadUsers();
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setErrorMessage('Error al eliminar usuario: ' + error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <Box sx={{ 
      py: 4, 
      px: { xs: 2, md: 3 },
      maxWidth: '1600px',
      mx: 'auto',
      width: '100%'
    }}>
      {/* Encabezado con Botón Destacado */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
            Gestión de Usuarios
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Crea, edita y gestiona usuarios del sistema
          </Typography>
        </Box>
        
        {/* Botón Nuevo Usuario - Grande y Destacado */}
        <Button
          variant="contained"
          size="large"
          startIcon={<MdPersonAdd size={28} />}
          onClick={handleNewUser}
          sx={{ 
            textTransform: 'none', 
            fontWeight: 700,
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
            borderRadius: 3,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s'
          }}
        >
          Nuevo Usuario
        </Button>
      </Box>

      {/* Mensajes */}
      {successMessage && (
        <Alert severity="success" sx={{ borderRadius: 3, mb: 3 }} onClose={() => setSuccessMessage('')}>
          <AlertTitle sx={{ fontWeight: 600 }}>Éxito</AlertTitle>
          {successMessage}
        </Alert>
      )}
      
      {errorMessage && (
        <Alert severity="error" sx={{ borderRadius: 3, mb: 3 }} onClose={() => setErrorMessage('')}>
          <AlertTitle sx={{ fontWeight: 600 }}>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
          <CircularProgress size={60} />
        </Box>
      ) : usuarios.length === 0 ? (
        <Paper 
          elevation={0}
          sx={{ 
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 4,
            p: 6,
            textAlign: 'center',
            bgcolor: 'background.paper'
          }}
        >
          <MdPersonAdd size={64} color={theme.palette.text.secondary} />
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 600, color: 'text.secondary' }}>
            No hay usuarios en el sistema
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
            Comienza creando un nuevo usuario con el botón de arriba
          </Typography>
        </Paper>
      ) : (
        <Paper 
          elevation={0} 
          sx={{ 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: 'background.paper'
          }}
        >
          {/* Barra de Búsqueda y Filtros */}
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField
                fullWidth
                placeholder="Buscar por usuario o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <MdSearch size={22} style={{ marginRight: 8, color: theme.palette.text.secondary }} />
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    '& fieldset': {
                      borderRadius: 2
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    }
                  }
                }}
              />

              <FormControl sx={{ minWidth: 250 }}>
                <InputLabel>Filtrar por Rol</InputLabel>
                <Select
                  value={filterRol}
                  label="Filtrar por Rol"
                  onChange={(e) => setFilterRol(e.target.value)}
                  sx={{ 
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    '& fieldset': {
                      borderRadius: 2
                    }
                  }}
                >
                  <MenuItem value="todos">Todos los Roles</MenuItem>
                  <MenuItem value="jefe">Jefe de Carrera</MenuItem>
                  <MenuItem value="escolares">Servicios Escolares</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={`${filteredUsuarios.length} usuario${filteredUsuarios.length !== 1 ? 's' : ''}`}
                color="primary"
                sx={{ fontWeight: 600 }}
              />
              {searchTerm && (
                <Chip
                  label={`Buscando: "${searchTerm}"`}
                  onDelete={() => setSearchTerm('')}
                  variant="outlined"
                />
              )}
              {filterRol !== 'todos' && (
                <Chip
                  label={`Rol: ${filterRol === 'jefe' ? 'Jefe de Carrera' : 'Servicios Escolares'}`}
                  onDelete={() => setFilterRol('todos')}
                  variant="outlined"
                />
              )}
            </Box>
          </Box>

          {/* Lista de Usuarios - Ancho Completo con Grid */}
          <Box sx={{ p: 3 }}>
            {filteredUsuarios.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <MdSearch size={48} color={theme.palette.text.secondary} />
                <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                  No se encontraron usuarios
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  Intenta ajustar los filtros de búsqueda
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { 
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                    xl: 'repeat(4, 1fr)'
                  },
                  gap: 2.5
                }}
              >
                {filteredUsuarios.map((usuario) => (
                  <Card
                    key={usuario.id}
                    elevation={0}
                    sx={{
                      border: '2px solid',
                      borderColor: 'divider',
                      borderRadius: 3,
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'visible',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 4,
                        transform: 'translateY(-4px)'
                      }
                    }}
                    onClick={() => handleEditUser(usuario)}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      {/* Avatar y Info Principal */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box 
                          sx={{ 
                            width: 56,
                            height: 56,
                            bgcolor: 'primary.main',
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 700
                          }}
                        >
                          {usuario.username.charAt(0).toUpperCase()}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography 
                            variant="h6" 
                            fontWeight={700}
                            sx={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              mb: 0.5
                            }}
                          >
                            {usuario.username}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {usuario.email}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      {/* Chips de Estado y Rol */}
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip
                          label={usuario.rol === 'jefe' ? 'Jefe de Carrera' : 'Servicios Escolares'}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                        <Chip
                          label={usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                          size="small"
                          color={usuario.estado === 'activo' ? 'success' : 'default'}
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>

                      {/* Botón de Editar */}
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<MdEdit />}
                        sx={{ 
                          mt: 2,
                          textTransform: 'none',
                          fontWeight: 600
                        }}
                      >
                        Editar Usuario
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      )}

      {/* Dialog para Editar/Crear Usuario */}
      <Dialog 
        open={openEditDialog} 
        onClose={handleCloseEditDialog}
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            maxHeight: '90vh',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 700, 
          fontSize: '1.5rem',
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2.5,
          px: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {isNewUser ? <MdPersonAdd size={30} /> : <MdEdit size={30} />}
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {isNewUser ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
              </Typography>
              {!isNewUser && (
                <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  {selectedUsuario?.username}
                </Typography>
              )}
            </Box>
          </Box>
          <IconButton 
            onClick={handleCloseEditDialog} 
            size="small"
            sx={{ 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <MdClose size={26} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 3, px: 3 }}>
          {/* Mensajes de Error/Éxito dentro del Dialog */}
          {errorMessage && (
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: 2,
                mb: 3,
                mt: 1,
                border: '1px solid',
                borderColor: 'error.main'
              }} 
              onClose={() => setErrorMessage('')}
            >
              <AlertTitle sx={{ fontWeight: 600 }}>Error</AlertTitle>
              {errorMessage}
            </Alert>
          )}

          <Stack spacing={3.5}>
            {/* Nombre de Usuario */}
            <Box sx={{ pt: errorMessage ? 0 : 1 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: '0.875rem'
                }}
              >
                Nombre de Usuario {!isNewUser && <Chip label="No editable" size="small" sx={{ ml: 1, height: 20 }} />}
              </Typography>
              <TextField
                fullWidth
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Ej: juan.garcia"
                disabled={!isNewUser}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: !isNewUser ? 'action.disabledBackground' : 'background.paper',
                    '& fieldset': {
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: !isNewUser ? 'divider' : 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderWidth: 2
                    }
                  }
                }}
              />
            </Box>

            {/* Email */}
            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: '0.875rem'
                }}
              >
                Correo Electrónico <Box component="span" sx={{ color: 'error.main' }}>*</Box>
              </Typography>
              <TextField
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ej: juan@ejemplo.com"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                    '& fieldset': {
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderWidth: 2
                    }
                  }
                }}
              />
            </Box>

            {/* Contraseña (solo para nuevo usuario) */}
            {isNewUser && (
              <Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 600,
                    color: 'text.primary',
                    fontSize: '0.875rem'
                  }}
                >
                  Contraseña <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Ingresa una contraseña segura"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                      '& fieldset': {
                        borderWidth: 2
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: 2
                      }
                    }
                  }}
                />
              </Box>
            )}

            {/* Rol */}
            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: '0.875rem'
                }}
              >
                Rol del Usuario <Box component="span" sx={{ color: 'error.main' }}>*</Box>
              </Typography>
              <FormControl fullWidth required>
                <Select
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                  sx={{
                    bgcolor: 'background.paper',
                    '& fieldset': {
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderWidth: 2
                    }
                  }}
                >
                  <MenuItem value="jefe">
                    <Typography variant="body2" fontWeight={600}>Jefe de Carrera</Typography>
                  </MenuItem>
                  <MenuItem value="escolares">
                    <Typography variant="body2" fontWeight={600}>Servicios Escolares</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ p: 3, gap: 1.5, bgcolor: 'background.default', flexWrap: 'wrap' }}>
          {/* Botones de acciones adicionales (solo para editar) */}
          {selectedUsuario && !isNewUser && (
            <>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => {
                  handleCloseEditDialog();
                  handleOpenResetDialog();
                }}
                startIcon={<MdRefresh size={20} />}
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  px: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2
                  }
                }}
              >
                Restablecer Contraseña
              </Button>

              <Button
                variant="outlined"
                color={selectedUsuario?.estado === 'activo' ? 'error' : 'success'}
                onClick={handleToggleActive}
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  px: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2
                  }
                }}
              >
                {selectedUsuario?.estado === 'activo' ? 'Desactivar' : 'Activar'}
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={handleOpenDeleteDialog}
                startIcon={<MdDelete size={20} />}
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  px: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    bgcolor: 'error.lighter'
                  }
                }}
              >
                Eliminar Usuario
              </Button>
            </>
          )}
          
          {/* Espaciador para empujar los botones principales a la derecha */}
          <Box sx={{ flex: '1 1 auto' }} />
          
          {/* Botones principales */}
          <Button 
            onClick={handleCloseEditDialog}
            variant="outlined"
            size="large"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 600, 
              px: 4,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2
              }
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveUser}
            variant="contained"
            size="large"
            disabled={loadingSave}
            startIcon={loadingSave ? <CircularProgress size={20} color="inherit" /> : (isNewUser ? <MdPersonAdd size={22} /> : <MdEdit size={22} />)}
            sx={{ 
              textTransform: 'none', 
              fontWeight: 700, 
              px: 4,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4
              }
            }}
          >
            {loadingSave ? 'Guardando...' : (isNewUser ? 'Crear Usuario' : 'Guardar Cambios')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para resetear contraseña */}
      <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdRefresh size={24} color={theme.palette.warning.main} />
          Restablecer Contraseña
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Se enviará un correo a {selectedUsuario?.email} con la nueva contraseña temporal
            </Alert>
            <TextField
              label="Nueva Contraseña Temporal"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ingresa una contraseña temporal"
            />
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenResetDialog(false)} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            color="warning"
            disabled={loadingReset || !newPassword.trim()}
            startIcon={loadingReset ? <CircularProgress size={20} /> : <MdRefresh />}
          >
            {loadingReset ? 'Procesando...' : 'Restablecer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmación para eliminar usuario */}
      <Dialog 
        open={openDeleteDialog} 
        onClose={() => setOpenDeleteDialog(false)} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle sx={{ 
          fontWeight: 700, 
          fontSize: '1.3rem',
          bgcolor: 'error.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}>
          <MdDelete size={28} />
          Eliminar Usuario
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={2.5}>
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'error.main'
              }}
            >
              <AlertTitle sx={{ fontWeight: 700, fontSize: '1rem' }}>
                ⚠️ Acción Irreversible
              </AlertTitle>
              Esta acción no se puede deshacer. Se eliminará completamente el usuario del sistema.
            </Alert>

            <Box sx={{ 
              bgcolor: 'action.hover',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              p: 2.5
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
                Usuario a eliminar:
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                bgcolor: 'background.paper',
                p: 1.5,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Box 
                  sx={{ 
                    width: 40,
                    height: 40,
                    bgcolor: 'error.main',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem'
                  }}
                >
                  {selectedUsuario?.username?.charAt(0).toUpperCase()}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {selectedUsuario?.username}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedUsuario?.email}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Si deseas conservar el historial de este usuario, considera <strong>desactivarlo</strong> en lugar de eliminarlo.
            </Typography>
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2, gap: 1.5 }}>
          <Button 
            onClick={() => setOpenDeleteDialog(false)} 
            variant="outlined"
            disabled={loadingDelete}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteUser}
            variant="contained"
            color="error"
            disabled={loadingDelete}
            startIcon={loadingDelete ? <CircularProgress size={20} color="inherit" /> : <MdDelete size={22} />}
          >
            {loadingDelete ? 'Eliminando...' : 'Eliminar Definitivamente'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsuariosAdmin;
