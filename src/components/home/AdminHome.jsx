import { 
  Box,
  Typography, 
  Card,
  CardContent,
  Grid,
  useTheme,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { 
  MdPeople,
  MdCheckCircle,
  MdWarning,
  MdMail
} from 'react-icons/md';
import { useState, useEffect } from 'react';

const AdminHome = () => {
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

  const [filterRol, setFilterRol] = useState('todos');

  const filteredUsuarios = filterRol === 'todos' 
    ? usuarios 
    : usuarios.filter(u => u.rol === filterRol);

  const usuariosActivos = usuarios.filter(u => u.estado === 'activo').length;

  return (
    <Box sx={{ py: 4, px: 3, width: '100%', maxWidth: '100%' }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
          Bienvenido, Administrador
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Panel de control - Gestión de usuarios del sistema
        </Typography>
      </Box>

      {/* Tarjetas de Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <MdPeople size={40} color={theme.palette.primary.main} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {usuarios.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Usuarios Totales
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <MdCheckCircle size={40} color={theme.palette.success.main} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {usuariosActivos}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Usuarios Activos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <MdWarning size={40} color={theme.palette.warning.main} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {usuarios.length - usuariosActivos}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Usuarios Inactivos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: '100%', minWidth: 220 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <MdMail size={40} color={theme.palette.info.main} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {Math.floor(usuarios.length * 0.8)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Emails Verificados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Card de Gestión de Usuarios */}
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Usuarios del Sistema
            </Typography>
          </Box>

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
                <MenuItem value="escolares">Servicios Escolares</MenuItem>
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
    </Box>
  );
};

export default AdminHome;
