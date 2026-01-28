import { useState, useEffect } from 'react';
import { getCurrentUser } from '../store/authStore';

/**
 * Hook personalizado para gestionar notificaciones
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      loadNotifications(user.role);
    }
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.leido).length);
  }, [notifications]);

  const loadNotifications = (role) => {
    // Notificaciones mock según el rol (en producción vendrá del backend)
    const notificationsByRole = {
      jefe: [
        {
          id: 1,
          tipo: 'aprobado',
          titulo: 'Horario Aprobado',
          mensaje: 'El horario de Parcial 1 ha sido aprobado por la dirección',
          fecha: '2026-01-11 16:45',
          leido: false,
        },
        {
          id: 2,
          tipo: 'revisado',
          titulo: 'Horario Revisado',
          mensaje: 'Tu horario ha sido revisado y está listo para aprobación',
          fecha: '2026-01-11 15:30',
          leido: false,
        },
        {
          id: 3,
          tipo: 'en_revision',
          titulo: 'En Revisión',
          mensaje: 'El horario enviado está siendo revisado por servicios escolares',
          fecha: '2026-01-11 14:20',
          leido: true,
        },
        {
          id: 4,
          tipo: 'rechazado',
          titulo: 'Horario Rechazado',
          mensaje: 'El horario fue rechazado. Revisa los comentarios y genera uno nuevo',
          fecha: '2026-01-10 10:15',
          leido: true,
        },
      ],
      escolares: [
        {
          id: 1,
          tipo: 'nuevo',
          titulo: 'Nuevo Horario',
          mensaje: 'Se ha recibido un nuevo horario de Ingeniería en Software',
          fecha: '2026-01-11 16:00',
          leido: false,
        },
        {
          id: 2,
          tipo: 'pendiente',
          titulo: 'Horario Pendiente',
          mensaje: 'Tienes 3 horarios pendientes por revisar',
          fecha: '2026-01-11 14:30',
          leido: false,
        },
        {
          id: 3,
          tipo: 'nuevo',
          titulo: 'Nuevo Horario',
          mensaje: 'Nuevo horario recibido de Ingeniería Industrial',
          fecha: '2026-01-10 11:20',
          leido: true,
        },
      ],
      admin: [
        {
          id: 1,
          tipo: 'sistema',
          titulo: 'Actualización del Sistema',
          mensaje: 'El sistema se actualizará el próximo lunes a las 2:00 AM',
          fecha: '2026-01-11 12:00',
          leido: false,
        },
        {
          id: 2,
          tipo: 'sistema',
          titulo: 'Nuevo Usuario Registrado',
          mensaje: 'Se ha registrado un nuevo usuario en el sistema',
          fecha: '2026-01-10 15:45',
          leido: true,
        },
      ],
    };

    setNotifications(notificationsByRole[role] || []);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, leido: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, leido: true })));
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  // TODO: Integrar con el backend
  // const fetchNotifications = async () => {
  //   try {
  //     const response = await api.get('/api/notificaciones');
  //     setNotifications(response.data);
  //   } catch (error) {
  //     console.error('Error al cargar notificaciones:', error);
  //   }
  // };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    loadNotifications,
  };
};
