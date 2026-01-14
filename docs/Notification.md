# Componente Notification

Componente reutilizable para mostrar notificaciones tipo Snackbar en toda la aplicación.

## 📦 Ubicación
`src/components/common/Notification.jsx`

## ✨ Características

- ✅ 4 tipos de severidad: `success`, `error`, `warning`, `info`
- ✅ Posición configurable
- ✅ Auto-cierre configurable
- ✅ Diseño consistente con Material Design 3
- ✅ Fácil de usar en cualquier componente

## 🚀 Uso Básico

### 1. Importar el componente

```jsx
import Notification from '../components/common/Notification';
// o si usas el barrel export:
import { Notification } from '../components/common';
```

### 2. Agregar estado en tu componente

```jsx
const [notification, setNotification] = useState({ 
  open: false, 
  message: '', 
  severity: 'success' 
});
```

### 3. Renderizar el componente

```jsx
<Notification 
  open={notification.open}
  message={notification.message}
  severity={notification.severity}
  onClose={() => setNotification({ ...notification, open: false })}
/>
```

### 4. Mostrar notificaciones

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

## 📋 Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `open` | boolean | ✅ Sí | - | Controla si la notificación está visible |
| `message` | string | ✅ Sí | - | Mensaje a mostrar |
| `severity` | string | ❌ No | `'success'` | Tipo: `'success'`, `'error'`, `'warning'`, `'info'` |
| `onClose` | function | ✅ Sí | - | Función a ejecutar al cerrar |
| `autoHideDuration` | number | ❌ No | `4000` | Tiempo en ms antes de auto-cerrar |
| `anchorOrigin` | object | ❌ No | `{ vertical: 'bottom', horizontal: 'right' }` | Posición de la notificación |

## 📝 Ejemplos Completos

### Ejemplo 1: Guardar Datos

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

### Ejemplo 2: Posición Personalizada

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

## 🎨 Colores por Severidad

- **success**: Verde - Para operaciones exitosas
- **error**: Rojo - Para errores
- **warning**: Naranja - Para advertencias
- **info**: Azul - Para información general

## 🔧 Implementado en:

- ✅ `Preferencias.jsx` - Al guardar preferencias de materias
- ✅ `Horarios.jsx` - Al generar/actualizar horarios

## 💡 Tips

1. **Helper Function**: Puedes crear una función helper para simplificar el uso:

```jsx
const showNotification = (message, severity = 'success') => {
  setNotification({ open: true, message, severity });
};

// Uso:
showNotification('Guardado exitosamente');
showNotification('Error al guardar', 'error');
```

2. **Custom Hook**: Para proyectos grandes, considera crear un custom hook:

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

## 📦 Exportación

El componente está exportado en `src/components/common/index.js`:

```jsx
export { default as Notification } from './Notification';
```
