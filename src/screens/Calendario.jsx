import { useState } from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';

/**
 * Pantalla de Calendario
 * Muestra el calendario de exámenes
 */
const Calendario = () => {
  const theme = useTheme();

  return (
    <MainLayout showSidebar={true} menuType="admin">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Encabezado */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1
            }}
          >
            Calendario de Exámenes
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.secondary 
            }}
          >
            Visualiza y gestiona el calendario de exámenes
          </Typography>
        </Box>

        {/* Contenido del calendario */}
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            p: 3,
            boxShadow: 2,
            border: `1px solid ${theme.palette.divider}`,
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.text.secondary,
              textAlign: 'center'
            }}
          >
            Calendario en construcción
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Calendario;
