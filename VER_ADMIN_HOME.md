# 🚀 Cómo Ver el AdminHome en Acción

## 📝 Pasos para acceder

### 1. Asegúrate que el servidor está corriendo
```bash
npm run dev
```

La aplicación debería estar en: `http://localhost:5173`

### 2. Inicia sesión con credenciales de administrador

**Usuario:**
```
Username: admin
Password: pass123
```

### 3. ¡Verás el AdminHome!

---

## 🎯 Qué deberías ver

Una vez logueado como admin, verás:

### Sección Superior
- **Título**: "Bienvenido, Administrador"
- **Subtítulo**: "Panel de control - Gestión de usuarios del sistema"

### Tarjetas de Estadísticas (4)
- **👥 Usuarios Totales**: 4
- **✅ Usuarios Activos**: 3
- **⚠️ Usuarios Inactivos**: 1
- **📧 Emails Verificados**: 3

### Tabla de Usuarios
Una tabla con 4 usuarios:
1. **Juan García** - juan.garcia@ejemplo.com - Jefe - Activo
2. **María López** - maria.lopez@ejemplo.com - Secretaria - Activo
3. **Carlos Rodríguez** - carlos.rodriguez@ejemplo.com - Jefe - Inactivo
4. **Ana Martínez** - ana.martinez@ejemplo.com - Secretaria - Activo

Cada usuario tiene 2 botones de acción:
- 🔄 Restablecer Contraseña
- 🗑️ Eliminar Usuario

---

## 🧪 Prueba Cada Funcionalidad

### 1. Filtrar por Rol
- Selecciona en el dropdown "Filtro por rol"
- Elige "Jefe de Carrera" y verás solo 2 usuarios
- Elige "Servicios Escolares" y verás otros 2 usuarios

### 2. Restablecer Contraseña
- Haz click en 🔄 de cualquier usuario
- Se abre un dialog mostrando:
  - Nombre del usuario
  - Email
  - Alerta informativa
- Ingresa una contraseña temporal
- Click en "Restablecer y Enviar"
- Verás mensaje ✅ "Contraseña restablecida..."

### 3. Crear Nuevo Usuario
- Click en botón "+ AGREGAR USUARIO" (arriba a la derecha)
- Se abre dialog con formulario:
  - Nombre Completo
  - Email
  - Rol (dropdown)
- Completa los campos
- Click en "Crear Usuario"
- El nuevo usuario aparece en la tabla
- Verás mensaje ✅ "Usuario ... creado exitosamente"

### 4. Eliminar Usuario
- Haz click en 🗑️ de cualquier usuario
- Te pedirá confirmación
- Si confirmas, el usuario se elimina de la tabla
- Verás mensaje ✅ "Usuario eliminado correctamente"

---

## 🎨 Características Visuales

✅ **Responsive**: Funciona en móvil, tablet y desktop
✅ **Modo Oscuro**: Si activas modo oscuro, se adapta automáticamente
✅ **Colores**: Usa el tema de Material-UI
✅ **Iconos**: Tiene iconos para cada acción
✅ **Loading**: Muestra spinner mientras procesa

---

## 🐛 Si no ves nada...

### Checklist:
- [ ] El servidor está corriendo (`npm run dev`)
- [ ] Iniciaste sesión con username: **admin**, password: **pass123**
- [ ] La URL es `http://localhost:5173/home` (o similar según tu configuración)
- [ ] Abre la consola del navegador (F12) y busca errores rojos
- [ ] Si hay errores, envía la captura de pantalla

### Soluciones comunes:
1. **"Página en blanco"**: Recarga la página (F5)
2. **"Error 404"**: Verifica que el servidor está corriendo
3. **"Redirige a login"**: Asegúrate de usar credenciales correctas
4. **"Tabla vacía"**: Es normal si eliminaste todos los usuarios. Crea uno nuevo.

---

## 📊 Estructura de lo que ves

```
┌─────────────────────────────────────────────────────────┐
│ Bienvenido, Administrador                               │
│ Panel de control - Gestión de usuarios del sistema      │
└─────────────────────────────────────────────────────────┘

┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐
│ 4 TOTAL │ │ 3 ACTIV │ │ 1 INACTV │ │ 3 EMAILS │
└─────────┘ └─────────┘ └──────────┘ └──────────┘

┌─────────────────────────────────────────────────────────┐
│ GESTIÓN DE USUARIOS         [+ AGREGAR USUARIO]        │
├─────────────────────────────────────────────────────────┤
│ Filtro: [TODOS ▼]                                       │
├─────────────────────────────────────────────────────────┤
│ TABLA:                                                  │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Nombre  Email  Rol  Estado  Última Actividad ACCIONES
│ ├───────────────────────────────────────────────────┤  │
│ │ Juan    ...    Jefe  Activo  2026-01-13  🔄  🗑️   │
│ │ María   ...    Sec.  Activo  2026-01-12  🔄  🗑️   │
│ │ Carlos  ...    Jefe  Inact.  2026-01-05  🔄  🗑️   │
│ │ Ana     ...    Sec.  Activo  2026-01-13  🔄  🗑️   │
│ └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 💡 Tips

- Los datos son **simulados** (se pierden al recargar). Para persistencia, necesita integración con backend.
- Todos los botones están **funcionales**
- Los **dialogs** se pueden cerrar con el botón X o Cancelar
- Los **mensajes** desaparecen después de 5 segundos
- Puedes **filtrar** sin recargar la página

---

## ✨ ¡Todo está listo!

El AdminHome está completamente implementado y funcional.

**¿Problemas?** Revisa que:
1. Npm run dev esté ejecutándose
2. Las credenciales sean: admin / pass123
3. No haya errores en la consola (F12)

