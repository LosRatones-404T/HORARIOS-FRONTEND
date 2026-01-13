# Guía de Integración AdminHome con Backend

## 🔌 Servicios API a Implementar

### 1. Obtener Lista de Usuarios

```javascript
// api.js - Servicio para obtener usuarios
export const getUsuarios = async () => {
  try {
    const response = await fetch('/api/admin/usuarios', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    throw error;
  }
};
```

### 2. Restablecer Contraseña

```javascript
// api.js - Servicio para resetear contraseña
export const resetPasswordUsuario = async (usuarioId, newPassword) => {
  try {
    const response = await fetch(`/api/admin/usuarios/${usuarioId}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ password: newPassword })
    });
    return await response.json();
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
```

### 3. Enviar Email con Nueva Contraseña

```javascript
// api.js - Servicio para enviar email
export const sendPasswordEmail = async (usuarioId, email, password) => {
  try {
    const response = await fetch(`/api/admin/usuarios/${usuarioId}/send-password-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ 
        email, 
        newPassword: password,
        emailType: 'reset_password'
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
```

### 4. Crear Nuevo Usuario

```javascript
// api.js - Servicio para crear usuario
export const createUsuario = async (userData) => {
  try {
    const response = await fetch('/api/admin/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(userData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
```

### 5. Enviar Email de Bienvenida

```javascript
// api.js - Servicio para enviar email de bienvenida
export const sendWelcomeEmail = async (usuarioId, email, nombre, tempPassword) => {
  try {
    const response = await fetch(`/api/admin/usuarios/${usuarioId}/send-welcome-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ 
        email,
        nombre,
        tempPassword,
        emailType: 'welcome'
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};
```

### 6. Eliminar Usuario

```javascript
// api.js - Servicio para eliminar usuario
export const deleteUsuario = async (usuarioId) => {
  try {
    const response = await fetch(`/api/admin/usuarios/${usuarioId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
```

---

## 🔄 Integración en AdminHome.jsx

### Paso 1: Importar servicios

```javascript
// En AdminHome.jsx, agregar al inicio:
import { 
  getUsuarios, 
  resetPasswordUsuario, 
  sendPasswordEmail,
  createUsuario,
  sendWelcomeEmail,
  deleteUsuario 
} from '../../services/api';
```

### Paso 2: Cargar usuarios al montar el componente

```javascript
// Reemplazar el useEffect vacío con:
useEffect(() => {
  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      alert('Error al cargar usuarios');
      console.error(error);
    }
  };

  fetchUsuarios();
}, []);
```

### Paso 3: Integrar resetPassword

```javascript
// Reemplazar en handleResetPassword:
const handleResetPassword = async () => {
  if (!newPassword.trim()) {
    alert('Por favor, ingresa una contraseña');
    return;
  }

  setLoadingReset(true);
  try {
    // 1. Resetear contraseña en DB
    await resetPasswordUsuario(selectedUsuario.id, newPassword);
    
    // 2. Enviar email
    await sendPasswordEmail(
      selectedUsuario.id, 
      selectedUsuario.email, 
      newPassword
    );
    
    setSuccessMessage(
      `Contraseña restablecida para ${selectedUsuario.nombre}. Email enviado a ${selectedUsuario.email}`
    );
    
    setTimeout(() => setSuccessMessage(''), 5000);
    handleCloseResetDialog();
  } catch (error) {
    alert('Error al restablecer la contraseña');
    console.error(error);
  } finally {
    setLoadingReset(false);
  }
};
```

### Paso 4: Integrar createUsuario

```javascript
// Reemplazar en handleAddUser:
const handleAddUser = async () => {
  if (!newUser.nombre.trim() || !newUser.email.trim()) {
    alert('Por favor, completa todos los campos');
    return;
  }

  setLoadingAdd(true);
  try {
    // 1. Crear usuario en DB
    const createdUser = await createUsuario({
      nombre: newUser.nombre,
      email: newUser.email,
      rol: newUser.rol,
      estado: 'activo'
    });
    
    // 2. Generar contraseña temporal
    const tempPassword = generateTempPassword(); // Función auxiliar
    
    // 3. Actualizar contraseña del nuevo usuario
    await resetPasswordUsuario(createdUser.id, tempPassword);
    
    // 4. Enviar email de bienvenida
    await sendWelcomeEmail(
      createdUser.id,
      newUser.email,
      newUser.nombre,
      tempPassword
    );
    
    // 5. Actualizar lista local
    setUsuarios([...usuarios, createdUser]);
    
    setSuccessMessage(
      `Usuario ${newUser.nombre} creado exitosamente. Email enviado a ${newUser.email}`
    );
    
    setTimeout(() => setSuccessMessage(''), 5000);
    handleCloseAddUserDialog();
  } catch (error) {
    alert('Error al crear el usuario');
    console.error(error);
  } finally {
    setLoadingAdd(false);
  }
};
```

### Paso 5: Integrar deleteUsuario

```javascript
// Reemplazar en handleDeleteUser:
const handleDeleteUser = async (usuarioId) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    try {
      await deleteUsuario(usuarioId);
      setUsuarios(usuarios.filter(u => u.id !== usuarioId));
      setSuccessMessage('Usuario eliminado correctamente');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      alert('Error al eliminar el usuario');
      console.error(error);
    }
  }
};
```

---

## 🛠️ Función Auxiliar para Generar Contraseña Temporal

```javascript
// Agregar en AdminHome.jsx
const generateTempPassword = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*';
  
  const all = uppercase + lowercase + numbers + special;
  let password = '';
  
  // Asegurar que tenga al menos 1 de cada tipo
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  // Llenar el resto aleatoriamente
  for (let i = password.length; i < 12; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }
  
  // Mezclar la contraseña
  return password.split('').sort(() => Math.random() - 0.5).join('');
};
```

---

## 📧 Estructura de Email Recomendada para Backend

### Email: Reset Password

```
To: usuario@ejemplo.com
Subject: Restablecimiento de Contraseña - Sistema de Horarios

Cuerpo:
---
Hola {nombre},

Se ha solicitado el restablecimiento de tu contraseña en el Sistema de Gestión de Horarios.

Tu nueva contraseña temporal es:
{newPassword}

Por favor:
1. Accede al sistema con esta contraseña
2. Cambia tu contraseña por una más segura en Preferencias
3. No compartas tu contraseña con nadie

Si no solicitaste este cambio, contacta al administrador.

Saludos,
Equipo de Administración
---
```

### Email: Welcome (Nuevo Usuario)

```
To: usuario@ejemplo.com
Subject: Bienvenido al Sistema de Gestión de Horarios

Cuerpo:
---
Hola {nombre},

¡Bienvenido al Sistema de Gestión de Horarios!

Tu cuenta ha sido creada exitosamente.

Credenciales de Acceso:
- Email: {email}
- Contraseña temporal: {tempPassword}
- Rol: {rol}

Por favor:
1. Accede al sistema con estas credenciales
2. Cambia tu contraseña en Preferencias
3. Revisa la sección de Preferencias para configurar tu perfil

URL de Acceso: https://ejemplo.com/login

¿Preguntas? Contacta al administrador.

Saludos,
Equipo de Administración
---
```

---

## 🧪 Testing de Endpoints

```javascript
// Test en consola del navegador
const testResetPassword = async () => {
  try {
    const result = await resetPasswordUsuario(1, 'Test123!@#');
    console.log('✅ Reset OK:', result);
  } catch (error) {
    console.error('❌ Reset Error:', error);
  }
};

const testCreateUser = async () => {
  try {
    const result = await createUsuario({
      nombre: 'Test User',
      email: 'test@ejemplo.com',
      rol: 'jefe'
    });
    console.log('✅ Create OK:', result);
  } catch (error) {
    console.error('❌ Create Error:', error);
  }
};
```

---

## ⚙️ Variables de Entorno Necesarias

```bash
# .env
VITE_API_URL=http://localhost:3000/api
VITE_EMAIL_FROM=noreply@ejemplo.com
VITE_APP_NAME=Sistema de Gestión de Horarios
```

---

## 📝 Checklist de Integración

- [ ] Crear servicios en `api.js`
- [ ] Importar servicios en AdminHome.jsx
- [ ] Reemplazar `useEffect` vacío con `fetchUsuarios()`
- [ ] Integrar `handleResetPassword`
- [ ] Integrar `handleAddUser`
- [ ] Integrar `handleDeleteUser`
- [ ] Agregar función `generateTempPassword()`
- [ ] Configurar backend con endpoints
- [ ] Configurar servicio de emails
- [ ] Probar cada funcionalidad
- [ ] Validar permisos en backend (solo admin)
- [ ] Agregar logs de auditoría en backend

