import { fetchGet, fetchPost, fetchPut } from '../utils/helpers';

/**
 * Servicio de Generación de Exámenes
 * - Generar examen automático
 * - Obtener exámenes generados
 * - Actualizar examen
 * - Obtener configuración de generación
 */

// Mock data para desarrollo
const mockExamenes = [
  {
    id: 1,
    materia: 'Cálculo I',
    profesor: 'Dr. Juan García',
    fecha: '2026-02-15',
    hora: '14:00',
    duracion: 120,
    aula: '101',
    cantidadPreguntas: 10,
    tipoPreguntas: 'mixta',
    estado: 'generado',
    fecha_generacion: '2026-02-01T10:30:00Z'
  },
  {
    id: 2,
    materia: 'Programación I',
    profesor: 'Ing. Carlos Rodríguez',
    fecha: '2026-02-20',
    hora: '09:00',
    duracion: 150,
    aula: 'Lab 1',
    cantidadPreguntas: 15,
    tipoPreguntas: 'práctica',
    estado: 'pendiente',
    fecha_generacion: '2026-02-05T14:20:00Z'
  }
];

const mockConfiguracion = {
  tiposPreguntas: ['opción múltiple', 'desarrollo', 'verdadero/falso', 'mixta', 'práctica'],
  dificultades: ['fácil', 'media', 'difícil'],
  tiempos: [60, 90, 120, 150, 180],
  permitirBancoPreguntas: true,
  permitirPersonalizadas: true
};

export const examenesService = {
  /**
   * Generar un examen automáticamente
   * @param {Object} datos - Datos para la generación
   * @param {string} datos.materia - Nombre de la materia
   * @param {string} datos.profesor - Nombre del profesor
   * @param {string} datos.fecha - Fecha del examen (YYYY-MM-DD)
   * @param {string} datos.hora - Hora del examen (HH:MM)
   * @param {number} datos.duracion - Duración en minutos
   * @param {string} datos.aula - Aula o lugar del examen
   * @param {number} datos.cantidadPreguntas - Cantidad de preguntas
   * @param {string} datos.tipoPreguntas - Tipo de preguntas
   * @param {string} [datos.dificultad] - Nivel de dificultad
   * @returns {Promise<Object>} Examen generado
   * @example
   * const examen = await examenesService.generarExamen({
   *   materia: 'Cálculo I',
   *   profesor: 'Dr. Juan García',
   *   fecha: '2026-02-15',
   *   hora: '14:00',
   *   duracion: 120,
   *   aula: '101',
   *   cantidadPreguntas: 10,
   *   tipoPreguntas: 'mixta',
   *   dificultad: 'media'
   * });
   */
  generarExamen: async (datos) => {
    try {
      return await fetchPost('/examenes/generar', datos);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para generar examen:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          const nuevoExamen = {
            id: mockExamenes.length + 1,
            ...datos,
            estado: 'generado',
            fecha_generacion: new Date().toISOString()
          };
          mockExamenes.push(nuevoExamen);
          resolve(nuevoExamen);
        }, 500);
      });
    }
  },

  /**
   * Obtener exámenes generados
   * @param {Object} filters - Filtros opcionales
   * @param {string} [filters.materia] - Nombre de la materia
   * @param {string} [filters.profesor] - Nombre del profesor
   * @param {string} [filters.estado] - Estado del examen (generado, pendiente, aplicado)
   * @returns {Promise<Array>} Lista de exámenes
   * @example
   * const examenes = await examenesService.obtenerExamenes({
   *   materia: 'Cálculo I',
   *   estado: 'generado'
   * });
   */
  obtenerExamenes: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `/examenes${queryParams ? `?${queryParams}` : ''}`;
      return await fetchGet(endpoint);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para obtener exámenes:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          let resultado = [...mockExamenes];
          if (filters.materia) {
            resultado = resultado.filter(e => e.materia === filters.materia);
          }
          if (filters.profesor) {
            resultado = resultado.filter(e => e.profesor === filters.profesor);
          }
          if (filters.estado) {
            resultado = resultado.filter(e => e.estado === filters.estado);
          }
          resolve(resultado);
        }, 300);
      });
    }
  },

  /**
   * Obtener un examen específico
   * @param {number} examenId - ID del examen
   * @returns {Promise<Object>} Datos del examen
   * @example
   * const examen = await examenesService.obtenerExamen(1);
   */
  obtenerExamen: async (examenId) => {
    try {
      return await fetchGet(`/examenes/${examenId}`);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para obtener examen:', error.message);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const examen = mockExamenes.find(e => e.id === examenId);
          if (!examen) {
            reject(new Error('Examen no encontrado'));
            return;
          }
          resolve(examen);
        }, 300);
      });
    }
  },

  /**
   * Actualizar un examen
   * @param {number} examenId - ID del examen
   * @param {Object} datos - Datos a actualizar
   * @returns {Promise<Object>} Examen actualizado
   * @example
   * const actualizado = await examenesService.actualizarExamen(1, {
   *   estado: 'aplicado',
   *   fecha: '2026-02-16'
   * });
   */
  actualizarExamen: async (examenId, datos) => {
    try {
      return await fetchPut(`/examenes/${examenId}`, datos);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para actualizar examen:', error.message);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const examen = mockExamenes.find(e => e.id === examenId);
          if (!examen) {
            reject(new Error('Examen no encontrado'));
            return;
          }
          Object.assign(examen, datos);
          resolve(examen);
        }, 300);
      });
    }
  },

  /**
   * Obtener configuración de generación
   * @returns {Promise<Object>} Configuración disponible
   * @example
   * const config = await examenesService.obtenerConfiguracion();
   * console.log(config.tiposPreguntas); // ['opción múltiple', 'desarrollo', ...]
   */
  obtenerConfiguracion: async () => {
    try {
      return await fetchGet('/examenes/configuracion');
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para configuración:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockConfiguracion);
        }, 200);
      });
    }
  },

  /**
   * SOLO PARA DESARROLLO: Obtener mock exámenes
   */
  getMockExamenes: async () => {
    return mockExamenes;
  }
};

export default examenesService;
