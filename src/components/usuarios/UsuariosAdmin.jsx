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
  MdSearch
} from 'react-icons/md';
import { useState, useEffect } from 'react';
import { authApi, usersApi } from '../../services/api';

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
  const [openResetDialog, setOpenResetDialog] = useState(false);
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
      
      // Pre-seleccionar el primer usuario
      if (mappedUsers.length > 0 && !selectedUsuario) {
        const primerUsuario = mappedUsers[0];
        setSelectedUsuario(primerUsuario);
        setFormData({
          username: primerUsuario.username,
          email: primerUsuario.email,
          rol: primerUsuario.rol,
          password: ''
        });
      }
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

  const handleNewUser = () => {
    setIsNewUser(true);
    setFormData({ username: '', email: '', rol: 'jefe', password: '' });
    setSelectedUsuario(null);
  };

  const handleSelectUser = (usuario) => {
    setSelectedUsuario(usuario);
    setFormData({ 
      username: usuario.username, 
      email: usuario.email, 
      rol: usuario.rol,
      password: ''
    });
    setIsNewUser(false);
  };

  const handleCancelEdit = () => {
    setSelectedUsuario(null);
    setFormData({ username: '', email: '', rol: 'jefe', password: '' });
    setIsNewUser(false);
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
        handleCancelEdit();
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

  return (
    <Box sx={{ 
      py: 4, 
      px: { xs: 2, md: 3 },
      maxWidth: '1400px',
      mx: 'auto',
      width: '100%'
    }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
          Gestión de Usuarios
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Crea, edita, elimina y gestiona usuarios del sistema
        </Typography>
      </Box>

      {/* Mensajes */}
      {successMessage && (
        <Alert severity="success" sx={{ borderRadius: 2, mb: 3 }} onClose={() => setSuccessMessage('')}>
          <AlertTitle sx={{ fontWeight: 600 }}>Éxito</AlertTitle>
          {successMessage}
        </Alert>
      )}
      
      {errorMessage && (
        <Alert severity="error" sx={{ borderRadius: 2, mb: 3 }} onClose={() => setErrorMessage('')}>
          <AlertTitle sx={{ fontWeight: 600 }}>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : usuarios.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          No hay usuarios en el sistema. Crea uno nuevo usando el botón "Nuevo Usuario".
        </Alert>
      ) : (
        <Paper 
          elevation={0} 
          sx={{ 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 2,
            p: 3,
            bgcolor: 'background.paper'
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.6fr' },
              gap: { xs: 2, md: 3 },
              alignItems: 'start'
            }}
          >
            {/* COLUMNA IZQUIERDA: Lista de Usuarios */}
            <Box>
              <Card 
                elevation={0} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Usuarios
                    </Typography>
                    <Chip 
                      label={usuarios.length} 
                      color="primary" 
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </CardContent>
                <Divider />

                {/* Búsqueda y Filtros */}
                <CardContent sx={{ pb: 2, pt: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Buscar por usuario o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <MdSearch size={20} style={{ marginRight: 8 }} />
                    }}
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth size="small">
                    <InputLabel>Rol</InputLabel>
                    <Select
                      value={filterRol}
                      label="Rol"
                      onChange={(e) => setFilterRol(e.target.value)}
                    >
                      <MenuItem value="todos">Todos</MenuItem>
                      <MenuItem value="jefe">Jefe de Carrera</MenuItem>
                      <MenuItem value="escolares">Servicios Escolares</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
                <Divider />

                {/* Botón Nuevo Usuario */}
                <CardContent sx={{ pb: 2, pt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<MdPersonAdd size={20} />}
                    onClick={handleNewUser}
                    sx={{ textTransform: 'none', fontWeight: 600 }}
                  >
                    Nuevo Usuario
                  </Button>
                </CardContent>
                <Divider />

                {/* Lista de Usuarios */}
                <Box sx={{ overflow: 'auto', flex: 1 }}>
                  <Box sx={{ p: 2 }}>
                    <Stack spacing={1.5}>
                      {filteredUsuarios.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                          No hay usuarios con los criterios de búsqueda
                        </Typography>
                      ) : (
                        filteredUsuarios.map((usuario) => (
                          <Paper
                            key={usuario.id}
                            onClick={() => handleSelectUser(usuario)}
                            sx={{
                              p: 2,
                              cursor: 'pointer',
                              border: '2px solid',
                              borderColor: selectedUsuario?.id === usuario.id ? 'primary.main' : 'divider',
                              bgcolor: selectedUsuario?.id === usuario.id ? 'primary.lighter' : 'background.paper',
                              transition: 'all 0.2s',
                              '&:hover': {
                                borderColor: 'primary.main',
                                boxShadow: 1,
                                transform: 'translateY(-1px)'
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                              <Box 
                                sx={{ 
                                  p: 1, 
                                  bgcolor: 'primary.main',
                                  borderRadius: 1.5,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  color: 'white'
                                }}
                              >
                                {usuario.username.charAt(0).toUpperCase()}
                              </Box>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography 
                                  variant="subtitle2" 
                                  fontWeight={600}
                                  sx={{ 
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {usuario.username}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ 
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {usuario.email}
                                </Typography>
                              </Box>
                            </Box>
                            <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                              <Chip
                                label={usuario.rol === 'jefe' ? 'Jefe' : 'Escolares'}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                label={usuario.estado}
                                size="small"
                                color={usuario.estado === 'activo' ? 'success' : 'default'}
                                variant={usuario.estado === 'activo' ? 'filled' : 'outlined'}
                              />
                            </Stack>
                          </Paper>
                        ))
                      )}
                    </Stack>
                  </Box>
                </Box>
              </Card>
            </Box>

            {/* COLUMNA DERECHA: Panel de Edición */}
            <Box>
              {selectedUsuario || isNewUser ? (
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  {/* Header del Panel */}
                  <Box sx={{ bgcolor: 'primary.lighter', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.dark' }}>
                          {isNewUser ? 'Nuevo Usuario' : `Editar: ${selectedUsuario?.username}`}
                        </Typography>
                        <IconButton size="small" onClick={handleCancelEdit}>
                          <MdClose size={20} />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Box>

                  {/* Botones de Acción */}
                  <Box sx={{ 
                    p: 2, 
                    borderBottom: '1px solid', 
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSaveUser}
                      disabled={loadingSave}
                      startIcon={loadingSave ? <CircularProgress size={20} /> : <MdEdit />}
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      {loadingSave ? 'Guardando...' : (isNewUser ? 'Crear Usuario' : 'Guardar Cambios')}
                    </Button>

                    {!isNewUser && (
                      <>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="warning"
                          onClick={handleOpenResetDialog}
                          startIcon={<MdRefresh size={20} />}
                          sx={{ textTransform: 'none', fontWeight: 600 }}
                        >
                          Restablecer Contraseña
                        </Button>

                        <Button
                          fullWidth
                          variant="outlined"
                          color={selectedUsuario?.estado === 'activo' ? 'error' : 'success'}
                          onClick={handleToggleActive}
                          sx={{ textTransform: 'none', fontWeight: 600 }}
                        >
                          {selectedUsuario?.estado === 'activo' ? 'Desactivar' : 'Activar'}
                        </Button>
                      </>
                    )}
                  </Box>

                  <CardContent sx={{ pt: 3 }}>
                    {/* Formulario */}
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Nombre de Usuario"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="Ej: juan.garcia"
                        disabled={!isNewUser}
                        helperText={!isNewUser ? 'El nombre de usuario no se puede cambiar' : ''}
                      />

                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ej: juan@ejemplo.com"
                      />

                      {isNewUser && (
                        <TextField
                          fullWidth
                          label="Contraseña"
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Ingresa la contraseña"
                          required
                        />
                      )}

                      <FormControl fullWidth>
                        <InputLabel>Rol</InputLabel>
                        <Select
                          value={formData.rol}
                          label="Rol"
                          onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                        >
                          <MenuItem value="jefe">Jefe de Carrera</MenuItem>
                          <MenuItem value="escolares">Servicios Escolares</MenuItem>
                        </Select>
                      </FormControl>

                      {selectedUsuario && (
                        <>
                          <Divider />
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Estado: <Chip label={selectedUsuario.estado} size="small" color={selectedUsuario.estado === 'activo' ? 'success' : 'default'} sx={{ ml: 1 }} />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Última actividad: {selectedUsuario.ultimaActividad}
                            </Typography>
                          </Box>
                        </>
                      )}

                      <Button
                        fullWidth
                        variant="text"
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ) : (
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <CardContent sx={{ py: 8, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                      Selecciona un usuario o crea uno nuevo
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Usa la lista de la izquierda para seleccionar un usuario
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Box>
        </Paper>
      )}

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
    </Box>
  );
};

export default UsuariosAdmin;
