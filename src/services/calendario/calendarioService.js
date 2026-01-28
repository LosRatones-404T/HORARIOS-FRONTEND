import { fetchGet, fetchPost, fetchPut } from '../utils/helpers';

/**
 * Servicio de Calendario
 * - Obtener horario semanal
 * - Obtener horarios de un profesor
 * - Obtener horarios de una materia
 * - Actualizar horario
 */

// Mock data para desarrollo
const mockHorarios = [
  {
    id: 1,
    materia: 'Cálculo I',
    profesor: 'Dr. Juan García',
    dia: 'Lunes',
    hora_inicio: '08:00',
    hora_fin: '09:30',
    aula: '101',
    carrera: 'Ingeniería en Sistemas',
    semestre: '1'
  },
  {
    id: 2,
    materia: 'Álgebra Lineal',
    profesor: 'Dra. María López',
    dia: 'Martes',
    hora_inicio: '10:00',
    hora_fin: '11:30',
    aula: '102',
    carrera: 'Ingeniería en Sistemas',
    semestre: '1'
  },
  {
    id: 3,
    materia: 'Programación I',
    profesor: 'Ing. Carlos Rodríguez',
    dia: 'Miércoles',
    hora_inicio: '14:00',
    hora_fin: '15:30',
    aula: 'Lab 1',
    carrera: 'Ingeniería en Sistemas',
    semestre: '1'
  },
  {
    id: 4,
    materia: 'Física General',
    profesor: 'Dr. Pedro Sánchez',
    dia: 'Jueves',
    hora_inicio: '09:00',
    hora_fin: '10:30',
    aula: '201',
    carrera: 'Ingeniería en Sistemas',
    semestre: '1'
  },
  {
    id: 5,
    materia: 'Cálculo I',
    profesor: 'Dr. Juan García',
    dia: 'Viernes',
    hora_inicio: '08:00',
    hora_fin: '09:30',
    aula: '101',
    carrera: 'Ingeniería en Sistemas',
    semestre: '1'
  }
];

export const calendarioService = {
  /**
   * Obtener horario semanal
   * @param {Object} filters - Filtros opcionales
   * @param {string} [filters.carrera] - Carrera
   * @param {string} [filters.semestre] - Semestre
   * @param {string} [filters.profesor] - Nombre del profesor
   * @returns {Promise<Array>} Lista de horarios
   * @example
   * const horarios = await calendarioService.obtenerHorarioSemanal({
   *   carrera: 'Ingeniería en Sistemas',
   *   semestre: '1'
   * });
   */
  obtenerHorarioSemanal: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `/calendario/horario${queryParams ? `?${queryParams}` : ''}`;
      return await fetchGet(endpoint);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para horario semanal:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          let resultado = [...mockHorarios];
          if (filters.carrera) {
            resultado = resultado.filter(h => h.carrera === filters.carrera);
          }
          if (filters.semestre) {
            resultado = resultado.filter(h => h.semestre === filters.semestre);
          }
          if (filters.profesor) {
            resultado = resultado.filter(h => h.profesor.toLowerCase().includes(filters.profesor.toLowerCase()));
          }
          resolve(resultado);
        }, 300);
      });
    }
  },

  /**
   * Obtener horarios de un profesor
   * @param {string} profesorId - ID o nombre del profesor
   * @returns {Promise<Array>} Lista de horarios del profesor
   * @example
   * const horarios = await calendarioService.obtenerHorariosProfesor('Dr. Juan García');
   */
  obtenerHorariosProfesor: async (profesorId) => {
    try {
      return await fetchGet(`/calendario/profesor/${encodeURIComponent(profesorId)}`);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para horarios del profesor:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          const resultado = mockHorarios.filter(h => h.profesor === profesorId);
          resolve(resultado);
        }, 300);
      });
    }
  },

  /**
   * Obtener horarios de una materia
   * @param {string} materiaId - ID o nombre de la materia
   * @returns {Promise<Array>} Lista de horarios de la materia
   * @example
   * const horarios = await calendarioService.obtenerHorarioMateria('Cálculo I');
   */
  obtenerHorarioMateria: async (materiaId) => {
    try {
      return await fetchGet(`/calendario/materia/${encodeURIComponent(materiaId)}`);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para horarios de materia:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          const resultado = mockHorarios.filter(h => h.materia === materiaId);
          resolve(resultado);
        }, 300);
      });
    }
  },

  /**
   * Actualizar un horario
   * @param {number} horarioId - ID del horario
   * @param {Object} datos - Datos a actualizar
   * @returns {Promise<Object>} Horario actualizado
   * @example
   * const actualizado = await calendarioService.actualizarHorario(1, {
   *   hora_inicio: '09:00',
   *   aula: '105'
   * });
   */
  actualizarHorario: async (horarioId, datos) => {
    try {
      return await fetchPut(`/calendario/horario/${horarioId}`, datos);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para actualizar horario:', error.message);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const horario = mockHorarios.find(h => h.id === horarioId);
          if (!horario) {
            reject(new Error('Horario no encontrado'));
            return;
          }
          Object.assign(horario, datos);
          resolve(horario);
        }, 300);
      });
    }
  },

  /**
   * SOLO PARA DESARROLLO: Obtener mock horarios
   */
  getMockHorarios: async () => {
    return mockHorarios;
  }
};

export default calendarioService;
