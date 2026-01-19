# 🚀 Testing del Login - Instrucciones Rápidas

## Prerequisitos

1. **Backend corriendo**: El backend debe estar en `http://localhost:8000`
2. **Usuario de prueba**: Debes tener al menos un usuario registrado en el backend

---

## Paso 1: Crear Usuario de Prueba en el Backend

Usa curl o el endpoint de registro del backend:

```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

O crea usuarios para cada rol:

```bash
# Admin
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123","role":"ADMIN"}'

# Secretaria
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"secretaria","email":"secretaria@example.com","password":"secre123","role":"SECRETARIA"}'

# Jefe de Carrera
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"jefe","email":"jefe@example.com","password":"jefe123","role":"JEFE_CARRERA"}'
```

---

## Paso 2: Iniciar el Frontend

```bash
npm run dev
```

El frontend se abrirá en `http://localhost:5173`

---

## Paso 3: Probar el Login

### Escenario 1: Login exitoso

1. Ve a `http://localhost:5173/login`
2. Ingresa credenciales:
   - Usuario: `admin`
   - Contraseña: `admin123`
3. Click en "Iniciar Sesión"
4. **Resultado esperado**: 
   - Botón muestra "Iniciando sesión..."
   - Redirección a `/home`
   - Vista de Admin se muestra correctamente

### Escenario 2: Credenciales incorrectas

1. Ingresa credenciales incorrectas
2. **Resultado esperado**: 
   - Alert rojo con mensaje de error
   - Permanece en la pantalla de login

### Escenario 3: Validación de campos vacíos

1. Deja los campos vacíos
2. Click en "Iniciar Sesión"
3. **Resultado esperado**: 
   - Alert "Por favor completa todos los campos"

---

## Paso 4: Verificar Protección de Rutas

### Test 1: Acceso sin autenticación

1. Abre el navegador en modo incógnito
2. Intenta acceder a `http://localhost:5173/home`
3. **Resultado esperado**: Redirección automática a `/login`

### Test 2: Control de acceso por roles

**Como Secretaria:**
1. Login como secretaria
2. Intenta acceder a `http://localhost:5173/usuarios`
3. **Resultado esperado**: Redirección a `/home` (no tiene permisos)

**Como Admin:**
1. Login como admin
2. Accede a `http://localhost:5173/usuarios`
3. **Resultado esperado**: Acceso permitido

---

## Paso 5: Verificar Vistas por Usuario

### Admin
- Dashboard completo
- Acceso a todos los módulos
- Sidebar con todas las opciones

### Secretaria
- Vista de secretaría
- Acceso a período académico
- Generación de horarios

### Jefe de Carrera
- Vista de jefe
- Estado del examen
- Logs recientes
- Revisión de horarios

---

## Paso 6: Probar Logout

1. Click en el botón de logout (en el header o sidebar)
2. **Resultado esperado**:
   - localStorage limpio (token y usuario eliminados)
   - Redirección a `/login`
   - No se puede acceder a rutas protegidas sin login

---

## 🔍 Debugging

### Ver datos en localStorage

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Ver usuario
console.log(JSON.parse(localStorage.getItem('auth_user')))

// Ver token
console.log(localStorage.getItem('auth_token'))
```

### Ver peticiones HTTP

1. Abre DevTools (F12)
2. Ve a la pestaña "Network"
3. Haz login
4. Verás:
   - POST `/auth/login` - Debe retornar 200 con el token
   - GET `/auth/me` - Debe retornar 200 con info del usuario

### Limpiar sesión manualmente

```javascript
localStorage.clear()
```

---

## ✅ Checklist de Pruebas

- [ ] Login con credenciales correctas funciona
- [ ] Login con credenciales incorrectas muestra error
- [ ] Validación de campos vacíos funciona
- [ ] Token se guarda en localStorage
- [ ] Usuario se guarda en localStorage
- [ ] Redirección a /home después del login
- [ ] Vista correcta según rol del usuario (admin, secretaria, jefe)
- [ ] Rutas protegidas redirigen a login si no autenticado
- [ ] Control de acceso por roles funciona
- [ ] Botón de loading se muestra durante el login
- [ ] Logout limpia localStorage
- [ ] No se puede acceder a rutas protegidas después del logout

---

## 🐛 Problemas Comunes

### Error: "Error al conectar con el servidor"

**Solución**: Verifica que el backend esté corriendo en `http://localhost:8000`

```bash
# Verificar si el backend está corriendo
curl http://localhost:8000/docs
```

### Error: CORS

**Solución**: Asegúrate de que el backend permita peticiones desde `http://localhost:5173`

En el backend (FastAPI), debe haber algo como:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Error: "401 Unauthorized" después de login exitoso

**Solución**: El token puede estar expirando muy rápido. Verifica la configuración de expiración del JWT en el backend.

### La vista no cambia según el rol

**Solución**: 
1. Verifica que el rol se esté mapeando correctamente
2. Abre la consola y revisa el usuario: `localStorage.getItem('auth_user')`
3. Verifica que el rol sea uno de: `admin`, `escolares`, `jefe`

---

## 📱 Contacto

Si encuentras problemas, revisa:
1. [docs/API.md](API.md) - Documentación de APIs
2. [docs/LOGIN_IMPLEMENTATION.md](LOGIN_IMPLEMENTATION.md) - Detalles de implementación
3. Consola del navegador para errores
4. Network tab para ver peticiones HTTP

---

**Última actualización**: 18 de enero de 2026
