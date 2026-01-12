// Store de autenticación simple (dummy)
const STORAGE_KEY = 'auth_user';

// Usuarios dummy del sistema
const DUMMY_USERS = [
  { username: 'admin', password: 'pass123', role: 'admin', name: 'Administrador' },
  { username: 'secretaria', password: 'pass123', role: 'secretaria', name: 'Secretaria Académica' },
  { username: 'jefe', password: 'pass123', role: 'jefe', name: 'Jefe de Carrera' },
];

// Obtener usuario actual del localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// Autenticar usuario (dummy)
export const login = (username, password) => {
  const user = DUMMY_USERS.find(
    u => u.username === username && u.password === password
  );
  
  if (user) {
    const userData = {
      username: user.username,
      role: user.role,
      name: user.name,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true, user: userData };
  }
  
  return { success: false, error: 'Credenciales incorrectas' };
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Verificar si está autenticado
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
