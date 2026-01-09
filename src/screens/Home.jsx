import { Box, Grid } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import { 
  DashboardCard, 
  DashboardMainCard 
} from '../components/common';

function Home() {
  // Datos de ejemplo para las tarjetas del dashboard
  const dashboardStats = [
    { title: 'Usuarios Totales', value: '50' },
    { title: 'Materias Activas', value: '50' },
    { title: 'Aulas Disponibles', value: '50' },
    { title: 'Horarios Generados', value: '50' },
  ];

  // Datos de ejemplo para la gestión de usuarios
  const users = [
    {
      nombre: 'Admin User',
      email: 'adminuser@example.com',
      rol: 'Administrador',
      avatar: null,
      onMenuClick: (user) => console.log('Menu clicked:', user)
    },
    {
      nombre: 'Alicia Martínez',
      email: 'alicia@example.com',
      rol: 'Servicios Escolares',
      avatar: null,
      onMenuClick: (user) => console.log('Menu clicked:', user)
    },
    {
      nombre: 'Pedro Hernández',
      email: 'pedro@example.com',
      rol: 'Jefe de Carrera',
      avatar: null,
      onMenuClick: (user) => console.log('Menu clicked:', user)
    },
    {
      nombre: 'Alicia Martínez',
      email: 'alicia@example.com',
      rol: 'Servicios Escolares',
      avatar: null,
      onMenuClick: (user) => console.log('Menu clicked:', user)
    },
  ];

  const handleAddUser = () => {
    console.log('Agregar usuario');
  };

  return (
    <MainLayout showSidebar={true} menuType="admin">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Grid de tarjetas de estadísticas */}
        <Grid container spacing={2}>
          {dashboardStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <DashboardCard
                title={stat.title}
                value={stat.value}
              />
            </Grid>
          ))}
        </Grid>

        {/* Tarjeta principal de gestión de usuarios */}
        <DashboardMainCard
          userType="admin"
          title="Gestión de Usuarios"
          subtitle="Añade, edita o elimina usuarios"
          actionButton="Agregar"
          onActionClick={handleAddUser}
          data={users}
        />
      </Box>
    </MainLayout>
  );
}

export default Home;