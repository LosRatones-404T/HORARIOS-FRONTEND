# Comparativa - Estructura de Homes por Rol

## 🏠 Tres Vistas Diferentes, Misma Arquitectura

### 1️⃣ JefeHome - Jefe de Carrera
**Responsabilidad**: Gestión de exámenes y generación de horarios

```
Encabezado
├── Título: "Bienvenido, Jefe de Carrera"
├── Subtítulo: "Panel de control - Gestión de exámenes"

Alerts Condicionales
├── Horario Rechazado (si existe)
├── Horario Aprobado con Observaciones (si aplica)

Tarjetas de Estadísticas (4)
├── 📋 Total Exámenes Generados
├── 🔄 Estado Actual
├── 📅 Periodo Actual
└── 🎓 Semestres Activos

Actividad Reciente
├── Historial de logs con estado
├── Colores codificados por estado
└── Botón: Ver historial completo
```

**Datos que recibe**: `estadoExamen`, `logsRecientes`

---

### 2️⃣ SecretariaHome - Servicios Escolares
**Responsabilidad**: Revisión y aprobación de horarios

```
Encabezado
├── Título: "Bienvenido, Servicios Escolares"
├── Subtítulo: "Panel de control - Revisión de horarios de exámenes"

Alerts Condicionales
├── Horarios Pendientes de Revisión (con botón rápido)

Tarjetas de Estadísticas (3)
├── 🔄 Horarios por Revisar
├── ✅ Revisados Hoy
└── 📊 Total Revisados

Accesos Rápidos (2 cards clicables)
├── 📝 Revisar Horarios (con contador)
└── 📅 Ver Calendario
```

**Datos que recibe**: None (datos locales/simulados)

---

### 3️⃣ AdminHome - Administrador ⭐ NUEVO
**Responsabilidad**: Gestión de usuarios y permisos

```
Encabezado
├── Título: "Bienvenido, Administrador"
├── Subtítulo: "Panel de control - Gestión de usuarios del sistema"

Alerts Condicionales
├── Mensajes de Éxito (se cierran automáticamente)

Tarjetas de Estadísticas (4)
├── 👥 Usuarios Totales
├── ✅ Usuarios Activos
├── ⚠️ Usuarios Inactivos
└── 📧 Emails Verificados

Gestión de Usuarios
├── Header con botón: Agregar Usuario
├── Filtro por Rol (selector)
├── Tabla de Usuarios con columnas:
│   ├── Nombre
│   ├── Email
│   ├── Rol
│   ├── Estado
│   ├── Última Actividad
│   └── Acciones (🔄 Reset, 🗑️ Eliminar)
│
├── Dialog 1: Restablecer Contraseña
│   ├── Datos del usuario
│   ├── Campo: Nueva Contraseña
│   ├── Alerta: Sobre envío de email
│   └── Acciones: Cancelar / Restablecer y Enviar
│
└── Dialog 2: Agregar Nuevo Usuario
    ├── Campo: Nombre Completo
    ├── Campo: Email
    ├── Selector: Rol
    ├── Alerta: Sobre envío de credenciales
    └── Acciones: Cancelar / Crear Usuario
```

**Datos que recibe**: None (datos locales/simulados, listos para integrar API)

---

## 🎯 Patrón Común en los Tres

```javascript
function HomeComponent() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 4, px: 3 }}>
      {/* 1. Encabezado */}
      <Box>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </Box>

      {/* 2. Alerts Condicionales */}
      {condition && <Alert>{message}</Alert>}

      {/* 3. Tarjetas de Estadísticas */}
      <Grid container spacing={3}>
        {statistics.map(stat => <StatCard />)}
      </Grid>

      {/* 4. Contenido Principal */}
      <Card>
        {/* Tabla, Cards, o Accesos Rápidos */}
      </Card>

      {/* 5. Dialogs Modales (si aplica) */}
      <Dialog>{/* Formularios */}</Dialog>
    </Box>
  );
}
```

---

## 🔄 Flujo de Datos en Home.jsx

```jsx
import { JefeHome, AdminHome, SecretariaHome } from '../components/home';

function Home() {
  const { user, estadoExamen, logsRecientes } = useHomeData();

  const renderContent = () => {
    switch (user?.role) {
      case 'jefe':
        return <JefeHome 
          estadoExamen={estadoExamen} 
          logsRecientes={logsRecientes} 
        />;
      
      case 'admin':
        return <AdminHome />;
      
      case 'secretaria':
        return <SecretariaHome />;
    }
  };

  return (
    <MainLayout showSidebar={true}>
      {renderContent()}
    </MainLayout>
  );
}
```

---

## 📊 Comparativa de Componentes

| Aspecto | JefeHome | SecretariaHome | AdminHome |
|---------|----------|----------------|-----------|
| **Estado Local** | Bajo (solo UI) | Bajo (solo UI) | Medio (tabla + dialogs) |
| **Estadísticas** | 4 cards | 3 cards | 4 cards |
| **Tabla/Datos** | Logs (lista) | Accesos rápidos | Usuarios (tabla) |
| **Dialogs** | 0 | 0 | 2 (Reset + Add) |
| **Acciones** | Navegación | Navegación | CRUD (Create, Read, Update, Delete) |
| **Iconos** | 🎯 Exámenes | 📋 Revisión | 👥 Usuarios |
| **Filtros** | No | No | Sí (por rol) |

---

## 🎨 Elementos Visuales Consistentes

✅ **Typography**: h4 para títulos, body1 para subtítulos
✅ **Cards**: Bordes 1px, borderRadius: 2, elevación: 0
✅ **Colores**: Primary, Warning, Success, Error (según contexto)
✅ **Spacing**: py: 4, px: 3, mb: 3, spacing: 3
✅ **Responsive**: Grid con xs/sm/md breakpoints
✅ **Temas**: Totalmente compatible oscuro/claro

---

## 🚀 Ejemplo: Cómo Agregar Datos en AdminHome

### Paso 1: Actualizar useHomeData hook
```javascript
// hooks/useHomeData.js
export const useHomeData = () => {
  const [usuarios, setUsuarios] = useState([]);
  
  useEffect(() => {
    fetchUsuarios(); // API call
  }, []);

  return { usuarios };
};
```

### Paso 2: Usar en Home.jsx
```javascript
function Home() {
  const { user, estadoExamen, logsRecientes, usuarios } = useHomeData();
  
  return (
    <MainLayout>
      {user?.role === 'admin' && <AdminHome usuarios={usuarios} />}
    </MainLayout>
  );
}
```

### Paso 3: Recibir en AdminHome
```javascript
const AdminHome = ({ usuarios: initialUsuarios }) => {
  const [usuarios, setUsuarios] = useState(initialUsuarios || []);
  // ...
};
```

