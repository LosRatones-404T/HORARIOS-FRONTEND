import { fetchGet, fetchPost, fetchPut, fetchDelete } from '../utils/helpers';

/**
 * Servicio de Preferencias de Materias
 * - Obtener preferencias del usuario
 * - Establecer preferencias
 * - Actualizar preferencias
 * - Eliminar preferencias
 * - Obtener opciones disponibles
 */

// Mock data para desarrollo
const mockPreferencias = {
  usuario: 'jefe.carrera',
  materiasFavoritas: ['Cálculo I', 'Programación I', 'Álgebra Lineal'],
  horarioPrefijo: 'mañana', // 'mañana', 'tarde', 'noche', 'mixto'
  preferenciasNotificaciones: {
    cambiosHorario: true,
    generacionExamenes: true,
    modificacionesPeriodo: true,
    disponibilidadAulas: false
  },
  porcentajeAvanceVisual: true,
  frecuenciaActualizacion: 'realtime' // 'realtime', 'cada_hora', 'diaria'
};

const mockMaterias = [
  { id: 1, nombre: 'Cálculo I', codigo: 'MAT101', carrera: 'Ingeniería en Sistemas' },
  { id: 2, nombre: 'Álgebra Lineal', codigo: 'MAT102', carrera: 'Ingeniería en Sistemas' },
  { id: 3, nombre: 'Programación I', codigo: 'INF101', carrera: 'Ingeniería en Sistemas' },
  { id: 4, nombre: 'Física General', codigo: 'FIS101', carrera: 'Ingeniería en Sistemas' },
  { id: 5, nombre: 'Química General', codigo: 'QUI101', carrera: 'Ingeniería en Sistemas' }
];

export const preferenciasService = {
  /**
   * Obtener preferencias del usuario autenticado
   * @returns {Promise<Object>} Preferencias del usuario
   * @example
   * const prefs = await preferenciasService.obtenerPreferencias();
   * console.log(prefs.materiasFavoritas); // ['Cálculo I', ...]
   */
  obtenerPreferencias: async () => {
    try {
      return await fetchGet('/preferencias');
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para preferencias:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockPreferencias);
        }, 300);
      });
    }
  },

  /**
   * Obtener preferencias de un usuario específico (solo admin)
   * @param {string} username - Nombre del usuario
   * @returns {Promise<Object>} Preferencias del usuario
   * @example
   * const prefs = await preferenciasService.obtenerPreferenciasPorUsuario('jefe.carrera');
   */
  obtenerPreferenciasPorUsuario: async (username) => {
    try {
      return await fetchGet(`/preferencias/usuario/${encodeURIComponent(username)}`);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para preferencias de usuario:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...mockPreferencias, usuario: username });
        }, 300);
      });
    }
  },

  /**
   * Establecer o actualizar preferencias del usuario
   * @param {Object} datos - Datos de preferencias a guardar
   * @param {Array} [datos.materiasFavoritas] - Lista de materias favoritas
   * @param {string} [datos.horarioPrefijo] - Horario preferido
   * @param {Object} [datos.preferenciasNotificaciones] - Configuración de notificaciones
   * @param {boolean} [datos.porcentajeAvanceVisual] - Mostrar porcentaje de avance
   * @param {string} [datos.frecuenciaActualizacion] - Frecuencia de actualización
   * @returns {Promise<Object>} Preferencias actualizadas
   * @example
   * const actualizado = await preferenciasService.establecerPreferencias({
   *   materiasFavoritas: ['Cálculo I', 'Programación I'],
   *   horarioPrefijo: 'tarde',
   *   preferenciasNotificaciones: {
   *     cambiosHorario: true,
   *     generacionExamenes: false
   *   }
   * });
   */
  establecerPreferencias: async (datos) => {
    try {
      return await fetchPost('/preferencias', datos);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para establecer preferencias:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          Object.assign(mockPreferencias, datos);
          resolve(mockPreferencias);
        }, 300);
      });
    }
  },

  /**
   * Actualizar preferencias parciales
   * @param {Object} datos - Datos a actualizar
   * @returns {Promise<Object>} Preferencias actualizadas
   * @example
   * const actualizado = await preferenciasService.actualizarPreferencias({
   *   horarioPrefijo: 'noche'
   * });
   */
  actualizarPreferencias: async (datos) => {
    try {
      return await fetchPut('/preferencias', datos);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para actualizar preferencias:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          Object.assign(mockPreferencias, datos);
          resolve(mockPreferencias);
        }, 300);
      });
    }
  },

  /**
   * Agregar una materia a favoritas
   * @param {string} materiaNombre - Nombre de la materia
   * @returns {Promise<Object>} Preferencias actualizadas
   * @example
   * const actualizado = await preferenciasService.agregarMateriaPrefijo('Cálculo II');
   */
  agregarMateriaPrefijo: async (materiaNombre) => {
    try {
      return await fetchPost(`/preferencias/materias/${encodeURIComponent(materiaNombre)}`);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para agregar materia:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!mockPreferencias.materiasFavoritas.includes(materiaNombre)) {
            mockPreferencias.materiasFavoritas.push(materiaNombre);
          }
          resolve(mockPreferencias);
        }, 300);
      });
    }
  },

  /**
   * Remover una materia de favoritas
   * @param {string} materiaNombre - Nombre de la materia
   * @returns {Promise<Object>} Preferencias actualizadas
   * @example
   * const actualizado = await preferenciasService.removerMateriaPrefijo('Cálculo I');
   */
  removerMateriaPrefijo: async (materiaNombre) => {
    try {
      return await fetchDelete(`/preferencias/materias/${encodeURIComponent(materiaNombre)}`);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para remover materia:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          mockPreferencias.materiasFavoritas = mockPreferencias.materiasFavoritas.filter(
            m => m !== materiaNombre
          );
          resolve(mockPreferencias);
        }, 300);
      });
    }
  },

  /**
   * Obtener lista de materias disponibles
   * @returns {Promise<Array>} Lista de materias
   * @example
   * const materias = await preferenciasService.obtenerMateriasDisponibles();
   */
  obtenerMateriasDisponibles: async () => {
    try {
      return await fetchGet('/preferencias/materias-disponibles');
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para materias disponibles:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockMaterias);
        }, 300);
      });
    }
  },

  /**
   * Obtener opciones de configuración disponibles
   * @returns {Promise<Object>} Opciones disponibles
   * @example
   * const opciones = await preferenciasService.obtenerOpcionesConfiguracion();
   */
  obtenerOpcionesConfiguracion: async () => {
    try {
      return await fetchGet('/preferencias/opciones');
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para opciones:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            horarios: ['mañana', 'tarde', 'noche', 'mixto'],
            frecuenciasActualizacion: ['realtime', 'cada_hora', 'diaria'],
            tiposNotificacion: ['cambiosHorario', 'generacionExamenes', 'modificacionesPeriodo', 'disponibilidadAulas']
          });
        }, 200);
      });
    }
  },

  /**
   * SOLO PARA DESARROLLO: Obtener mock preferencias
   */
  getMockPreferencias: async () => {
    return mockPreferencias;
  },

  /**
   * SOLO PARA DESARROLLO: Obtener mock materias
   */
  getMockMaterias: async () => {
    return mockMaterias;
  }
};

export default preferenciasService;
