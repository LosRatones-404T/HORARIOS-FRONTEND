import { fetchGet, fetchPost, fetchPut } from '../utils/helpers';

/**
 * Servicio de Períodos Académicos
 * - Obtener período activo
 * - Obtener histórico
 * - Crear período
 * - Activar período
 * - Modificar período por emergencia
 * - Finalizar período
 * - Validar período activo
 */

// Mock data para desarrollo
const mockPeriodosStorage = {
  periodoActivo: null,
  historico: [
    {
      id: 1,
      clave: '2025B',
      estado: 'finalizado',
      fInicio: '2025-08-01',
      fFin: '2025-09-15',
      fecha_creacion: '2025-07-15T10:00:00Z',
      fecha_finalizacion: '2025-09-15T18:00:00Z',
      usuario_creador: 'admin@escuela.edu',
      examenes_generados: 15,
      modificaciones: [],
      primer_parcial_inicio: '2025-08-05',
      primer_parcial_fin: '2025-08-10',
      segundo_parcial_inicio: '2025-08-19',
      segundo_parcial_fin: '2025-08-24',
      tercer_parcial_inicio: '2025-09-02',
      tercer_parcial_fin: '2025-09-07',
      ordinario_inicio: '2025-09-09',
      ordinario_fin: '2025-09-14',
      extra1_inicio: '',
      extra1_fin: '',
      extra2_inicio: '',
      extra2_fin: '',
      especial_inicio: '',
      especial_fin: '',
    },
    {
      id: 2,
      clave: '2025C',
      estado: 'finalizado',
      fInicio: '2025-10-01',
      fFin: '2025-10-20',
      fecha_creacion: '2025-09-20T10:00:00Z',
      fecha_finalizacion: '2025-10-20T18:00:00Z',
      usuario_creador: 'admin@escuela.edu',
      examenes_generados: 8,
      modificaciones: [],
      primer_parcial_inicio: '',
      primer_parcial_fin: '',
      segundo_parcial_inicio: '',
      segundo_parcial_fin: '',
      tercer_parcial_inicio: '',
      tercer_parcial_fin: '',
      ordinario_inicio: '',
      ordinario_fin: '',
      extra1_inicio: '2025-10-05',
      extra1_fin: '2025-10-10',
      extra2_inicio: '2025-10-15',
      extra2_fin: '2025-10-19',
      especial_inicio: '',
      especial_fin: '',
    }
  ],
  proximoId: 3
};

// Cargar datos del localStorage si existen
const loadMockData = () => {
  try {
    const stored = localStorage.getItem('mockPeriodos');
    if (stored) {
      Object.assign(mockPeriodosStorage, JSON.parse(stored));
    }
  } catch (error) {
    console.error('Error loading mock data:', error);
  }
};

// Guardar datos en localStorage
const saveMockData = () => {
  try {
    localStorage.setItem('mockPeriodos', JSON.stringify(mockPeriodosStorage));
  } catch (error) {
    console.error('Error saving mock data:', error);
  }
};

// Cargar datos al inicializar
loadMockData();

