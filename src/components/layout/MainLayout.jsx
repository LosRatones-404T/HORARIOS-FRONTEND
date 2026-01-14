import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Sidebar, menuOptions } from './sidebar';
import { getCurrentUser } from '../../store/authStore';

const MainLayout = ({ children, showSidebar = false, menuType = null }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [userRole, setUserRole] = useState(null);
  
  // Obtener rol del usuario autenticado
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setUserRole(menuType || user.role);
  }, [navigate, menuType]);
  
  // Calcular el ancho del sidebar basado en si está visible
  const sidebarWidth = showSidebar && sidebarVisible
    ? '380px' 
    : '0px';

  if (!userRole) return null;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar - opcional y fixed */}
      {showSidebar && (
        <Sidebar 
          menu={menuOptions[userRole]} 
          visible={sidebarVisible}
        />
      )}

      {/* Contenido principal con margen izquierdo cuando hay sidebar */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          ml: showSidebar ? sidebarWidth : 0,
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        {/* Header fijo */}
        <Header 
          sidebarWidth={sidebarWidth} 
          onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
          showSidebar={showSidebar}
        />

        {/* Contenido con scroll */}
        <Box
          component="main"
          sx={{
            flex: 1,
            mt: '70px', // Altura del header
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: 'background.paper',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
