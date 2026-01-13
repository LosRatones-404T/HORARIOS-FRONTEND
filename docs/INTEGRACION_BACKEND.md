# Integración con Backend

Guía para conectar el frontend con la API del backend.

## Configuración Inicial

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

### Servicio API

Ubicación: `src/services/api.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Endpoints por Módulo

### Autenticación

```javascript
// Login
POST /api/auth/login
Body: { username: string, password: string }
Response: { 
  user: { id, name, email, role },
  token: string 
}

// Logout
POST /api/auth/logout
Headers: { Authorization: 'Bearer <token>' }

// Recuperar contraseña
POST /api/auth/forgot-password
Body: { email: string }

// Reset contraseña
POST /api/auth/reset-password
Body: { token: string, newPassword: string }
```

**Implementación:**

```javascript
// src/store/authStore.js
import api from '../services/api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};
```

---

### Notificaciones

```javascript
// Obtener notificaciones del usuario
GET /api/notificaciones
Headers: { Authorization: 'Bearer <token>' }
Response: [
  {
    id: number,
    tipo: string,
    titulo: string,
    mensaje: string,
    fecha: string (ISO 8601),
    leido: boolean
  }
]

// Marcar notificación como leída
PUT /api/notificaciones/:id/leer
Headers: { Authorization: 'Bearer <token>' }
Body: { leido: true }

// Marcar todas como leídas
PUT /api/notificaciones/leer-todas
Headers: { Authorization: 'Bearer <token>' }

// Eliminar notificación
DELETE /api/notificaciones/:id
Headers: { Authorization: 'Bearer <token>' }
```

**Implementación:**

```javascript
// src/hooks/useNotifications.js
const fetchNotifications = async () => {
  try {
    const response = await api.get('/notificaciones');
    setNotifications(response.data);
  } catch (error) {
    console.error('Error al cargar notificaciones:', error);
  }
};

const markAsRead = async (notificationId) => {
  try {
    await api.put(`/notificaciones/${notificationId}/leer`, { leido: true });
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, leido: true } : n)
    );
  } catch (error) {
    console.error('Error al marcar notificación:', error);
  }
};
```

---

### Dashboard (Home)

```javascript
// Obtener datos del dashboard según rol
GET /api/dashboard/:role
Headers: { Authorization: 'Bearer <token>' }
Params: role = 'jefe' | 'admin' | 'secretaria'
Response: {
  estadoExamen: {
    existe: boolean,
    estado: string,
    tipo_examen: string,
    periodo: string,
    fecha_generacion: string,
    total_examenes: number,
    fecha_aprobacion?: string,
    retroalimentacion?: string
  },
  logs: [
    {
      id: number,
      fecha: string,
      usuario: string,
      accion: string,
      estado: string
    }
  ],
  estadisticas?: {
    total_horarios: number,
    pendientes: number,
    aprobados: number
  }
}
```

**Implementación:**

```javascript
// src/hooks/useHomeData.js
useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const response = await api.get(`/dashboard/${user.role}`);
      setEstadoExamen(response.data.estadoExamen);
      setLogsRecientes(response.data.logs);
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
    }
  };
  
  if (user) {
    fetchDashboardData();
  }
}, [user]);
```

---

### Generación de Horarios/Exámenes

```javascript
// Obtener horario actual
GET /api/generar/actual
Headers: { Authorization: 'Bearer <token>' }
Response: {
  id: number,
  tipo_examen: string,
  periodo: string,
  estado: string,
  fecha_creacion: string,
  fecha_actualizacion: string,
  examenes: [...],
  retroalimentacion?: string
}

// Crear nuevo horario
POST /api/generar
Headers: { Authorization: 'Bearer <token>' }
Body: {
  tipo_examen: string,
  periodo: string,
  semestres: [1, 3, 5, 7, 9]
}
Response: {
  id: number,
  mensaje: 'Horario generado exitosamente'
}

// Enviar a revisión
PUT /api/generar/:id/enviar
Headers: { Authorization: 'Bearer <token>' }

// Aprobar horario (Admin/Director)
PUT /api/generar/:id/aprobar
Headers: { Authorization: 'Bearer <token>' }

// Rechazar horario
PUT /api/generar/:id/rechazar
Headers: { Authorization: 'Bearer <token>' }
Body: { retroalimentacion: string }

// Obtener historial de cambios
GET /api/generar/:id/logs
Headers: { Authorization: 'Bearer <token>' }
Response: [
  {
    id: number,
    fecha: string,
    usuario: string,
    accion: string,
    estado_anterior: string,
    estado_nuevo: string
  }
]
```

---

### Calendario

```javascript
// Obtener calendario por tipo de examen
GET /api/calendario?tipo_examen={tipo}&periodo={periodo}
Headers: { Authorization: 'Bearer <token>' }
Params: 
  - tipo_examen: 'parcial1' | 'parcial2' | 'parcial3' | 'ordinario' | 'extraordinario1' | 'extraordinario2' | 'especial'
  - periodo: string (ej: '1-2026')
