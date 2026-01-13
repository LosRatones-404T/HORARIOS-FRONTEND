# Horarios Frontend

Sistema de gestión de horarios y exámenes - UNSIS

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 📚 Documentación

La documentación completa del proyecto está en la carpeta `/docs`:

- **[ARQUITECTURA.md](docs/ARQUITECTURA.md)** - Estructura del proyecto, patrones y convenciones
- **[COMPONENTES_MUI.md](docs/COMPONENTES_MUI.md)** - Guía de componentes Material-UI
- **[TEMA.md](docs/TEMA.md)** - Sistema de theming y paleta de colores
- **[NOTIFICACIONES.md](docs/NOTIFICACIONES.md)** - Sistema de notificaciones
- **[INTEGRACION_BACKEND.md](docs/INTEGRACION_BACKEND.md)** - Guía de integración con API

---

## 🏗️ Stack Tecnológico

- **React 18** - Framework UI
- **React Router v6** - Routing
- **Material-UI v5** - Componentes UI
- **Vite** - Build tool
- **React Icons** - Iconografía

---

## 📂 Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── common/       # Componentes comunes
│   ├── home/         # Componentes de Home
│   └── layout/       # Layout y navegación
├── screens/          # Pantallas principales
├── hooks/            # Custom hooks
├── services/         # API y servicios
├── store/            # Estado global
├── theme/            # Configuración del tema
└── constants/        # Constantes globales
```

Ver [ARQUITECTURA.md](docs/ARQUITECTURA.md) para más detalles.

---

## 🎨 Tema y Colores

El proyecto usa Material-UI con soporte para modo claro/oscuro.

### Colores Principales (Modo Claro)

| Color | Valor | Uso |
|-------|-------|-----|
| Primary | `#4A83DD` | Elementos principales |
| Secondary | `#3E4E6C` | Elementos secundarios |
| Accent | `#DFBCE2` | Destacados |

Ver [TEMA.md](docs/TEMA.md) para la paleta completa.

---

## 🔐 Usuarios de Prueba

```javascript
// Jefe de Carrera
username: "jefe"
password: "pass123"

// Secretaria
username: "secretaria"
password: "pass123"

// Admin
username: "admin"
password: "pass123"
```

---

## 🧩 Componentes Principales

### Layout
- `MainLayout` - Layout principal con sidebar
- `Header` - Barra superior
- `Sidebar` - Navegación lateral

### Notificaciones
- `NotificationMenu` - Sistema completo de notificaciones
- Ver [NOTIFICACIONES.md](docs/NOTIFICACIONES.md)

### Home Dashboards
- `JefeHome` - Dashboard Jefe de Carrera
- `AdminHome` - Dashboard Admin
- `SecretariaHome` - Dashboard Secretaria

---

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

---

## 📦 Integración con Backend

Ver [INTEGRACION_BACKEND.md](docs/INTEGRACION_BACKEND.md) para:
- Configuración de API
- Endpoints por módulo
- Manejo de errores
- Ejemplos de implementación

---

## 📝 Licencia

Este proyecto es parte del sistema UNSIS.

---

## 🤝 Contribuir

1. Seguir las convenciones en [ARQUITECTURA.md](docs/ARQUITECTURA.md)
2. Documentar nuevos componentes
3. Mantener consistencia con el tema Material-UI
4. Agregar tipos de notificaciones en [NOTIFICACIONES.md](docs/NOTIFICACIONES.md)

