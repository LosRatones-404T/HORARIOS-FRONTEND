import { Box, Typography } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';

function Home() {
  return (
    <MainLayout showSidebar={true} menuType="admin">
      <Box>
        <Typography variant="h4" gutterBottom>
          Página Principal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido al sistema de planificación de exámenes
        </Typography>
      </Box>
    </MainLayout>
  );
}

export default Home;