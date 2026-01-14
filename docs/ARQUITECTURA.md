# Arquitectura del Proyecto

Estructura y organización del código del sistema de gestión de horarios.

## Estructura de Carpetas

```
HORARIOS-FRONTEND/
├── public/                    # Archivos estáticos
├── src/
│   ├── assets/               # Imágenes, logos, recursos
│   ├── components/           # Componentes reutilizables
│   │   ├── common/          # Componentes comunes
│   │   │   ├── MateriaCard.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── HorarioSemanal.jsx
│   │   │   ├── NotificationMenu.jsx
│   │   │   ├── NotificationItem.jsx
│   │   │   └── index.js
│   │   ├── home/            # Componentes específicos de Home
│   │   │   ├── JefeHome.jsx
│   │   │   ├── AdminHome.jsx
│   │   │   ├── SecretariaHome.jsx
│   │   │   └── index.js
│   │   ├── layout/          # Componentes de layout
│   │   │   ├── Header.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── sidebar/
│   │   │       ├── Sidebar.jsx
│   │   │       ├── components/
│   │   │       │   ├── Body.jsx
│   │   │       │   ├── Footer.jsx
│   │   │       │   ├── Header.jsx
│   │   │       │   └── OptionButton.jsx
│   │   │       └── config/
│   │   │           └── menus.jsx
│   │   └── ThemeToggle.jsx
│   ├── conf/                # Configuración
│   │   └── env.js
│   ├── constants/           # Constantes globales
│   │   └── estadosExamen.js
│   ├── contexts/            # Context API
│   │   └── ThemeContext.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── useTheme.js
│   │   ├── useNotifications.js
│   │   └── useHomeData.js
│   ├── routes/              # Configuración de rutas
│   │   └── Router.jsx
│   ├── screens/             # Pantallas principales
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Generar.jsx
│   │   ├── Calendario.jsx
│   │   ├── Preferencias.jsx
│   │   └── NotFound.jsx
│   ├── services/            # Servicios API
│   │   └── api.js
│   ├── store/               # Estado global
│   │   └── authStore.js
│   ├── theme/               # Configuración del tema
│   │   └── theme.jsx
│   ├── App.jsx              # Componente raíz
│   ├── App.css
│   ├── main.jsx             # Punto de entrada
│   └── index.css
├── docs/                    # Documentación
│   ├── ARQUITECTURA.md
│   ├── COMPONENTES_MUI.md
│   ├── NOTIFICACIONES.md
│   ├── TEMA.md
│   └── INTEGRACION_BACKEND.md
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Convenciones de Nomenclatura

### Archivos y Carpetas
- **Componentes**: PascalCase (`Header.jsx`, `NotificationMenu.jsx`)
- **Hooks**: camelCase con prefijo `use` (`useTheme.js`, `useNotifications.js`)
- **Utilidades**: camelCase (`authStore.js`, `api.js`)
- **Constantes**: camelCase con sufijo descriptivo (`estadosExamen.js`, `menus.jsx`)
- **Carpetas**: camelCase (`components/`, `screens/`)

### Variables y Funciones
```javascript
// Componentes
const MyComponent = () => {}

// Funciones
const handleSubmit = () => {}
const fetchData = async () => {}

// Constantes
const API_URL = 'https://...'
const ESTADOS = { ... }

// State
const [isOpen, setIsOpen] = useState(false)
const [userData, setUserData] = useState(null)
```

## Patrones de Diseño

### Componentes Funcionales
Todos los componentes usan React Hooks (no clases):

```jsx
import { useState, useEffect } from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return (
    // JSX
  );
};

export default MyComponent;
```

### Custom Hooks
Extraer lógica reutilizable en hooks personalizados:

```javascript
// hooks/useMyFeature.js
export const useMyFeature = () => {
  const [data, setData] = useState(null);
  
  const fetchData = async () => {
    // Logic
  };
  
  return { data, fetchData };
};
```

### Context API
Para estado global (tema, auth):

```jsx
// contexts/MyContext.jsx
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};
```

## Flujo de Datos

### Autenticación
```
Login → authStore.login() → localStorage 
     → Navigate to /home
     
Protected Route → getCurrentUser() → Redirect if null
```

### Notificaciones
```
User Login → useNotifications() → loadNotifications(role)
          → setState(notifications)
          
Click Notification → markAsRead(id) → navigate(route)
```

### Generación de Horarios
```
Generar Screen → ESTADOS (constants)
              → Mock data (later: API)
              → State management
              → Stepper workflow
```

## Componentes Clave

### Layout Components

**MainLayout** - Wrapper principal con sidebar
```jsx
<MainLayout showSidebar={true}>
  {children}
</MainLayout>
```

**Header** - Barra superior con búsqueda, notificaciones, usuario
**Sidebar** - Menú lateral de navegación

### Common Components

**NotificationMenu** - Sistema de notificaciones completo  
**NotificationItem** - Item individual de notificación  
**MateriaCard** - Card para materias en Preferencias  
**HorarioSemanal** - Tabla de horarios semanal  
**Notification** - Toast/Snackbar de notificaciones

### Home Components

**JefeHome** - Dashboard del Jefe de Carrera  
**AdminHome** - Dashboard del Administrador  
**SecretariaHome** - Dashboard de Secretaria

## Estado y Hooks

### useState
Para estado local de componentes:
```javascript
const [open, setOpen] = useState(false);
const [data, setData] = useState([]);
```

### useEffect
Para side effects (API calls, subscriptions):
```javascript
useEffect(() => {
  fetchData();
}, [dependency]);
```

### Custom Hooks
- `useTheme()` - Manejo del tema claro/oscuro
- `useNotifications()` - Sistema de notificaciones
- `useHomeData()` - Datos del dashboard Home

## Routing

### Rutas Públicas
- `/login` - Login
- `/forgot-password` - Recuperar contraseña

### Rutas Protegidas
- `/home` - Dashboard principal
- `/generar` - Generar horarios/exámenes
- `/calendario` - Gestión de calendario
- `/preferencias` - Preferencias de materias

### Protección de Rutas
Todas las rutas protegidas verifican autenticación:
```jsx
if (!user) {
  return <Navigate to="/login" replace />;
}
```

## Estilos

### Material-UI sx prop
Prioridad para estilos:
```jsx
<Box sx={{ 
  bgcolor: 'background.paper',
  p: 2,
  borderRadius: 2 
}}>
```

### CSS Modules
No se usan, se prefiere sx prop de MUI.

### Tailwind CSS
Configurado pero se prioriza Material-UI.

## Build y Deploy

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## Dependencias Principales

- **React 18** - Framework UI
- **React Router v6** - Routing
- **Material-UI v5** - Componentes UI
- **Vite** - Build tool
- **React Icons** - Iconografía

## Mejores Prácticas

1. **Modularización**: Separar lógica en componentes pequeños y reutilizables
2. **Custom Hooks**: Extraer lógica compleja a hooks personalizados
3. **Constants**: Centralizar constantes en carpeta `constants/`
4. **Props Destructuring**: Destructurar props en parámetros de función
5. **Naming**: Nombres descriptivos y consistentes
6. **Comments**: Documentar funciones y componentes complejos
7. **Error Handling**: Manejar errores en async operations
8. **Accessibility**: Usar ARIA labels donde sea necesario

## Próximos Pasos

- [ ] Integración con backend (ver INTEGRACION_BACKEND.md)
- [ ] Testing (Jest + React Testing Library)
- [ ] Optimización de bundle size
- [ ] PWA capabilities
- [ ] Internacionalización (i18n)
