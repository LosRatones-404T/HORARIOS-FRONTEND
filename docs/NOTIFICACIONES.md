# Sistema de Notificaciones

## Descripción
Sistema modular de notificaciones en tiempo real que permite a los usuarios recibir alertas según su rol (Jefe, Secretaria, Admin).

## Estructura de Archivos

```
src/
├── components/
│   └── common/
│       ├── NotificationMenu.jsx      # Menú principal de notificaciones
│       └── NotificationItem.jsx      # Item individual de notificación
├── hooks/
│   └── useNotifications.js           # Hook personalizado para lógica de notificaciones
```

## Uso

### Componente NotificationMenu

Ya está integrado en el Header. No requiere configuración adicional.

```jsx
import { NotificationMenu } from '../components/common';

<NotificationMenu />
```

### Hook useNotifications

```jsx
import { useNotifications } from '../hooks/useNotifications';

const MyComponent = () => {
  const { 
    notifications,      // Array de notificaciones
    unreadCount,        // Contador de no leídas
    markAsRead,         // Marcar una como leída
    markAllAsRead,      // Marcar todas como leídas
    addNotification     // Agregar nueva notificación
  } = useNotifications();
  
  return (
    <div>
      <Badge badgeContent={unreadCount}>
        <NotificationIcon />
      </Badge>
    </div>
  );
};
```

## Estructura de Notificaciones

```javascript
{
  id: 1,                              // ID único
  tipo: 'aprobado',                   // Tipo de notificación
  titulo: 'Horario Aprobado',         // Título principal
  mensaje: 'El horario de...',        // Mensaje descriptivo
  fecha: '2026-01-11 16:45',         // Fecha y hora
  leido: false                        // Estado de lectura
}
```

## Tipos de Notificaciones por Rol

### Jefe de Carrera
- `aprobado` - Horario aprobado
- `rechazado` - Horario rechazado
- `en_revision` - Horario en revisión
- `revisado` - Horario revisado

### Secretaria
- `nuevo` - Nuevo horario recibido
- `pendiente` - Horarios pendientes de revisar

### Admin
- `sistema` - Notificaciones del sistema

## Iconos y Colores

Cada tipo de notificación tiene un icono y color asociado:

```javascript
const icons = {
  aprobado: <MdCheckCircle color={success} />,
  rechazado: <MdError color={error} />,
  en_revision: <MdSchedule color={warning} />,
  revisado: <MdInfo color={primary} />,
  nuevo: <MdInfo color={info} />,
  pendiente: <MdSchedule color={warning} />,
  sistema: <MdInfo color={info} />,
};
```

## Navegación Automática

Al hacer clic en una notificación, el sistema navega automáticamente:
- Horarios (aprobado, rechazado, en_revision) → `/generar`
- Nuevos/Pendientes → `/calendario`

## Integración con Backend

### Endpoints esperados

```javascript
// Obtener notificaciones
GET /api/notificaciones
Response: [{ id, tipo, titulo, mensaje, fecha, leido }]

// Marcar como leída
PUT /api/notificaciones/:id/leer
Body: { leido: true }

// Marcar todas como leídas
PUT /api/notificaciones/leer-todas
```

### Implementación en el hook

Descomenta el código en `useNotifications.js`:

```javascript
const fetchNotifications = async () => {
  try {
    const response = await api.get('/api/notificaciones');
    setNotifications(response.data);
  } catch (error) {
    console.error('Error al cargar notificaciones:', error);
  }
};
```

## Características

✅ Badge con contador de no leídas  
✅ Indicador visual (punto azul) para notificaciones nuevas  
✅ Diferentes colores de fondo según estado de lectura  
✅ Navegación inteligente según tipo  
✅ Soporte para tema claro/oscuro  
✅ Responsive y accesible  
✅ Mock data por rol hasta conectar backend  

## Personalización

### Agregar nuevo tipo de notificación

1. Agregar tipo en el hook:
```javascript
const notificationsByRole = {
  jefe: [
    {
      tipo: 'nuevo_tipo',
      titulo: 'Título',
      // ...
    }
  ]
};
```

2. Agregar ícono en NotificationItem.jsx:
```javascript
const icons = {
  nuevo_tipo: <MdNewIcon color={theme.palette.custom.main} />,
  // ...
};
```

3. Agregar navegación en NotificationMenu.jsx si es necesario.