Response: {
  tipo_examen: string,
  periodo: string,
  semestres: {
    '1': {
      materias: [
        {
          id: number,
          nombre: string,
          clave: string,
          horarios: [
            {
              dia: string,
              hora_inicio: string,
              hora_fin: string,
              aula: string,
              profesor: string
            }
          ]
        }
      ]
    },
    '3': {...},
    // ...
  }
}

// Actualizar horarios
PUT /api/calendario
Headers: { Authorization: 'Bearer <token>' }
Body: {
  tipo_examen: string,
  periodo: string,
  cambios: [
    {
      materia_id: number,
      semestre: number,
      horarios: [...]
    }
  ]
}
```

---

### Preferencias (Materias)

```javascript
// Obtener materias
GET /api/materias?semestre={semestre}
Headers: { Authorization: 'Bearer <token>' }
Response: [
  {
    id: number,
    nombre: string,
    clave: string,
    semestre: number,
    creditos: number,
    horas_teoria: number,
    horas_practica: number,
    profesor_titular: string,
    activa: boolean
  }
]

// Actualizar materia
PUT /api/materias/:id
Headers: { Authorization: 'Bearer <token>' }
Body: {
  nombre?: string,
  profesor_titular?: string,
  activa?: boolean
}

// Crear materia
POST /api/materias
Headers: { Authorization: 'Bearer <token>' }
Body: {
  nombre: string,
  clave: string,
  semestre: number,
  creditos: number,
  horas_teoria: number,
  horas_practica: number
}
```

---

## Manejo de Errores

### Error Handler Global

```javascript
// src/utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Error de respuesta del servidor
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data.message || 'Solicitud inválida';
      case 401:
        return 'Sesión expirada. Por favor inicia sesión nuevamente';
      case 403:
        return 'No tienes permisos para realizar esta acción';
      case 404:
        return 'Recurso no encontrado';
      case 500:
        return 'Error del servidor. Intenta más tarde';
      default:
        return data.message || 'Error desconocido';
    }
  } else if (error.request) {
    // No se recibió respuesta
    return 'No se pudo conectar con el servidor';
  } else {
    // Error al configurar la petición
    return error.message || 'Error al procesar la solicitud';
  }
};
```

### Uso en Componentes

```javascript
import { handleApiError } from '../utils/errorHandler';

const fetchData = async () => {
  try {
    const response = await api.get('/endpoint');
    setData(response.data);
  } catch (error) {
    const errorMessage = handleApiError(error);
    setNotification({
      open: true,
      message: errorMessage,
      severity: 'error'
    });
  }
};
```

---

## WebSockets (Opcional)

Para notificaciones en tiempo real:

```javascript
// src/services/websocket.js
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:3000', {
  auth: {
    token: JSON.parse(localStorage.getItem('user'))?.token
  }
});

socket.on('notification', (notification) => {
  // Agregar notificación al estado
  console.log('Nueva notificación:', notification);
});

export default socket;
```

---

## Testing API Calls

### Mock Service Worker (MSW)

```javascript
// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/notificaciones', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          tipo: 'aprobado',
          titulo: 'Horario Aprobado',
          mensaje: 'El horario fue aprobado',
          fecha: '2026-01-11',
          leido: false
        }
      ])
    );
  }),
];
```

---

## Checklist de Integración

- [ ] Configurar variables de entorno (.env)
- [ ] Implementar servicio API con interceptors
- [ ] Conectar autenticación (login/logout)
- [ ] Integrar notificaciones
- [ ] Conectar dashboard con backend
- [ ] Implementar endpoints de generación
- [ ] Conectar calendario
- [ ] Integrar gestión de materias
- [ ] Agregar manejo de errores global
- [ ] Testing de integraciones
- [ ] Documentar endpoints adicionales
- [ ] Implementar WebSockets (opcional)

---

## Ejemplo Completo

```javascript
// src/screens/Generar.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';
import { handleApiError } from '../utils/errorHandler';

const Generar = () => {
  const [horario, setHorario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchHorarioActual();
  }, []);

  const fetchHorarioActual = async () => {
    setLoading(true);
    try {
      const response = await api.get('/generar/actual');
      setHorario(response.data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setNotification({ message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerar = async () => {
    try {
      const response = await api.post('/generar', {
        tipo_examen: 'parcial1',
        periodo: '1-2026',
        semestres: [1, 3, 5, 7, 9]
      });
      setNotification({ 
        message: 'Horario generado exitosamente', 
        severity: 'success' 
      });
      fetchHorarioActual();
    } catch (error) {
      const errorMessage = handleApiError(error);
      setNotification({ message: errorMessage, severity: 'error' });
    }
  };

  return (
    // JSX
  );
};
```
