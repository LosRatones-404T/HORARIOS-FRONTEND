# Quick Start - AdminHome

## 📱 Vista Rápida de la Interfaz

### Sección Superior: Encabezado + Estadísticas

```
═══════════════════════════════════════════════════════════════
 Bienvenido, Administrador
 Panel de control - Gestión de usuarios del sistema
═══════════════════════════════════════════════════════════════

┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐
│      👥 4        │  │      ✅ 3        │  │  ⚠️ 1        │
│  USUARIOS        │  │    USUARIOS      │  │  INACTIVOS   │
│   TOTALES        │  │    ACTIVOS       │  │   TOTALES    │
└──────────────────┘  └──────────────────┘  └──────────────┘
                   
┌──────────────────┐
│      📧 3        │
│    EMAILS        │
│  VERIFICADOS     │
└──────────────────┘
```

### Sección Media: Gestión de Usuarios

```
═══════════════════════════════════════════════════════════════
 GESTIÓN DE USUARIOS              [+ AGREGAR USUARIO]
═══════════════════════════════════════════════════════════════

Filtro por rol: [TODOS ▼]

┌─────────────────────────────────────────────────────────────┐
│ Nombre         Email              Rol          Estado       │
├─────────────────────────────────────────────────────────────┤
│ Juan García    juan@ejemplo.com   Jefe de      Activo       │
│                                   Carrera      🔄  🗑️        │
├─────────────────────────────────────────────────────────────┤
│ María López    maria@ejemplo.com  Servicios    Activo       │
│                                   Escolares    🔄  🗑️        │
├─────────────────────────────────────────────────────────────┤
│ Carlos Rodríguez carlos@ejemplo.com Jefe de    Inactivo     │
│                                    Carrera     🔄  🗑️        │
├─────────────────────────────────────────────────────────────┤
│ Ana Martínez   ana@ejemplo.com    Servicios    Activo       │
│                                   Escolares    🔄  🗑️        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🖱️ Interacciones Disponibles

### Botón: + AGREGAR USUARIO
```
┌──────────────────────────────────────────────────┐
│ Agregar Nuevo Usuario                            │
├──────────────────────────────────────────────────┤
│ Nombre: [_______________________________]         │
│ Email:  [_______________________________]         │
│ Rol:    [Jefe de Carrera ▼]                     │
│                                                   │
│ ℹ️  Se enviará un email al usuario con sus     │
│    credenciales de acceso                        │
│                                                   │
│              [Cancelar] [Crear Usuario]         │
└──────────────────────────────────────────────────┘
```

### Botón: 🔄 Restablecer Contraseña
```
┌──────────────────────────────────────────────────┐
│ Restablecer Contraseña                           │
├──────────────────────────────────────────────────┤
│ Usuario: Juan García                             │
│ Email:   juan@ejemplo.com                        │
│                                                   │
│ ℹ️  Se enviará un correo a juan@ejemplo.com     │
│    con la nueva contraseña                       │
│                                                   │
│ Nueva Contraseña: [________________________]     │
│                                                   │
│              [Cancelar] [Restablecer y Enviar]  │
└──────────────────────────────────────────────────┘
```

### Botón: 🗑️ Eliminar Usuario
```
¿Estás seguro de que deseas eliminar este usuario?

[Cancelar] [Eliminar]

→ Usuario eliminado correctamente ✅
```

---

## 🔄 Flujos de Usuario

### Flujo 1: Resetear Contraseña de Usuario

```
Usuario hace clic en 🔄
        ↓
Dialog se abre con datos del usuario
        ↓
Admin ingresa nueva contraseña temporal
        ↓
Click en "Restablecer y Enviar"
        ↓
✅ Contraseña actualizada en BD
✅ Email enviado al usuario con nueva contraseña
✅ Mensaje de éxito mostrado
✅ Dialog se cierra
```

### Flujo 2: Crear Nuevo Usuario

```
Admin click en "+ AGREGAR USUARIO"
        ↓
Dialog se abre con formulario vacío
        ↓
Completa: Nombre, Email, Rol
        ↓
Click en "Crear Usuario"
        ↓
✅ Usuario creado en BD
✅ Contraseña temporal generada
✅ Email de bienvenida enviado
✅ Usuario aparece en tabla
✅ Mensaje de éxito mostrado
✅ Dialog se cierra
```

### Flujo 3: Eliminar Usuario

```
Admin click en 🗑️
        ↓
Confirmación: ¿Estás seguro?
        ↓
Si confirma:
  ✅ Usuario eliminado de BD
  ✅ Usuario removido de tabla
  ✅ Mensaje de éxito mostrado
        ↓
Si cancela:
  → Nada sucede
```

### Flujo 4: Filtrar Usuarios

```
Admin selecciona rol en dropdown
        ↓
Tabla se filtra automáticamente
        ↓
Muestra solo usuarios del rol seleccionado
        ↓
Si no hay usuarios con ese rol:
  → Mostrar "No hay usuarios..."
