import { Box, Typography } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';

const Horarios = () => {
  return (
    <MainLayout showSidebar={true} menuType="admin">
      <Box>
        <Typography variant="h4" gutterBottom>
          Gestión de Horarios
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aquí irá el contenido de horarios
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default Horarios;
