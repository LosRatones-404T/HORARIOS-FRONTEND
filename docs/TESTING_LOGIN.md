## Paso 1: Crear Usuario de Prueba en el Backend

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

usuarios para cada rol:

```bash
# Admin
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123","role":"ADMIN"}'

# Secretaria
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"escolares","email":"secretaria@example.com","password":"escolares123","role":"SECRETARIA"}'

# Jefe de Carrera
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"jefe","email":"jefe@example.com","password":"carrera123","role":"JEFE_CARRERA"}'
```
