import { 
  Box,
  Typography, 
  Card,
  CardContent,
  Grid,
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

const UsuariosAdmin = () => {
  const theme = useTheme();
  
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'Juan García',
      email: 'juan.garcia@ejemplo.com',
      rol: 'jefe',
      estado: 'activo',
      ultimaActividad: '2026-01-13'
    },
    {
      id: 2,
      nombre: 'María López',
      email: 'maria.lopez@ejemplo.com',
      rol: 'secretaria',
      estado: 'activo',
      ultimaActividad: '2026-01-12'
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@ejemplo.com',
      rol: 'jefe',
      estado: 'inactivo',
      ultimaActividad: '2026-01-05'
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana.martinez@ejemplo.com',
      rol: 'secretaria',
      estado: 'activo',
      ultimaActividad: '2026-01-13'
    }
  ]);

  // Estados principales
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRol, setFilterRol] = useState('todos');
  const [successMessage, setSuccessMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Formulario de usuario
  const [formData, setFormData] = useState({ nombre: '', email: '', rol: 'jefe' });
  const [isNewUser, setIsNewUser] = useState(false);

  // Pre-seleccionar el primer usuario al cargar
  useEffect(() => {
    if (usuarios.length > 0 && !selectedUsuario) {
      const primerUsuario = usuarios[0];
      setSelectedUsuario(primerUsuario);
      setFormData({
        nombre: primerUsuario.nombre,
        email: primerUsuario.email,
        rol: primerUsuario.rol
      });
    }
  }, []);

  const filteredUsuarios = usuarios.filter(u => {
    const matchSearch = u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRol === 'todos' || u.rol === filterRol;
    return matchSearch && matchRole;
  });

  const handleNewUser = () => {
    setIsNewUser(true);
    setFormData({ nombre: '', email: '', rol: 'jefe' });
    setSelectedUsuario(null);
  };

  const handleSelectUser = (usuario) => {
    setSelectedUsuario(usuario);
    setFormData({ 
      nombre: usuario.nombre, 
      email: usuario.email, 
      rol: usuario.rol 
    });
    setIsNewUser(false);
  };

  const handleCancelEdit = () => {
    setSelectedUsuario(null);
    setFormData({ nombre: '', email: '', rol: 'jefe' });
    setIsNewUser(false);
  };

  const handleSaveUser = async () => {
    if (!formData.nombre.trim() || !formData.email.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    setLoadingSave(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (isNewUser) {
        const nuevoUsuario = {
          id: Math.max(...usuarios.map(u => u.id), 0) + 1,
          ...formData,
          estado: 'activo',
          ultimaActividad: new Date().toISOString().split('T')[0]
        };
        setUsuarios([...usuarios, nuevoUsuario]);
        setSuccessMessage(`Usuario ${formData.nombre} creado exitosamente`);
      } else {
        const updatedUsuarios = usuarios.map(u =>
          u.id === selectedUsuario.id
            ? { ...u, ...formData }
            : u
        );
        setUsuarios(updatedUsuarios);
        setSelectedUsuario({ ...selectedUsuario, ...formData });
        setSuccessMessage(`Usuario ${formData.nombre} actualizado exitosamente`);
      }

      setTimeout(() => setSuccessMessage(''), 5000);
      if (isNewUser) handleCancelEdit();
    } catch (error) {
      alert('Error al guardar el usuario');
      console.error(error);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setUsuarios(usuarios.filter(u => u.id !== selectedUsuario.id));
      setSuccessMessage(`Usuario ${selectedUsuario.nombre} eliminado`);
      setTimeout(() => setSuccessMessage(''), 5000);
      setOpenDeleteDialog(false);
      handleCancelEdit();
    } catch (error) {
      alert('Error al eliminar el usuario');
      console.error(error);
    }
  };

  const handleOpenResetDialog = () => {
    setNewPassword('');
    setOpenResetDialog(true);
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      alert('Por favor, ingresa una contraseña');
      return;
    }

    setLoadingReset(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage(`Contraseña restablecida para ${selectedUsuario.nombre}`);
      setTimeout(() => setSuccessMessage(''), 5000);
      setOpenResetDialog(false);
      setNewPassword('');
    } catch (error) {
      alert('Error al restablecer la contraseña');
      console.error(error);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <Box sx={{ py: 4, px: 3, width: '100%', maxWidth: '100%', height: 'calc(100vh - 120px)' }}>
      {/* Encabezado */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
          Gestión de Usuarios
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Crea, edita, elimina y gestiona usuarios del sistema
        </Typography>
      </Box>

      {/* Mensaje de éxito */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setSuccessMessage('')}>
          <AlertTitle sx={{ fontWeight: 600 }}>Éxito</AlertTitle>
          {successMessage}
        </Alert>
      )}

      {/* Layout en dos columnas */}
      <Box sx={{ height: 'calc(100% - 120px)' }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
        
          {/* COLUMNA IZQUIERDA: Lista de Usuarios */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
              
              {/* Búsqueda y Filtros */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Buscar por nombre o email..."
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
                    <MenuItem value="secretaria">Servicios Escolares</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Botón Nuevo Usuario */}
              <Button
                fullWidth
                variant="contained"
                startIcon={<MdPersonAdd size={20} />}
                onClick={handleNewUser}
                sx={{ mb: 2, textTransform: 'none', fontWeight: 600 }}
              >
                Nuevo Usuario
              </Button>

              {/* Lista de Usuarios */}
              <Box sx={{ 
                flex: 1, 
                overflowY: 'auto', 
                pr: 1, 
                '&::-webkit-scrollbar': { width: '6px' }, 
                '&::-webkit-scrollbar-track': { bgcolor: 'transparent' }, 
                '&::-webkit-scrollbar-thumb': { 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', 
                  borderRadius: '3px' 
                } 
              }}>
                <Stack spacing={1}>
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
                          bgcolor: selectedUsuario?.id === usuario.id ? theme.palette.action.selected : 'background.paper',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: 2
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle2" fontWeight={600} noWrap>
                              {usuario.nombre}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                              {usuario.email}
                            </Typography>
                            <Box sx={{ mt: 0.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              <Chip
                                label={usuario.rol === 'jefe' ? 'Jefe' : 'Secretaria'}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                label={usuario.estado}
                                size="small"
                                color={usuario.estado === 'activo' ? 'success' : 'default'}
                                variant={usuario.estado === 'activo' ? 'filled' : 'outlined'}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    ))
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* COLUMNA DERECHA: Panel de Edición */}
        <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
          {selectedUsuario || isNewUser ? (
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                
                {/* Header del Panel */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {isNewUser ? 'Nuevo Usuario' : `Editar: ${selectedUsuario?.nombre}`}
                  </Typography>
                  <IconButton size="small" onClick={handleCancelEdit}>
                    <MdClose size={20} />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Formulario */}
                <Stack spacing={3} sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    label="Nombre Completo"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Juan García"
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ej: juan@ejemplo.com"
                  />

                  <FormControl fullWidth>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      value={formData.rol}
                      label="Rol"
                      onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                    >
                      <MenuItem value="jefe">Jefe de Carrera</MenuItem>
                      <MenuItem value="secretaria">Servicios Escolares</MenuItem>
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
                </Stack>

                {/* Botones de Acción */}
                <Box sx={{ mt: 'auto', pt: 3, display: 'flex', gap: 2, flexDirection: 'column' }}>
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
                        color="error"
                        onClick={handleOpenDeleteDialog}
                        startIcon={<MdDelete size={20} />}
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                      >
                        Eliminar Usuario
                      </Button>
                    </>
                  )}

                  <Button
                    fullWidth
                    variant="text"
                    onClick={handleCancelEdit}
                    sx={{ textTransform: 'none' }}
                  >
                    Cancelar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  Selecciona un usuario o crea uno nuevo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Usa la lista de la izquierda para seleccionar un usuario o haz clic en "Nuevo Usuario"
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      </Box>

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

      {/* Dialog para confirmar eliminación */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Confirmar Eliminación</DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Typography>
            ¿Estás seguro de que deseas eliminar a <strong>{selectedUsuario?.nombre}</strong>?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Eliminar Usuario
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsuariosAdmin;
