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
      <div className="space-y-6">
        {/* Grid de tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, index) => (
            <DashboardCard
              key={index}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </div>

        {/* Tarjeta principal de gestión de usuarios */}
        <DashboardMainCard
          userType="admin"
          title="Gestión de Usuarios"
          subtitle="Añade, edita o elimina usuarios"
          actionButton="Agregar"
          onActionClick={handleAddUser}
          data={users}
        />
      </div>
    </MainLayout>
  );
}

export default Home;