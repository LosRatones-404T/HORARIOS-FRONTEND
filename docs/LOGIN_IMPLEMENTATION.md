# Guía de Implementación del Login con Backend

## ✅ Cambios Realizados

### 1. Documentación API
- Creado [docs/API.md](docs/API.md) con documentación completa de las APIs integradas
- Documenta endpoints de autenticación (login, me, register)
- Incluye ejemplos de uso, códigos HTTP y manejo de errores

### 2. Configuración de Entorno
- Actualizado [src/conf/env.js](src/conf/env.js)
  - URL del backend: `http://localhost:8000`
  - Modo mock desactivado: `USE_MOCK_DATA = false`
- Creado [.env.example](.env.example) con variables de entorno necesarias

### 3. Servicio de Autenticación
- Actualizado [src/services/api.js](src/services/api.js)
- Agregados métodos:
  - `authApi.login(username, password)` - Iniciar sesión
  - `authApi.me()` - Obtener perfil del usuario
  - `authApi.register(userData)` - Registrar usuario (solo admin)

### 4. Store de Autenticación
- Actualizado [src/store/authStore.js](src/store/authStore.js)
- Ahora usa el backend real en lugar de datos dummy
- Funciones principales:
  - `login(username, password)` - Autenticación asíncrona
  - `logout()` - Cerrar sesión
  - `getCurrentUser()` - Obtener usuario actual
  - `getAuthToken()` - Obtener token JWT
  - `verifyAuth()` - Verificar validez de la sesión
  - `isAuthenticated()` - Verificar si está autenticado

### 5. Componente Login
- Actualizado [src/screens/Login.jsx](src/screens/Login.jsx)
- Login asíncrono con indicador de carga
- Manejo de errores mejorado
- Feedback visual durante el proceso

### 6. Protección de Rutas
- Creado [src/components/common/ProtectedRoute.jsx](src/components/common/ProtectedRoute.jsx)
- Protege rutas que requieren autenticación
- Soporta control de acceso por roles
- Redirige a login si no está autenticado

### 7. Router Actualizado
- Actualizado [src/routes/Router.jsx](src/routes/Router.jsx)
- Todas las rutas protegidas con `ProtectedRoute`
- Control de acceso por roles:
  - **Admin**: Acceso completo (incluye `/usuarios`)
  - **Secretaria**: `/periodo-academico` y rutas compartidas
  - **Jefe**: `/revision` y rutas compartidas
  - **Todos**: `/home`, `/generar`, `/calendario`, `/preferencias`

---

## 🚀 Cómo Usar

### Iniciar el Backend

```bash
# Asegúrate de que el backend esté corriendo en http://localhost:8000
cd ../HORARIOS-BACKEND
# Seguir instrucciones del backend para iniciar
```

### Iniciar el Frontend

```bash
# Instalar dependencias si es necesario
npm install

# Iniciar en modo desarrollo
npm run dev
```

### Credenciales de Prueba

Según el backend, debes tener usuarios registrados. Ejemplo:

```
Usuario: admin
Password: (tu contraseña configurada)
```

### Flujo de Autenticación

1. **Login**: El usuario ingresa credenciales en `/login`
2. **Autenticación**: Se envía petición POST a `/auth/login`
3. **Token**: El backend devuelve un JWT
4. **Usuario**: Se obtiene la info del usuario desde `/auth/me`
5. **Almacenamiento**: Token y datos del usuario se guardan en localStorage
6. **Redirección**: Se redirige a `/home`
7. **Vista por Rol**: El componente Home muestra la vista según el rol del usuario

### Vistas por Usuario

**Admin** (`AdminHome`):
- Estadísticas del sistema
- Acceso a gestión de usuarios
- Vista completa de todas las funcionalidades

**Jefe de Carrera** (`JefeHome`):
- Estado del examen actual
- Logs de cambios recientes
- Funciones de revisión y aprobación

**Secretaria** (`SecretariaHome`):
- Gestión de períodos académicos
- Generación de horarios
- Calendario de exámenes

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (opcional):

```env
VITE_API_URL=http://localhost:8000
```

Si no se define, usa `http://localhost:8000` por defecto.

### Mapeo de Roles

El sistema mapea los roles del backend a nombres internos:

| Backend | Frontend |
|---------|----------|
| `ADMIN` | `admin` |
| `JEFE_CARRERA` | `jefe` |
| `JEFE_ESCOLARES` | `jefe` |
| `SECRETARIA` | `escolares` |

---

## 🐛 Debugging

### Ver peticiones HTTP

Abre la consola del navegador (F12) y ve a la pestaña Network para ver las peticiones.

### Errores comunes

**401 Unauthorized**:
- Verifica que las credenciales sean correctas
- El token puede haber expirado
- Intenta hacer login nuevamente

**Network Error / CORS**:
- Verifica que el backend esté corriendo
- Asegúrate de que el backend permita peticiones desde `http://localhost:5173`
- Revisa la configuración de CORS en el backend

**Error al conectar con el servidor**:
- Verifica que el backend esté corriendo en `http://localhost:8000`
- Revisa la URL en `src/conf/env.js`

### Verificar el estado de autenticación

En la consola del navegador:

```javascript
// Ver usuario actual
localStorage.getItem('auth_user')

// Ver token
localStorage.getItem('auth_token')

// Limpiar sesión
localStorage.clear()
```

---

## 📋 Checklist de Verificación

- [ ] Backend corriendo en `http://localhost:8000`
- [ ] Frontend corriendo en `http://localhost:5173`
- [ ] Usuario de prueba creado en el backend
- [ ] Login funciona correctamente
- [ ] Token se guarda en localStorage
- [ ] Redirección a `/home` después del login
- [ ] Vista correcta según el rol del usuario
- [ ] Rutas protegidas funcionan (redirige a login si no está autenticado)
- [ ] Control de acceso por roles funciona
- [ ] Logout limpia la sesión y redirige a login

---

## 🎯 Próximos Pasos

1. **Integrar más endpoints**: Examenes, períodos académicos, etc.
2. **Mejorar manejo de errores**: Toast notifications en lugar de alerts
3. **Refresh token**: Implementar renovación automática del token
4. **Perfil de usuario**: Página para editar perfil
5. **Recordar sesión**: Opción "Mantener sesión iniciada"
6. **Recuperar contraseña**: Conectar la funcionalidad de reset password

---

**Documentación completa de APIs**: [docs/API.md](docs/API.md)
