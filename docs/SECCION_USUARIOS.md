# 📋 Sección de Usuarios - Administración

## 🎯 Descripción

Se ha creado una nueva sección **"Usuarios"** en el dashboard del administrador donde se pueden realizar todas las operaciones de gestión de usuarios:

- ✅ Ver lista de usuarios
- ✅ Crear nuevos usuarios
- ✅ Editar información de usuarios
- ✅ Restablecer contraseñas
- ✅ Eliminar usuarios
- ✅ Filtrar por rol

---

## 📁 Estructura de Archivos

```
src/
├── screens/
│   └── Usuarios.jsx                 # Pantalla principal de Usuarios
├── components/
│   └── usuarios/
│       ├── index.js                 # Exports del componente
│       └── UsuariosAdmin.jsx        # Componente principal
└── routes/
    └── Router.jsx                   # Actualizado con ruta /usuarios
```

---

## 🚀 Cómo Acceder

### 1. Opción 1: Desde el Sidebar
- Inicia sesión como administrador
- En el sidebar, haz clic en "Usuarios"
- Se redirigirá a `/usuarios`

### 2. Opción 2: URL Directa
```
http://localhost:5173/usuarios
```

---

## 📊 Funcionalidades Implementadas

### 1. **Vista de Usuarios** 
- Tabla con lista completa de usuarios
- Columnas: Nombre, Email, Rol, Estado, Última Actividad
- Tabla responsiva y estilizada

### 2. **Filtro por Rol**
- Dropdown para filtrar por:
  - Todos
  - Jefe de Carrera
  - Servicios Escolares
- Actualización inmediata sin recargar página

### 3. **Crear Usuario** ➕
- Dialog modal con formulario
- Campos: Nombre, Email, Rol
- Validación de campos requeridos
- Envío automático de email de bienvenida (TODO)
- Nuevo usuario se agrega inmediatamente a la tabla

### 4. **Editar Usuario** ✏️
- Dialog modal con información actual del usuario
- Permite modificar: Nombre, Email, Rol
- Validación de campos
- Actualización inmediata en tabla
- Envío de notificación por email (TODO)

### 5. **Restablecer Contraseña** 🔄
- Dialog modal mostrando datos del usuario
- Campo para ingresa contraseña temporal
- Validación de contraseña requerida
- Envío automático de email (TODO)
- Confirmación visual de éxito

### 6. **Eliminar Usuario** 🗑️
- Confirmación de seguridad antes de eliminar
- Usuario se remueve inmediatamente de la tabla
- Mensaje de éxito

---

## 🎨 Diseño

✅ **Interfaz Profesional** - Sigue el mismo estilo que AdminHome
✅ **Responsivo** - Funciona en móvil, tablet, desktop
✅ **Modo Oscuro/Claro** - Compatible con ambos temas
✅ **Feedback Visual** - Mensajes de éxito y spinners de carga
✅ **Validación** - Valida campos antes de enviar
✅ **Accesibilidad** - Tooltips en botones, labels en campos

---

## 📋 Datos Simulados Actuales

El componente usa 4 usuarios de ejemplo:

| Nombre | Email | Rol | Estado |
|--------|-------|-----|--------|
| Juan García | juan.garcia@ejemplo.com | Jefe | Activo |
| María López | maria.lopez@ejemplo.com | Secretaria | Activo |
| Carlos Rodríguez | carlos.rodriguez@ejemplo.com | Jefe | Inactivo |
| Ana Martínez | ana.martinez@ejemplo.com | Secretaria | Activo |

---

## 🔌 Puntos de Integración Backend (TODO)

Todos están marcados con `// TODO:` en UsuariosAdmin.jsx

### 1. Obtener usuarios
```javascript
// TODO: Integrar con API real para obtener usuarios
// GET /api/admin/usuarios
```

### 2. Crear usuario
```javascript
// TODO: Integrar con API real para crear usuario
// POST /api/admin/usuarios
```

### 3. Editar usuario
```javascript
// TODO: Integrar con API real para editar usuario
// PUT /api/admin/usuarios/{id}
```

### 4. Restablecer contraseña
```javascript
// TODO: Integrar con API real para resetear contraseña
// POST /api/admin/usuarios/{id}/reset-password
```

### 5. Eliminar usuario
```javascript
// TODO: Integrar con API real para eliminar usuario
// DELETE /api/admin/usuarios/{id}
```

### 6. Enviar emails
```javascript
// - Bienvenida: POST /api/admin/usuarios/{id}/send-welcome-email
// - Reset password: POST /api/admin/usuarios/{id}/send-password-email
// - Edición: POST /api/admin/usuarios/{id}/send-update-email
```

