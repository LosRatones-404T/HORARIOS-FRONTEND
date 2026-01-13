import { Container, Typography, Alert } from '@mui/material';

const SecretariaHome = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Panel de Secretaría
      </Typography>
      <Alert severity="info">
        Vista de secretaria en desarrollo...
      </Alert>
    </Container>
  );
};

export default SecretariaHome;
