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
