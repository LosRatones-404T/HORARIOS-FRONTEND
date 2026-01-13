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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  AlertTitle,
  IconButton,
  Tooltip,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  MdPersonAdd,
  MdRefresh,
  MdDelete,
  MdEdit
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

  // States para dialogs
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  
  // Estados para formularios
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [loadingReset, setLoadingReset] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  
  const [newUser, setNewUser] = useState({ nombre: '', email: '', rol: 'jefe' });
  const [editUser, setEditUser] = useState({ nombre: '', email: '', rol: 'jefe' });
  const [successMessage, setSuccessMessage] = useState('');
  const [filterRol, setFilterRol] = useState('todos');

  const handleOpenResetDialog = (usuario) => {
    setSelectedUsuario(usuario);
    setNewPassword('');
    setOpenResetDialog(true);
  };

  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
    setSelectedUsuario(null);
    setNewPassword('');
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      alert('Por favor, ingresa una contraseña');
      return;
    }

    setLoadingReset(true);
    try {
      // TODO: Integrar con API real para resetear contraseña
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage(`Contraseña restablecida para ${selectedUsuario.nombre}. Email enviado a ${selectedUsuario.email}`);
      setTimeout(() => setSuccessMessage(''), 5000);
      handleCloseResetDialog();
    } catch (error) {
      alert('Error al restablecer la contraseña');
      console.error(error);
    } finally {
      setLoadingReset(false);
    }
  };

  const handleOpenEditDialog = (usuario) => {
    setSelectedUsuario(usuario);
    setEditUser({ 
      nombre: usuario.nombre, 
      email: usuario.email, 
      rol: usuario.rol 
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUsuario(null);
    setEditUser({ nombre: '', email: '', rol: 'jefe' });
  };

  const handleEditUser = async () => {
    if (!editUser.nombre.trim() || !editUser.email.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    setLoadingEdit(true);
    try {
      // TODO: Integrar con API real para editar usuario
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedUsuarios = usuarios.map(u => 
        u.id === selectedUsuario.id 
          ? { ...u, ...editUser }
          : u
      );
      setUsuarios(updatedUsuarios);
      
      setSuccessMessage(`Usuario ${editUser.nombre} actualizado exitosamente`);
      setTimeout(() => setSuccessMessage(''), 5000);
      handleCloseEditDialog();
    } catch (error) {
      alert('Error al actualizar el usuario');
      console.error(error);
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleOpenAddUserDialog = () => {
    setNewUser({ nombre: '', email: '', rol: 'jefe' });
    setOpenAddUserDialog(true);
  };

  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
    setNewUser({ nombre: '', email: '', rol: 'jefe' });
  };

  const handleAddUser = async () => {
    if (!newUser.nombre.trim() || !newUser.email.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    setLoadingAdd(true);
    try {
      // TODO: Integrar con API real para crear usuario
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const nuevoUsuario = {
        id: Math.max(...usuarios.map(u => u.id), 0) + 1,
        ...newUser,
        estado: 'activo',
        ultimaActividad: new Date().toISOString().split('T')[0]
      };

      setUsuarios([...usuarios, nuevoUsuario]);
      setSuccessMessage(`Usuario ${newUser.nombre} creado exitosamente. Email enviado a ${newUser.email}`);
      
      setTimeout(() => setSuccessMessage(''), 5000);
      handleCloseAddUserDialog();
    } catch (error) {
      alert('Error al crear el usuario');
      console.error(error);
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleDeleteUser = (usuarioId, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`)) {
      try {
        // TODO: Integrar con API real para eliminar usuario
        setUsuarios(usuarios.filter(u => u.id !== usuarioId));
        setSuccessMessage('Usuario eliminado correctamente');
        setTimeout(() => setSuccessMessage(''), 5000);
      } catch (error) {
        alert('Error al eliminar el usuario');
        console.error(error);
      }
    }
  };

  const filteredUsuarios = filterRol === 'todos' 
    ? usuarios 
    : usuarios.filter(u => u.rol === filterRol);

  return (
    <Box sx={{ py: 4, px: 3, width: '100%', maxWidth: '100%' }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
          Gestión de Usuarios
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Administra usuarios del sistema: crear, editar, eliminar y resetear contraseñas
        </Typography>
      </Box>

      {/* Mensaje de éxito */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setSuccessMessage('')}>
          <AlertTitle sx={{ fontWeight: 600 }}>Éxito</AlertTitle>
          {successMessage}
        </Alert>
      )}

      {/* Card de Gestión de Usuarios */}
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Usuarios del Sistema ({usuarios.length})
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<MdPersonAdd size={20} />}
              onClick={handleOpenAddUserDialog}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Agregar Usuario
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Filtro por rol */}
          <Box sx={{ mb: 3 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filtrar por rol</InputLabel>
              <Select
                value={filterRol}
                label="Filtrar por rol"
                onChange={(e) => setFilterRol(e.target.value)}
              >
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="jefe">Jefe de Carrera</MenuItem>
                <MenuItem value="secretaria">Servicios Escolares</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Tabla de Usuarios */}
          <TableContainer sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Table>
              <TableHead sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Última Actividad</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsuarios.map((usuario) => (
                  <TableRow key={usuario.id} sx={{ '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' } }}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {usuario.nombre}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {usuario.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={usuario.rol === 'jefe' ? 'Jefe de Carrera' : 'Servicios Escolares'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                        size="small"
                        color={usuario.estado === 'activo' ? 'success' : 'default'}
                        variant={usuario.estado === 'activo' ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {usuario.ultimaActividad}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar Usuario">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleOpenEditDialog(usuario)}
                        >
                          <MdEdit size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Restablecer Contraseña">
                        <IconButton 
                          size="small" 
                          color="warning"
                          onClick={() => handleOpenResetDialog(usuario)}
                        >
                          <MdRefresh size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar Usuario">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteUser(usuario.id, usuario.nombre)}
                        >
                          <MdDelete size={18} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredUsuarios.length === 0 && (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No hay usuarios con el filtro seleccionado
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialog para editar usuario */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdEdit size={24} color={theme.palette.primary.main} />
          Editar Usuario
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          {selectedUsuario && (
            <Stack spacing={3}>
              <TextField
                label="Nombre Completo"
                fullWidth
                value={editUser.nombre}
                onChange={(e) => setEditUser({ ...editUser, nombre: e.target.value })}
                placeholder="Ej: Juan García"
                variant="outlined"
              />
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                placeholder="Ej: juan@ejemplo.com"
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select
                  value={editUser.rol}
                  label="Rol"
                  onChange={(e) => setEditUser({ ...editUser, rol: e.target.value })}
                >
                  <MenuItem value="jefe">Jefe de Carrera</MenuItem>
                  <MenuItem value="secretaria">Servicios Escolares</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseEditDialog} variant="outlined">
            Cancelar
          </Button>
          <Button 
            onClick={handleEditUser} 
            variant="contained"
            disabled={loadingEdit || !editUser.nombre.trim() || !editUser.email.trim()}
            startIcon={loadingEdit ? <CircularProgress size={20} /> : <MdEdit />}
          >
            {loadingEdit ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para resetear contraseña */}
      <Dialog open={openResetDialog} onClose={handleCloseResetDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdRefresh size={24} color={theme.palette.warning.main} />
          Restablecer Contraseña
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          {selectedUsuario && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Usuario:
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {selectedUsuario.nombre}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Email:
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {selectedUsuario.email}
                </Typography>
              </Box>
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                Se enviará un correo a {selectedUsuario.email} con la nueva contraseña
              </Alert>
              <TextField
                label="Nueva Contraseña"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa una contraseña temporal"
                variant="outlined"
              />
            </Stack>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseResetDialog} variant="outlined">
            Cancelar
          </Button>
          <Button 
            onClick={handleResetPassword} 
            variant="contained" 
            color="warning"
            disabled={loadingReset || !newPassword.trim()}
            startIcon={loadingReset ? <CircularProgress size={20} /> : <MdRefresh />}
          >
            {loadingReset ? 'Procesando...' : 'Restablecer y Enviar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para agregar usuario */}
      <Dialog open={openAddUserDialog} onClose={handleCloseAddUserDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdPersonAdd size={24} color={theme.palette.primary.main} />
          Agregar Nuevo Usuario
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Nombre Completo"
              fullWidth
              value={newUser.nombre}
              onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
              placeholder="Ej: Juan García"
              variant="outlined"
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Ej: juan@ejemplo.com"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                value={newUser.rol}
                label="Rol"
                onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
              >
                <MenuItem value="jefe">Jefe de Carrera</MenuItem>
                <MenuItem value="secretaria">Servicios Escolares</MenuItem>
              </Select>
            </FormControl>
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Se enviará un email al usuario con sus credenciales de acceso
            </Alert>
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseAddUserDialog} variant="outlined">
            Cancelar
          </Button>
          <Button 
            onClick={handleAddUser} 
            variant="contained"
            disabled={loadingAdd || !newUser.nombre.trim() || !newUser.email.trim()}
            startIcon={loadingAdd ? <CircularProgress size={20} /> : <MdPersonAdd />}
          >
            {loadingAdd ? 'Creando...' : 'Crear Usuario'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsuariosAdmin;
