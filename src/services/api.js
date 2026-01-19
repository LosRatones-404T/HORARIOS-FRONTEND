import { API_BASE_URL } from '../conf/env';

/**
 * Obtener el token de autenticación del localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

/**
 * Servicio de autenticación
 */
export const authApi = {
  /**
   * Iniciar sesión
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object>} Token y tipo de token
   */
  login: async (username, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al iniciar sesión');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  /**
   * Obtener información del usuario autenticado
   * @returns {Promise<Object>} Información del usuario
   */
  me: async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expirado o inválido
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          throw new Error('Sesión expirada');
        }
        throw new Error('Error al obtener información del usuario');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en me:', error);
      throw error;
    }
  },

  /**
   * Registrar un nuevo usuario (solo admin)
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>} Usuario creado
   */
  register: async (userData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al registrar usuario');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en register:', error);
      throw error;
    }
  },
};

/**
 * Mock data para desarrollo y demostración
 */
const mockPeriodosStorage = {
  periodoActivo: null,
  historico: [
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

/**
 * Servicio API para la gestión de períodos académicos
 * Implementado con MOCK DATA para desarrollo
 */
export const periodosApi = {
  /**
   * Obtener el período académico activo actual
   * @returns {Promise<Object|null>} Período activo o null si no hay ninguno
   */
  obtenerPeriodoActivo: async () => {
    return new Promise((resolve) => {
      // Simular latencia de red
      setTimeout(() => {
        resolve(mockPeriodosStorage.periodoActivo);
      }, 300);
    });
  },

  /**
   * Obtener histórico de períodos académicos
   * @returns {Promise<Array>} Lista de períodos históricos
   */
  obtenerHistorico: async () => {
    return new Promise((resolve) => {
      // Simular latencia de red
      setTimeout(() => {
        resolve(mockPeriodosStorage.historico);
      }, 300);
    });
  },

  /**
   * Crear un nuevo período académico
   * @param {Object} datos - Datos del período a crear
   * @param {string} datos.tipo - Tipo de período (ordinario, extraordinario, regularizacion)
   * @param {string} datos.fecha_inicio - Fecha de inicio (YYYY-MM-DD)
   * @param {string} datos.fecha_fin - Fecha de fin (YYYY-MM-DD)
   * @param {string} datos.descripcion - Descripción del período
   * @returns {Promise<Object>} Período creado
   */
  crearPeriodo: async (datos) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validar que no haya otro período activo
        if (mockPeriodosStorage.periodoActivo) {
          reject(new Error('Ya existe un período académico activo o planificado'));
          return;
        }

        // Validar fechas
        if (new Date(datos.fecha_inicio) >= new Date(datos.fecha_fin)) {
          reject(new Error('La fecha de inicio debe ser anterior a la fecha de fin'));
          return;
        }

        const nuevoPeriodo = {
          id: mockPeriodosStorage.proximoId++,
          tipo: datos.tipo,
          estado: 'planificado',
          fecha_inicio: datos.fecha_inicio,
          fecha_fin: datos.fecha_fin,
          fecha_creacion: new Date().toISOString(),
          fecha_activacion: null,
          fecha_finalizacion: null,
          descripcion: datos.descripcion,
          usuario_creador: 'secretaria@escuela.edu',
          examenes_generados: 0,
          modificaciones: []
        };

        mockPeriodosStorage.periodoActivo = nuevoPeriodo;
        saveMockData();
        resolve(nuevoPeriodo);
      }, 500);
    });
  },

  /**
   * Activar un período académico (cambiar estado a ACTIVO)
   * @param {number} periodoId - ID del período a activar
   * @returns {Promise<Object>} Período actualizado
   */
  activarPeriodo: async (periodoId) => {
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
  },

  /**
   * Modificar un período académico por situación de emergencia
   * @param {number} periodoId - ID del período a modificar
   * @param {Object} datos - Datos de la modificación
   * @param {string} datos.motivo - Motivo de la modificación
   * @param {string} datos.tipo_emergencia - Tipo de emergencia
   * @param {string} [datos.nueva_fecha_inicio] - Nueva fecha de inicio (opcional)
   * @param {string} [datos.nueva_fecha_fin] - Nueva fecha de fin (opcional)
   * @returns {Promise<Object>} Período modificado
   */
  modificarPeriodo: async (periodoId, datos) => {
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

        // Registrar la modificación
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

        // Actualizar fechas si se proporcionaron
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
  },

  /**
   * Finalizar un período académico
   * @param {number} periodoId - ID del período a finalizar
   * @returns {Promise<Object>} Período finalizado
   */
  finalizarPeriodo: async (periodoId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!mockPeriodosStorage.periodoActivo || mockPeriodosStorage.periodoActivo.id !== periodoId) {
          reject(new Error('Período académico no encontrado'));
          return;
        }

        // Mover el período al histórico
        mockPeriodosStorage.periodoActivo.estado = 'finalizado';
        mockPeriodosStorage.periodoActivo.fecha_finalizacion = new Date().toISOString();
        mockPeriodosStorage.periodoActivo.examenes_generados = Math.floor(Math.random() * 20) + 5;

        mockPeriodosStorage.historico.push(mockPeriodosStorage.periodoActivo);
        mockPeriodosStorage.periodoActivo = null;
        saveMockData();

        resolve(mockPeriodosStorage.historico[mockPeriodosStorage.historico.length - 1]);
      }, 500);
    });
  },

  /**
   * Validar si hay un período activo disponible
   * @returns {Promise<boolean>} true si hay período activo, false si no
   */
  validarPeriodoActivo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPeriodosStorage.periodoActivo !== null && mockPeriodosStorage.periodoActivo.estado === 'activo');
      }, 200);
    });
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

/**
 * Servicio API para otras funcionalidades existentes
 */
export const api = {
  // Aquí irán otros servicios API existentes
};

export default api;

