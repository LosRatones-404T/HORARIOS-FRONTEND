# AdminHome - Panel de Administración

## Descripción General

El panel AdminHome proporciona funcionalidades de gestión de usuarios del sistema. Permite:

1. **Ver todos los usuarios** con información detallada (nombre, email, rol, estado, última actividad)
2. **Restablecer contraseñas** - Generar nueva contraseña temporal y enviar por email
3. **Crear nuevos usuarios** - Agregar jefes de carrera o personal de servicios escolares
4. **Eliminar usuarios** - Remover usuarios del sistema
5. **Filtrar usuarios** - Por rol (Jefe de Carrera, Servicios Escolares)
6. **Estadísticas** - Usuarios totales, activos, inactivos y emails verificados

## Estructura del Componente

### Estado (State)
- `usuarios`: Array con los usuarios del sistema
- `openResetDialog`: Controla visibilidad del dialog de resetear contraseña
- `openAddUserDialog`: Controla visibilidad del dialog de agregar usuario
- `selectedUsuario`: Usuario seleccionado para resetear contraseña
- `newPassword`: Nueva contraseña a generar
- `newUser`: Datos del nuevo usuario
- `successMessage`: Mensaje de éxito a mostrar
- `filterRol`: Filtro actual por rol

### Componentes UI Utilizados
- **Card**: Para tarjetas de estadísticas
- **Table**: Para listar usuarios
- **Dialog**: Para formularios de resetear contraseña y agregar usuario
- **Chip**: Para mostrar rol y estado
- **Button & IconButton**: Para acciones
- **TextField & Select**: Para formularios
- **Alert**: Para mensajes de éxito/información

## Integraciones Pendientes con Backend

### 1. Obtener Lista de Usuarios
```javascript
// En useEffect, reemplazar:
// fetchUsuarios();

// Implementar servicio en api.js:
// GET /api/admin/usuarios
```

### 2. Restablecer Contraseña
```javascript
// En handleResetPassword, reemplazar:
// const response = await resetPassword(selectedUsuario.id, newPassword);
// await sendPasswordEmail(selectedUsuario.email, newPassword);

// Implementar endpoints:
// POST /api/admin/usuarios/{id}/reset-password
// POST /api/admin/usuarios/{id}/send-email
```

### 3. Crear Nuevo Usuario
```javascript
// En handleAddUser, reemplazar:
// const response = await createUser(newUser);
// await sendWelcomeEmail(newUser.email, newUser.nombre);

// Implementar endpoints:
// POST /api/admin/usuarios
// POST /api/admin/usuarios/{id}/send-welcome-email
```

### 4. Eliminar Usuario
```javascript
// En handleDeleteUser, reemplazar el fetch actual:
// DELETE /api/admin/usuarios/{id}
```

## Datos Simulados Actuales

El componente utiliza datos simulados con 4 usuarios de ejemplo:
- Juan García (Jefe de Carrera) - Activo
- María López (Servicios Escolares) - Activo
- Carlos Rodríguez (Jefe de Carrera) - Inactivo
- Ana Martínez (Servicios Escolares) - Activo

Estos deben ser reemplazados con llamadas a la API real.

## Flujos de Uso

### Resetear Contraseña
1. Hacer clic en icono de actualizar en la fila del usuario
2. Se abre dialog mostrando datos del usuario
3. Ingresar nueva contraseña temporal
4. Hacer clic en "Restablecer y Enviar"
5. Se ejecutan:
   - API call para actualizar contraseña en base de datos
   - API call para enviar email con nueva contraseña
6. Mostrar mensaje de éxito

### Agregar Nuevo Usuario
1. Hacer clic en botón "Agregar Usuario"
2. Se abre dialog con formulario
3. Completar: Nombre, Email, Rol
4. Hacer clic en "Crear Usuario"
5. Se ejecutan:
   - API call para crear usuario en base de datos
   - API call para enviar email de bienvenida con credenciales
6. Usuario aparece en la tabla y mostrar mensaje de éxito

## Estilos y Temas

El componente es totalmente compatible con el sistema de temas (claro/oscuro):
- Utiliza `useTheme()` de Material-UI
- Utiliza `useCustomTheme()` para acceder al modo oscuro
- Los colores se adaptan automáticamente

## Variables de TODO

Buscar `TODO:` en el archivo para encontrar puntos de integración con el backend.