```

---

## 📊 Datos que Se Muestran

### Por Usuario:
- ✅ Nombre completo
- ✅ Email
- ✅ Rol (con badge)
- ✅ Estado (Activo/Inactivo)
- ✅ Última actividad (fecha)

### Estadísticas:
- ✅ Cantidad total de usuarios
- ✅ Cantidad de usuarios activos
- ✅ Cantidad de usuarios inactivos
- ✅ Porcentaje de emails verificados

---

## 🎯 Casos de Uso Principales

### Caso 1: Usuario Olvida Contraseña
```
Admin recibe solicitud
  ↓
Busca al usuario en la tabla
  ↓
Hace click en 🔄
  ↓
Ingresa contraseña temporal
  ↓
Usuario recibe email con nueva contraseña
  ↓
Usuario puede acceder al sistema
```

### Caso 2: Agregar Nuevo Jefe de Carrera
```
Admin necesita crear nuevo usuario
  ↓
Click en "+ AGREGAR USUARIO"
  ↓
Ingresa: Juan Pérez, juan@ejemplo.com, Jefe
  ↓
Sistema crea usuario y envía credenciales
  ↓
Juan recibe email con acceso
  ↓
Juan ingresa al sistema
```

### Caso 3: Usuario Deja de Trabajar
```
Admin necesita remover usuario
  ↓
Localiza al usuario en tabla
  ↓
Click en 🗑️
  ↓
Confirma la eliminación
  ↓
Usuario removido del sistema
```

---

## ⚙️ Configuración

### Cambiar Filtro
```
Desplegable: [Todos ▼]
  → Todos
  → Jefe de Carrera
  → Servicios Escolares
```

### Ordenar Tabla
> Próxima mejora: Agregar ordenamiento por columnas

---

## 🚨 Validaciones

| Campo | Validación |
|-------|-----------|
| Nueva Contraseña | No puede estar vacía |
| Nombre | No puede estar vacío |
| Email | Formato válido (HTML5) |
| Rol | Debe seleccionar uno |

---

## 📨 Emails Enviados Automáticamente

### Email 1: Reset Password
```
Para: usuario@ejemplo.com
Asunto: Restablecimiento de Contraseña

Cuerpo: Nueva contraseña temporal + instrucciones
```

### Email 2: Welcome
```
Para: nuevo@usuario.com
Asunto: Bienvenida al Sistema

Cuerpo: Credenciales de acceso + instrucciones
```

---

## 💾 Datos Persistentes

El componente mantiene en memoria:
- Lista actual de usuarios
- Estados de dialogs abiertos/cerrados
- Datos de formularios siendo editados
- Mensajes de éxito/error

> **Nota**: Los datos simulados se pierden al recargar. Usar API real para persistencia.

---

## 🎨 Personalización

### Cambiar Número de Usuarios (para testing)
```javascript
// En AdminHome.jsx línea ~47
const [usuarios, setUsuarios] = useState([
  // Agregar más objetos aquí
  {
    id: 5,
    nombre: 'Nuevo Usuario',
    email: 'nuevo@ejemplo.com',
    rol: 'jefe',
    estado: 'activo',
    ultimaActividad: '2026-01-13'
  }
]);
```

### Cambiar Colores (temas)
El componente usa los colores del tema configurado:
- Primary (azul)
- Warning (naranja)
- Success (verde)
- Error (rojo)

Cambiar en `src/theme/theme.jsx`

---

## 🔗 Conexión con Otras Partes

```
Home.jsx
  ├─→ Lee rol del usuario
  └─→ Renderiza <AdminHome /> si rol === 'admin'

AdminHome.jsx
  ├─→ Muestra tabla de usuarios
  ├─→ Permite gestionar usuarios
  └─→ (Próxima integración: conectar con API)
```

---

## ✅ Checklist de Testing Manual

- [ ] Acceder como admin a `/home`
- [ ] Verificar tarjetas de estadísticas
- [ ] Filtrar por "Jefe de Carrera"
- [ ] Filtrar por "Servicios Escolares"
- [ ] Filtrar por "Todos"
- [ ] Click en 🔄 de un usuario
- [ ] Ingresar contraseña en dialog
- [ ] Click en "Restablecer y Enviar"
- [ ] Verificar spinner de carga
- [ ] Verificar mensaje de éxito
- [ ] Click en [+ AGREGAR USUARIO]
- [ ] Completar formulario
- [ ] Click en "Crear Usuario"
- [ ] Verificar que nuevo usuario aparece
- [ ] Click en 🗑️ para eliminar
- [ ] Confirmar eliminación
- [ ] Verificar que se eliminó
- [ ] Probar en modo oscuro
- [ ] Probar en dispositivo móvil

---

## 📱 Vista Móvil

En dispositivos pequeños:
- Tabla se hace scrolleable horizontalmente
- Tarjetas se apilan verticalmente
- Botones mantienen su funcionalidad
- Dialogs se adaptan al ancho de pantalla

---

## 🎓 Ejemplo: Cómo Usan Otros Homes

**JefeHome**: Muestra estadísticas de exámenes y permite navegar
**SecretariaHome**: Muestra alertas y accesos rápidos
**AdminHome**: Permite CRUD completo de usuarios

---

**¡AdminHome está listo para usar! 🚀**

Para integración con backend, consulta `ADMIN_HOME_BACKEND_INTEGRATION.md`

