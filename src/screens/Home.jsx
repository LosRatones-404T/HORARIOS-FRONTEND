import { Box } from '@mui/material';
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
    <MainLayout showSidebar={true}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Grid de tarjetas de estadísticas */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {dashboardStats.map((stat, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
              <DashboardCard
                title={stat.title}
                value={stat.value}
              />
            </Box>
          ))}
        </Box>

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