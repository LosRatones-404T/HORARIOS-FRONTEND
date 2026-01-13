import { useState, useEffect } from 'react';
import { ESTADOS } from '../constants/estadosExamen';
import { getCurrentUser } from '../store/authStore';

/**
 * Hook personalizado para manejar los datos del dashboard Home
 */
export const useHomeData = () => {
  const user = getCurrentUser();
  
  // Estado del examen actual (mock - vendrá del backend)
  const [estadoExamen, setEstadoExamen] = useState({
    existe: true,
    estado: ESTADOS.APROBADO,
    tipo_examen: 'Parcial 1',
    periodo: 'Periodo 1 - 2026',
    fecha_generacion: '2026-01-11',
    total_examenes: 25,
    fecha_aprobacion: '2026-01-11',
    retroalimentacion: null
  });

  // Logs recientes (mock - vendrán del backend)
  const [logsRecientes, setLogsRecientes] = useState([
    {
      id: 1,
      fecha: '2026-01-11 16:45',
      usuario: 'Dir. Carlos Mendoza',
      accion: 'Horario aprobado',
      estado: ESTADOS.APROBADO,
    },
    {
      id: 2,
      fecha: '2026-01-11 15:30',
      usuario: 'Mtra. Ana López',
      accion: 'Horario revisado',
      estado: ESTADOS.REVISADO,
    },
    {
      id: 3,
      fecha: '2026-01-11 14:20',
      usuario: 'Mtra. Ana López',
      accion: 'En revisión',
      estado: ESTADOS.EN_REVISION,
    },
  ]);

  // TODO: Integrar con el backend
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const response = await api.get(`/api/dashboard/${user.role}`);
  //       setEstadoExamen(response.data.estadoExamen);
  //       setLogsRecientes(response.data.logs);
  //     } catch (error) {
  //       console.error('Error al cargar datos del dashboard:', error);
  //     }
  //   };
  //   
  //   if (user) {
  //     fetchDashboardData();
  //   }
  // }, [user]);

  return {
    user,
    estadoExamen,
    logsRecientes,
    setEstadoExamen,
    setLogsRecientes,
  };
};