export const periodosService = {
  /**
   * Obtener el período académico activo actual
   * @returns {Promise<Object|null>} Período activo o null si no hay ninguno
   * @example
   * const periodo = await periodosService.obtenerPeriodoActivo();
   * if (periodo) console.log(periodo.tipo); // 'ordinario', 'extraordinario', etc.
   */
  obtenerPeriodoActivo: async () => {
    try {
      return await fetchGet('/periodos/activo');
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para período activo:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockPeriodosStorage.periodoActivo);
        }, 300);
      });
    }
  },

  /**
   * Obtener histórico de períodos académicos
   * @returns {Promise<Array>} Lista de períodos históricos
   * @example
   * const historico = await periodosService.obtenerHistorico();
   * console.log(historico); // [{id: 1, tipo: 'ordinario', ...}, ...]
   */
  obtenerHistorico: async () => {
    try {
      return await fetchGet('/periodos/historico');
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para histórico:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockPeriodosStorage.historico);
        }, 300);
      });
    }
  },

  /**
   * Crear un nuevo período académico
   * @param {Object} datos - Datos del período a crear
   * @param {string} datos.tipo - Tipo de período (ordinario, extraordinario, regularizacion)
   * @param {string} datos.fecha_inicio - Fecha de inicio (YYYY-MM-DD)
   * @param {string} datos.fecha_fin - Fecha de fin (YYYY-MM-DD)
   * @param {string} datos.descripcion - Descripción del período
   * @returns {Promise<Object>} Período creado
   * @example
   * const nuevo = await periodosService.crearPeriodo({
   *   tipo: 'ordinario',
   *   fecha_inicio: '2026-02-01',
   *   fecha_fin: '2026-03-30',
   *   descripcion: 'Período ordinario'
   * });
   */
  crearPeriodo: async (datos) => {
    try {
      return await fetchPost('/periodos', datos);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para crear período:', error.message);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (mockPeriodosStorage.periodoActivo) {
            reject(new Error('Ya existe un período académico activo o planificado'));
            return;
          }

          if (new Date(datos.fInicio) >= new Date(datos.fFin)) {
            reject(new Error('La fecha de inicio debe ser anterior a la fecha de fin'));
            return;
          }

          const nuevoPeriodo = {
            id: mockPeriodosStorage.proximoId++,
            clave: datos.clave,
            estado: 'planificado',
            fInicio: datos.fInicio,
            fFin: datos.fFin,
            fecha_creacion: new Date().toISOString(),
            fecha_activacion: null,
            fecha_finalizacion: null,
            usuario_creador: 'secretaria@escuela.edu',
            examenes_generados: 0,
            modificaciones: [],
            // Fechas de tipos de examen
            primer_parcial_inicio: datos.primer_parcial_inicio || '',
            primer_parcial_fin: datos.primer_parcial_fin || '',
            segundo_parcial_inicio: datos.segundo_parcial_inicio || '',
            segundo_parcial_fin: datos.segundo_parcial_fin || '',
            tercer_parcial_inicio: datos.tercer_parcial_inicio || '',
            tercer_parcial_fin: datos.tercer_parcial_fin || '',
            ordinario_inicio: datos.ordinario_inicio || '',
            ordinario_fin: datos.ordinario_fin || '',
            extra1_inicio: datos.extra1_inicio || '',
            extra1_fin: datos.extra1_fin || '',
            extra2_inicio: datos.extra2_inicio || '',
            extra2_fin: datos.extra2_fin || '',
            especial_inicio: datos.especial_inicio || '',
            especial_fin: datos.especial_fin || '',
          };

          mockPeriodosStorage.periodoActivo = nuevoPeriodo;
          saveMockData();
          resolve(nuevoPeriodo);
        }, 500);
      });
    }
  },

  /**
   * Activar un período académico
   * @param {number} periodoId - ID del período a activar
   * @returns {Promise<Object>} Período actualizado
   * @example
   * const activado = await periodosService.activarPeriodo(1);
   */
  activarPeriodo: async (periodoId) => {
    try {
      return await fetchPut(`/periodos/${periodoId}/activar`);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para activar período:', error.message);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!mockPeriodosStorage.periodoActivo || mockPeriodosStorage.periodoActivo.id !== periodoId) {
            reject(new Error('Período académico no encontrado'));
            return;
          }

          if (mockPeriodosStorage.periodoActivo.estado !== 'planificado') {
            reject(new Error('El período no está en estado planificado'));
            return;
          }

          mockPeriodosStorage.periodoActivo.estado = 'activo';
          mockPeriodosStorage.periodoActivo.fecha_activacion = new Date().toISOString();
          saveMockData();
          resolve(mockPeriodosStorage.periodoActivo);
        }, 500);
      });
    }
  },

  /**
   * Modificar un período académico por emergencia
   * @param {number} periodoId - ID del período a modificar
   * @param {Object} datos - Datos de la modificación
   * @param {string} datos.motivo - Motivo de la modificación
   * @param {string} datos.tipo_emergencia - Tipo de emergencia
   * @param {string} [datos.nueva_fecha_inicio] - Nueva fecha de inicio (opcional)
   * @param {string} [datos.nueva_fecha_fin] - Nueva fecha de fin (opcional)
   * @returns {Promise<Object>} Período modificado
   * @example
   * const modificado = await periodosService.modificarPeriodo(1, {
   *   motivo: 'Movilización estudiantil...',
   *   tipo_emergencia: 'movilizacion',
   *   nueva_fecha_fin: '2026-03-25'
   * });
   */
  modificarPeriodo: async (periodoId, datos) => {
    try {
      return await fetchPut(`/periodos/${periodoId}/modificar`, datos);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para modificar período:', error.message);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!mockPeriodosStorage.periodoActivo || mockPeriodosStorage.periodoActivo.id !== periodoId) {
            reject(new Error('Período académico no encontrado'));
            return;
          }

          if (mockPeriodosStorage.periodoActivo.estado !== 'activo' && mockPeriodosStorage.periodoActivo.estado !== 'modificado') {
            reject(new Error('El período no está activo'));
            return;
          }

          if (!datos.motivo || datos.motivo.length < 50) {
            reject(new Error('El motivo debe tener al menos 50 caracteres'));
            return;
          }

          const modificacion = {
            id: mockPeriodosStorage.periodoActivo.modificaciones.length + 1,
            fecha: new Date().toISOString(),
            tipo_emergencia: datos.tipo_emergencia,
            motivo: datos.motivo,
            fecha_inicio_anterior: mockPeriodosStorage.periodoActivo.fecha_inicio,
            fecha_fin_anterior: mockPeriodosStorage.periodoActivo.fecha_fin,
            fecha_inicio_nueva: datos.nueva_fecha_inicio || mockPeriodosStorage.periodoActivo.fecha_inicio,
            fecha_fin_nueva: datos.nueva_fecha_fin || mockPeriodosStorage.periodoActivo.fecha_fin,
            usuario: 'secretaria@escuela.edu'
          };

          if (datos.nueva_fecha_inicio) {
            mockPeriodosStorage.periodoActivo.fecha_inicio = datos.nueva_fecha_inicio;
          }
          if (datos.nueva_fecha_fin) {
            mockPeriodosStorage.periodoActivo.fecha_fin = datos.nueva_fecha_fin;
          }

          mockPeriodosStorage.periodoActivo.estado = 'modificado';
          mockPeriodosStorage.periodoActivo.modificaciones.push(modificacion);
          saveMockData();
          resolve(mockPeriodosStorage.periodoActivo);
        }, 500);
      });
    }
  },

  /**
   * Finalizar un período académico
   * @param {number} periodoId - ID del período a finalizar
   * @returns {Promise<Object>} Período finalizado
   * @example
   * const finalizado = await periodosService.finalizarPeriodo(1);
   */
  finalizarPeriodo: async (periodoId) => {
    try {
      return await fetchPut(`/periodos/${periodoId}/finalizar`);
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para finalizar período:', error.message);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!mockPeriodosStorage.periodoActivo || mockPeriodosStorage.periodoActivo.id !== periodoId) {
            reject(new Error('Período académico no encontrado'));
            return;
          }

          mockPeriodosStorage.periodoActivo.estado = 'finalizado';
          mockPeriodosStorage.periodoActivo.fecha_finalizacion = new Date().toISOString();
          mockPeriodosStorage.periodoActivo.examenes_generados = Math.floor(Math.random() * 20) + 5;

          mockPeriodosStorage.historico.push(mockPeriodosStorage.periodoActivo);
          mockPeriodosStorage.periodoActivo = null;
          saveMockData();

          resolve(mockPeriodosStorage.historico[mockPeriodosStorage.historico.length - 1]);
        }, 500);
      });
    }
  },

  /**
   * Validar si hay un período activo
   * @returns {Promise<boolean>} true si hay período activo, false si no
   * @example
   * const hayPeriodo = await periodosService.validarPeriodoActivo();
   */
  validarPeriodoActivo: async () => {
    try {
      const resultado = await fetchGet('/periodos/validar-activo');
      return resultado.activo || false;
    } catch (error) {
      // Si el endpoint no está disponible, usar mock
      console.warn('Usando mock data para validar período:', error.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockPeriodosStorage.periodoActivo !== null && mockPeriodosStorage.periodoActivo.estado === 'activo');
        }, 200);
      });
    }
  },

  /**
   * SOLO PARA DESARROLLO: Resetear datos mock
   */
  resetearMockData: () => {
    mockPeriodosStorage.periodoActivo = null;
    mockPeriodosStorage.historico = [
      {
        id: 1,
        tipo: 'ordinario',
        estado: 'finalizado',
        fecha_inicio: '2025-08-01',
        fecha_fin: '2025-09-15',
        fecha_creacion: '2025-07-15T10:00:00Z',
        fecha_finalizacion: '2025-09-15T18:00:00Z',
        descripcion: 'Período ordinario agosto-septiembre 2025',
        usuario_creador: 'admin@escuela.edu',
        examenes_generados: 15,
        modificaciones: []
      },
      {
        id: 2,
        tipo: 'extraordinario',
        estado: 'finalizado',
        fecha_inicio: '2025-10-01',
        fecha_fin: '2025-10-20',
        fecha_creacion: '2025-09-20T10:00:00Z',
        fecha_finalizacion: '2025-10-20T18:00:00Z',
        descripcion: 'Período extraordinario octubre 2025',
        usuario_creador: 'admin@escuela.edu',
        examenes_generados: 8,
        modificaciones: []
      }
    ];
    mockPeriodosStorage.proximoId = 3;
    saveMockData();
  }
};

export default periodosService;
