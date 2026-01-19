import { authApi } from '../services/api';

// Keys para localStorage
const STORAGE_KEY_USER = 'auth_user';
const STORAGE_KEY_TOKEN = 'auth_token';

/**
 * Mapeo de roles del backend al frontend
 * - ADMIN: Acceso completo al sistema
 * - JEFE_CARRERA: Vista de jefe de carrera
 * - JEFE_ESCOLARES: Vista de servicios escolares
 * - SECRETARIA: Vista de servicios escolares
 */
const mapRole = (backendRole) => {
  const roleMap = {
    'ADMIN': 'admin',
    'JEFE_CARRERA': 'jefe',
    'JEFE_ESCOLARES': 'escolares',
    'SECRETARIA': 'escolares',
  };
  return roleMap[backendRole] || backendRole.toLowerCase();
};

/**
 * Obtener usuario actual del localStorage
 * @returns {Object|null} Usuario actual o null
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEY_USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }
};

/**
 * Obtener token de autenticación
 * @returns {string|null} Token o null
 */
export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEY_TOKEN);
};

/**
 * Autenticar usuario usando el backend
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} Resultado de la autenticación
 */
export const login = async (username, password) => {
  try {
    // Llamar al backend
    const tokenData = await authApi.login(username, password);
    
    // Guardar el token
    localStorage.setItem(STORAGE_KEY_TOKEN, tokenData.access_token);
    
    // Obtener información del usuario
    const userData = await authApi.me();
    
    // Mapear el rol del backend al frontend
    const mappedUser = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      role: mapRole(userData.role),
      name: userData.username, // Usar username como nombre por ahora
      isActive: userData.is_active,
    };
    
    // Guardar usuario en localStorage
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(mappedUser));
    
    return { 
      success: true, 
      user: mappedUser 
    };
  } catch (error) {
    console.error('Error en login:', error);
    return { 
      success: false, 
      error: error.message || 'Error al iniciar sesión. Verifica tus credenciales.' 
    };
  }
};

/**
 * Cerrar sesión
 */
export const logout = () => {
  localStorage.removeItem(STORAGE_KEY_TOKEN);
  localStorage.removeItem(STORAGE_KEY_USER);
};

/**
 * Verificar si el usuario está autenticado
 * @returns {boolean} true si está autenticado
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  const user = getCurrentUser();
  return !!(token && user);
};

/**
 * Verificar autenticación y actualizar datos del usuario
 * Se debe llamar al cargar la aplicación
 * @returns {Promise<boolean>} true si la sesión es válida
 */
export const verifyAuth = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      return false;
    }
    
    // Verificar que el token siga siendo válido
    const userData = await authApi.me();
    
    // Actualizar datos del usuario en localStorage
    const mappedUser = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      role: mapRole(userData.role),
      name: userData.username,
      isActive: userData.is_active,
    };
    
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(mappedUser));
    
    return true;
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    // Si hay error, limpiar la sesión
    logout();
    return false;
  }
};

