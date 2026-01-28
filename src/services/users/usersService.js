import { fetchGet, fetchPost, fetchPut, fetchDelete } from '../utils/helpers';

/**
 * Servicio de Gestión de Usuarios
 * - Obtener todos los usuarios
 * - Cambiar contraseña
 * - Cambiar rol
 * - Activar/Desactivar usuario
 * - Cambiar email
 * - Eliminar usuario
 */

// Mock data para desarrollo
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    is_active: true,
  },
  {
    id: 2,
    username: 'jefe.carrera',
    email: 'jefe@example.com',
    role: 'JEFE_CARRERA',
    is_active: true,
  },
  {
    id: 3,
    username: 'secretaria',
    email: 'secretaria@example.com',
    role: 'SECRETARIA',
    is_active: true,
  },
];

export const usersService = {
  /**
   * Obtener todos los usuarios
   * @returns {Promise<Array>} Lista de usuarios
   * @example
   * const users = await usersService.getAllUsers();
   * console.log(users); // [{id: 1, username: 'admin', ...}, ...]
   */
  getAllUsers: async () => {
    try {
      const data = await fetchGet('/users/');
      return data;
    } catch (error) {
      console.error('Error en getAllUsers:', error);
      throw error;
    }
  },

  /**
   * Obtener un usuario por username
   * @param {string} username - Nombre de usuario
   * @returns {Promise<Object>} Datos del usuario
   * @example
   * const user = await usersService.getUser('admin');
   */
  getUser: async (username) => {
    try {
      const data = await fetchGet(`/users/${encodeURIComponent(username)}`);
      return data;
    } catch (error) {
      console.error('Error en getUser:', error);
      throw error;
    }
  },

  /**
   * Actualizar contraseña de un usuario
   * @param {string} username - Nombre de usuario
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise<Object>} Usuario actualizado
   * @example
   * await usersService.updatePassword('admin', 'newPassword123');
   */
  updatePassword: async (username, newPassword) => {
    try {
      const data = await fetchPost(
        `/users/update-password?username=${encodeURIComponent(username)}&new_password=${encodeURIComponent(newPassword)}`
      );
      return data;
    } catch (error) {
      console.error('Error en updatePassword:', error);
      throw error;
    }
  },

  /**
   * Cambiar rol de un usuario
   * @param {string} username - Nombre de usuario
   * @param {string} newRole - Nuevo rol (ADMIN, JEFE_CARRERA, SECRETARIA)
   * @returns {Promise<Object>} Usuario actualizado
   * @example
   * await usersService.changeRole('jefe.carrera', 'SECRETARIA');
   */
  changeRole: async (username, newRole) => {
    try {
      const data = await fetchPut(
        `/users/change-role?username=${encodeURIComponent(username)}&new_role=${encodeURIComponent(newRole)}`
      );
      return data;
    } catch (error) {
      console.error('Error en changeRole:', error);
      throw error;
    }
  },

  /**
   * Activar o desactivar un usuario
   * @param {string} username - Nombre de usuario
   * @returns {Promise<Object>} Usuario actualizado con estado toggle
   * @example
   * await usersService.toggleActive('jefe.carrera');
   */
  toggleActive: async (username) => {
    try {
      const data = await fetchPut(
        `/users/toggle-active?username=${encodeURIComponent(username)}`
      );
      return data;
    } catch (error) {
      console.error('Error en toggleActive:', error);
      throw error;
    }
  },

  /**
   * Cambiar email de un usuario
   * @param {string} username - Nombre de usuario
   * @param {string} newEmail - Nuevo email
   * @returns {Promise<Object>} Usuario actualizado
   * @example
   * await usersService.changeEmail('admin', 'newemail@example.com');
   */
  changeEmail: async (username, newEmail) => {
    try {
      const data = await fetchPut(
        `/users/change-email?username=${encodeURIComponent(username)}&new_email=${encodeURIComponent(newEmail)}`
      );
      return data;
    } catch (error) {
      console.error('Error en changeEmail:', error);
      throw error;
    }
  },

  /**
   * Eliminar un usuario
   * @param {string} username - Nombre de usuario
   * @returns {Promise<Object>} Respuesta del servidor
   * @example
   * await usersService.deleteUser('admin');
   */
  deleteUser: async (username) => {
    try {
      const data = await fetchDelete(`/users/${encodeURIComponent(username)}`);
      return data;
    } catch (error) {
      console.error('Error en deleteUser:', error);
      throw error;
    }
  },

  /**
   * SOLO DESARROLLO: Obtener mock users
   */
  getMockUsers: async () => {
    return mockUsers;
  },
};

export default usersService;
