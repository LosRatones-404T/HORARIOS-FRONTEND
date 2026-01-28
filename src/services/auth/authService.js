import { fetchLogin, fetchGet, fetchPost } from '../utils/helpers';

/**
 * Servicio de Autenticación
 * - Login
 * - Register
 * - Obtener información del usuario autenticado
 */

// Mock data para desarrollo
const mockAuthData = {
  token: 'mock_token_jwt_example_12345',
  token_type: 'bearer',
};

export const authService = {
  /**
   * Iniciar sesión
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object>} Token y tipo de token
   * @example
   * const response = await authService.login('admin', 'password123');
   * console.log(response.access_token); // Retorna el token JWT
   */
  login: async (username, password) => {
    try {
      const data = await fetchLogin(username, password);
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  /**
   * Registrar un nuevo usuario (solo admin)
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.username - Nombre de usuario
   * @param {string} userData.email - Email del usuario
   * @param {string} userData.password - Contraseña
   * @param {string} userData.role - Rol del usuario (ADMIN, JEFE_CARRERA, SECRETARIA, etc.)
   * @returns {Promise<Object>} Usuario creado
   * @example
   * const newUser = await authService.register({
   *   username: 'juan.garcia',
   *   email: 'juan@example.com',
   *   password: 'securePassword123',
   *   role: 'JEFE_CARRERA'
   * });
   */
  register: async (userData) => {
    try {
      const data = await fetchPost('/auth/register', userData);
      return data;
    } catch (error) {
      console.error('Error en register:', error);
      throw error;
    }
  },

  /**
   * Obtener información del usuario autenticado
   * @returns {Promise<Object>} Información del usuario (id, username, email, role, is_active)
   * @example
   * const user = await authService.me();
   * console.log(user.username); // Nombre del usuario autenticado
   */
  me: async () => {
    try {
      const data = await fetchGet('/auth/me');
      return data;
    } catch (error) {
      if (error.message.includes('401')) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        throw new Error('Sesión expirada');
      }
      console.error('Error en me:', error);
      throw error;
    }
  },
};

export default authService;
