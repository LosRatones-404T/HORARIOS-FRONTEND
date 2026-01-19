# Sistema de Notificaciones

## Descripción
Sistema modular de notificaciones en tiempo real que permite a los usuarios recibir alertas según su rol (Jefe, Servicios Escolares, Admin). Incluye componentes reutilizables tanto para notificaciones tipo Snackbar como para el menú de notificaciones del sistema.

## Estructura de Archivos

```
src/
├── components/
│   └── common/
│       ├── Notification.jsx          # Componente Snackbar reutilizable
│       ├── NotificationMenu.jsx      # Menú principal de notificaciones
│       └── NotificationItem.jsx      # Item individual de notificación
├── hooks/
│   └── useNotifications.js           # Hook personalizado para lógica de notificaciones
```

---

## Componente Notification (Snackbar)

Componente reutilizable para mostrar notificaciones tipo Snackbar en toda la aplicación.

### Ubicación
`src/components/common/Notification.jsx`

### Características

- 4 tipos de severidad: `success`, `error`, `warning`, `info`
- Posición configurable
- Auto-cierre configurable
- Diseño consistente con Material Design 3
- Fácil de usar en cualquier componente

### Uso Básico

#### 1. Importar el componente

```jsx
import Notification from '../components/common/Notification';
// o si usas el barrel export:
import { Notification } from '../components/common';
```

#### 2. Agregar estado en tu componente

```jsx
const [notification, setNotification] = useState({ 
  open: false, 
  message: '', 
  severity: 'success' 
});
```

#### 3. Renderizar el componente

```jsx
<Notification 
  open={notification.open}
  message={notification.message}
  severity={notification.severity}
  onClose={() => setNotification({ ...notification, open: false })}
/>
```

#### 4. Mostrar notificaciones

```jsx
// Éxito
setNotification({
  open: true,
  message: 'Datos guardados exitosamente',
  severity: 'success'
});

// Error
setNotification({
  open: true,
  message: 'Error al guardar los datos',
  severity: 'error'
});

// Advertencia
setNotification({
  open: true,
  message: 'Algunos campos están vacíos',
  severity: 'warning'
});

// Información
setNotification({
  open: true,
  message: 'Procesando solicitud...',
  severity: 'info'
});
```

### Props del Componente Notification

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `open` | boolean | Sí | - | Controla si la notificación está visible |
| `message` | string | Sí | - | Mensaje a mostrar |
| `severity` | string | No | `'success'` | Tipo: `'success'`, `'error'`, `'warning'`, `'info'` |
| `onClose` | function | Sí | - | Función a ejecutar al cerrar |
| `autoHideDuration` | number | No | `4000` | Tiempo en ms antes de auto-cerrar |
| `anchorOrigin` | object | No | `{ vertical: 'bottom', horizontal: 'right' }` | Posición de la notificación |

### Ejemplos Completos

#### Ejemplo 1: Guardar Datos

```jsx
import { useState } from 'react';
import { Button } from '@mui/material';
import Notification from '../components/common/Notification';

function MiComponente() {
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  const handleSave = async () => {
    try {
      // Lógica de guardado
      await saveData();
      
      setNotification({
        open: true,
        message: 'Datos guardados exitosamente',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error al guardar: ' + error.message,
        severity: 'error'
      });
    }
  };

  return (
    <>
      <Button onClick={handleSave}>Guardar</Button>
      
      <Notification 
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </>
  );
}
```

#### Ejemplo 2: Posición Personalizada

```jsx
<Notification 
  open={notification.open}
  message={notification.message}
  severity={notification.severity}
  onClose={() => setNotification({ ...notification, open: false })}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  autoHideDuration={6000}
/>
```

### Colores por Severidad

- **success**: Verde - Para operaciones exitosas
- **error**: Rojo - Para errores
- **warning**: Naranja - Para advertencias
- **info**: Azul - Para información general

### Helper Functions y Custom Hooks

#### Helper Function Simple

```jsx
const showNotification = (message, severity = 'success') => {
  setNotification({ open: true, message, severity });
};

// Uso:
showNotification('Guardado exitosamente');
showNotification('Error al guardar', 'error');
```

#### Custom Hook Reutilizable

```jsx
// hooks/useNotification.js
export const useNotification = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const hideNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return { notification, showNotification, hideNotification };
};
```

---

## Sistema de Notificaciones (Menú)

Sistema de notificaciones contextual integrado en el Header que muestra alertas específicas según el rol del usuario.

### Componentes

#### NotificationMenu.jsx
Menú principal que muestra la lista de notificaciones con badge contador.

#### NotificationItem.jsx
Componente individual para renderizar cada notificación con su icono, título, mensaje y fecha.

### Uso del Hook useNotifications

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

### Estructura de Notificaciones

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

### Tipos de Notificaciones por Rol

#### Jefe de Carrera
- `aprobado` - Horario aprobado
- `rechazado` - Horario rechazado
- `en_revision` - Horario en revisión
- `revisado` - Horario revisado

#### Servicios Escolares
- `nuevo` - Nuevo horario recibido
- `pendiente` - Horarios pendientes de revisar

#### Admin
- `sistema` - Notificaciones del sistema

### Iconos y Colores

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

### Navegación Automática

Al hacer clic en una notificación, el sistema navega automáticamente:
- Horarios (aprobado, rechazado, en_revision) → `/generar`
- Nuevos/Pendientes → `/calendario`

---

## Integración con Backend

### Endpoints Esperados

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

### Implementación en el Hook

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

---

## Características del Sistema

- Badge con contador de no leídas  
- Indicador visual (punto azul) para notificaciones nuevas  
- Diferentes colores de fondo según estado de lectura  
- Navegación inteligente según tipo  
- Soporte para tema claro/oscuro  
- Responsive y accesible  
- Mock data por rol hasta conectar backend  

---

## Personalización

### Agregar Nuevo Tipo de Notificación

1. **Agregar tipo en el hook:**
```javascript
const notificationsByRole = {
  jefe: [
    {
      tipo: 'nuevo_tipo',
      titulo: 'Título',
      mensaje: 'Descripción',
      fecha: '2026-01-11 16:45',
      leido: false
    }
  ]
};
```

2. **Agregar ícono en NotificationItem.jsx:**
```javascript
const icons = {
  nuevo_tipo: <MdNewIcon color={theme.palette.custom.main} />,
  // ...
};
```

3. **Agregar navegación en NotificationMenu.jsx si es necesario.**

---

## Componentes Implementados

- `Preferencias.jsx` - Notificación Snackbar al guardar preferencias
- `Horarios.jsx` - Notificación Snackbar al generar/actualizar horarios
- `Header.jsx` - NotificationMenu integrado

---

## Última actualización
18 de enero de 2026
