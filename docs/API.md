# Documentación de APIs Conectadas

Este documento registra todas las APIs del backend que están integradas y funcionando en el frontend.

**Base URL:** `http://localhost:8000`

---

## 🔐 Autenticación

### POST `/auth/login`
**Estado:** ✅ Conectado

Obtiene token de acceso JWT para autenticar al usuario.

**Headers:**
```
Content-Type: application/x-www-form-urlencoded
```

**Body (form-urlencoded):**
```
username: string (requerido)
password: string (requerido)
```

**Respuesta exitosa (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Errores:**
- `401 Unauthorized`: Credenciales inválidas
- `400 Bad Request`: Datos de entrada inválidos

**Uso en el frontend:**
- Archivo: `src/store/authStore.js` - función `login()`
- El token se guarda en `localStorage` como `auth_token`
- Se incluye automáticamente en todas las peticiones subsecuentes

---

### GET `/auth/me`
**Estado:** ✅ Conectado

Obtiene la información del perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "username": "juan",
  "email": "juan@example.com",
  "role": "SECRETARIA",
  "is_active": true,
  "created_at": "2025-11-28T14:18:27.419Z"
}
```

**Errores:**
- `401 Unauthorized`: Token ausente, inválido o expirado

**Uso en el frontend:**
- Archivo: `src/store/authStore.js` - función `getCurrentUser()`
- Se llama automáticamente al cargar la aplicación si hay token
- Los datos del usuario se almacenan en `localStorage` como `auth_user`

---

### POST `/auth/register`
**Estado:** 🔄 Pendiente de integración

Registra un nuevo usuario en el sistema (solo para administradores).

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Body (JSON):**
```json
{
  "username": "juan",
  "email": "juan@example.com",
  "password": "MiPasswordSegura123",
  "role": "SECRETARIA"
}
```

**Roles permitidos:**
- `ADMIN`
- `JEFE_CARRERA`
- `JEFE_ESCOLARES`
- `SECRETARIA`

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "username": "juan",
  "email": "juan@example.com",
  "role": "SECRETARIA",
  "is_active": true,
  "created_at": "2025-11-28T14:18:27.419Z"
}
```

**Errores:**
- `400 Bad Request`: Datos inválidos
- `409 Conflict`: Usuario ya existe
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permisos de administrador

**Uso en el frontend:**
- Pendiente de implementar en pantalla de Usuarios

---

## 📋 Exámenes

### GET `/examenes/exams`
**Estado:** 🔄 Pendiente de integración

Lista de exámenes programados.

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "course": "Diseño Estructurado de Algoritmos",
    "group": "106-A",
    "professor": "Mtro. Irving Ulises Hernández Miguel",
    "classroom": "CETI-S.O.",
    "date": "2025-10-28",
    "start": "17:00:00",
    "end": "19:00:00"
  }
]
```

**Uso en el frontend:**
- Pendiente de implementar

---

### POST `/examenes/seed-pdf-data`
**Estado:** 🔄 Pendiente de integración

Carga datos de ejemplo del PDF (grupo 106-A).

**Respuesta exitosa (200):**
```json
{
  "message": "Datos del PDF (Grupo 106-A) cargados exitosamente"
}
```

**Uso en el frontend:**
- Pendiente de implementar

---

## 📝 Notas de Implementación

### Manejo de Tokens
- El token JWT se guarda en `localStorage` con la key `auth_token`
- Se incluye automáticamente en el header `Authorization: Bearer <token>` para todas las peticiones autenticadas
- Si el token expira, se redirige al usuario al login

### Mapeo de Roles
Backend → Frontend:
- `ADMIN` → `admin` (acceso completo)
- `JEFE_CARRERA` → `jefe` (vista de jefe de carrera)
- `JEFE_ESCOLARES` → `escolares` (vista de servicios escolares)
- `SECRETARIA` → `escolares` (vista de servicios escolares)

**Nota:** `JEFE_ESCOLARES` y `SECRETARIA` comparten la misma vista de servicios escolares y NO tienen acceso a la vista de jefes de carrera.

### Configuración
- Variable de entorno: `VITE_API_URL` (default: `http://localhost:8000`)
- Archivo de configuración: `src/conf/env.js`
- Modo mock: Desactivado (`USE_MOCK_DATA = false`)

### CORS
El backend debe permitir peticiones desde `http://localhost:5173` (puerto por defecto de Vite).

---

## 🔄 Estado General

| Endpoint | Estado | Prioridad | Notas |
|----------|--------|-----------|-------|
| POST /auth/login | ✅ Conectado | Alta | Funcionando |
| GET /auth/me | ✅ Conectado | Alta | Funcionando |
| POST /auth/register | 🔄 Pendiente | Media | Para admin |
| GET /examenes/exams | 🔄 Pendiente | Baja | Próxima fase |
| POST /examenes/seed-pdf-data | 🔄 Pendiente | Baja | Próxima fase |

---

## 🐛 Debugging

### Ver peticiones en la consola
El servicio API registra todas las peticiones y respuestas en la consola del navegador cuando está en modo desarrollo.

### Errores comunes

**401 Unauthorized:**
- Verificar que el token esté presente en localStorage
- Verificar que el token no haya expirado
- Intentar hacer login nuevamente

**CORS errors:**
- Verificar configuración de CORS en el backend
- Asegurar que el backend esté corriendo en el puerto correcto

**Network errors:**
- Verificar que el backend esté corriendo
- Verificar la URL base en `src/conf/env.js`

---

**Última actualización:** 18 de enero de 2026
