import { Container, Typography, Alert } from '@mui/material';

const AdminHome = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Panel de Administración
      </Typography>
      <Alert severity="info">
        Vista de administrador en desarrollo...
      </Alert>
    </Container>
  );
};

export default AdminHome;
