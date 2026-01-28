# Consumo de la API de Horarios

Guía para testing y uso de la API de autenticación.

## Configuración

**Base URL:** http://localhost:8000  
**Swagger UI:** http://localhost:8000/docs  
**Variable de entorno:** `VITE_API_URL=http://localhost:8000`

**Roles permitidos:** `ADMIN`, `JEFE_CARRERA`, `JEFE_ESCOLARES`, `SECRETARIA`

**Mapeo de roles:**
- `ADMIN` → `admin`
- `JEFE_CARRERA` → `jefe`
- `JEFE_ESCOLARES` → `escolares`
- `SECRETARIA` → `escolares`

---

## Usuarios de Prueba

```bash
# Admin
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123","role":"ADMIN"}'

# Servicios Escolares
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"escolares","email":"escolares@example.com","password":"escolares123","role":"SECRETARIA"}'

# Jefe Escolares
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"jefe_escolares","email":"jefe.escolares@example.com","password":"jefe123","role":"JEFE_ESCOLARES"}'

# Jefe de Carrera
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"jefe","email":"jefe@example.com","password":"carrera123","role":"JEFE_CARRERA"}'
```

**Credenciales:**

| Usuario | Contraseña | Rol Backend | Rol Frontend |
|---------|-----------|-------------|--------------|
| admin | admin123 | ADMIN | admin |
| escolares | escolares123 | SECRETARIA | escolares |
| jefe_escolares | jefe123 | JEFE_ESCOLARES | escolares |
| jefe | carrera123 | JEFE_CARRERA | jefe |

---

## Endpoints

**POST /auth/register** - Registrar usuario
```json
{ "username": "juan", "email": "juan@example.com", "password": "pass123", "role": "SECRETARIA" }
```

**POST /auth/login** - Obtener token (x-www-form-urlencoded)
```
username=juan&password=pass123
```
Respuesta: `{ "access_token": "...", "token_type": "bearer" }`

**GET /auth/me** - Usuario actual (Header: `Authorization: Bearer <TOKEN>`)

---

## Ejemplos

**Login con cURL:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=admin&password=admin123'
```

**Login en el proyecto:**
```javascript
import { login } from '../store/authStore';

const result = await login('admin', 'admin123');
if (result.success) {
  // Usuario autenticado: result.user
}
```

---

## Errores Comunes

- **400 Bad Request:** Usuario ya existe o datos inválidos
- **401 Unauthorized:** Token inválido o expirado - hacer login nuevamente
- **422 Validation Error:** Campos requeridos faltantes
- **CORS Error:** Backend debe permitir peticiones desde `http://localhost:5173`

---

**Última actualización:** 18 de enero de 2026