---

## 🧪 Pruebas Locales

Para testear sin backend:

```javascript
// Los datos están en memoria en UsuariosAdmin.jsx
// Al recargar la página, se reinician los datos

// Acciones que puedes probar:
1. Filtrar usuarios por rol
2. Crear nuevo usuario
3. Editar usuario existente
4. Resetear contraseña
5. Eliminar usuario
6. Ver mensajes de éxito
```

---

## 🔒 Control de Acceso

La pantalla de Usuarios está protegida:

```javascript
// En Usuarios.jsx
if (user.role !== 'admin') {
  return <Navigate to="/home" replace />;
}
```

Solo usuarios con rol `admin` pueden acceder a esta sección.

---

## 📱 Componentes Material-UI Utilizados

- Button
- Card, CardContent
- Dialog, DialogTitle, DialogContent, DialogActions
- TextField, Select, MenuItem, FormControl, InputLabel
- Table, TableHead, TableBody, TableRow, TableCell, TableContainer
- Chip
- Alert, AlertTitle
- Box, Stack, Divider
- Typography
- IconButton, Tooltip
- CircularProgress

---

## 🎯 Flujos de Uso

### Flujo 1: Crear Usuario
```
Click "+ Agregar Usuario"
    ↓
Dialog se abre
    ↓
Completa: Nombre, Email, Rol
    ↓
Click "Crear Usuario"
    ↓
✅ Usuario creado
✅ Usuario aparece en tabla
✅ Email de bienvenida enviado (TODO)
✅ Mensaje de éxito mostrado
```

### Flujo 2: Editar Usuario
```
Click ✏️ de usuario
    ↓
Dialog se abre con datos actuales
    ↓
Modifica campos deseados
    ↓
Click "Guardar Cambios"
    ↓
✅ Usuario actualizado en tabla
✅ Email de notificación enviado (TODO)
✅ Mensaje de éxito mostrado
```

### Flujo 3: Resetear Contraseña
```
Click 🔄 de usuario
    ↓
Dialog se abre
    ↓
Ingresa contraseña temporal
    ↓
Click "Restablecer y Enviar"
    ↓
✅ Contraseña actualizada en BD (TODO)
✅ Email con nueva contraseña enviado (TODO)
✅ Mensaje de éxito mostrado
```

### Flujo 4: Eliminar Usuario
```
Click 🗑️ de usuario
    ↓
Confirmación: ¿Estás seguro?
    ↓
Si confirma:
  ✅ Usuario eliminado de tabla
  ✅ Notificación enviada (TODO)
  ✅ Mensaje de éxito
```

---

## 🔄 Estado del Componente

```javascript
// Estados manejados:
- usuarios[]              // Lista de usuarios
- filterRol              // Filtro actual
- openResetDialog        // Visibility del dialog reset
- openAddUserDialog      // Visibility del dialog crear
- openEditDialog         // Visibility del dialog editar
- selectedUsuario        // Usuario seleccionado
- newPassword            // Contraseña en reset
- newUser{}              // Datos nuevo usuario
- editUser{}             // Datos usuario editado
- loadingReset           // Loading del reset
- loadingAdd             // Loading del crear
- loadingEdit            // Loading del editar
- successMessage         // Mensaje de éxito
```

---

## ✅ Checklist

- [x] Pantalla Usuarios.jsx creada
- [x] Componente UsuariosAdmin.jsx implementado
- [x] Ruta /usuarios añadida al router
- [x] Opción "Usuarios" en sidebar (admin)
- [x] Tabla de usuarios funcional
- [x] Filtro por rol funcional
- [x] Dialog crear usuario funcional
- [x] Dialog editar usuario funcional
- [x] Dialog resetear contraseña funcional
- [x] Eliminar usuario funcional
- [x] Validación de formularios
- [x] Mensajes de éxito
- [x] Control de acceso (solo admin)
- [x] Compatible oscuro/claro
- [x] Responsivo
- [x] Sin errores de sintaxis

---

## 🚀 Próximos Pasos

1. Integrar con API real para obtener usuarios
2. Implementar creación de usuarios en backend
3. Implementar edición de usuarios
4. Implementar reset de contraseña
5. Implementar eliminación de usuarios
6. Configurar servicio de emails
7. Agregar validación más robusta
8. Agregar búsqueda de usuarios (opcional)
9. Agregar paginación (opcional)
10. Agregar exportación de datos (opcional)

