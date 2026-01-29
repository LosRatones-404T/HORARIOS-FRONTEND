import { Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { JefeHome, AdminHome, SecretariaHome } from '../components/home';
import { useHomeData } from '../hooks/useHomeData';

function Home() {
  const { user, estadoExamen, logsRecientes } = useHomeData();

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userName = user.name;

  // Renderizar según el rol
  const renderContent = () => {
    switch (user?.role) {
      case 'jefe':
        return <JefeHome estadoExamen={estadoExamen} logsRecientes={logsRecientes} />;
      case 'admin':
        return <AdminHome />;
      case 'escolares':
        return <SecretariaHome />;
      default:
        return <JefeHome estadoExamen={estadoExamen} logsRecientes={logsRecientes} />;
    }
  };

  return (
    <MainLayout showSidebar={true}>
      {renderContent()}
    </MainLayout>
  );
}

export default Home;