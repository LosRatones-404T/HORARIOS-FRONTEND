import { API_BASE_URL } from '../conf/env';

/**
 * Servicio API para la gestión de períodos académicos
 */
export const periodosApi = {
  /**
   * Obtener el período académico activo actual
   * @returns {Promise<Object|null>} Período activo o null si no hay ninguno
   */
  obtenerPeriodoActivo: async () => {
    try {
      // TODO: Implementar llamada real al backend
      const response = await fetch(`${API_BASE_URL}/periodos/activo`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.status === 404) {
        return null; // No hay período activo
      }
      
      if (!response.ok) {
        throw new Error('Error al obtener el período activo');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerPeriodoActivo:', error);
      // Mock data para desarrollo
      return null;
    }
  },

  /**
   * Obtener histórico de períodos académicos
   * @returns {Promise<Array>} Lista de períodos históricos
   */
  obtenerHistorico: async () => {
    try {
      // TODO: Implementar llamada real al backend
      const response = await fetch(`${API_BASE_URL}/periodos/historico`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener el histórico de períodos');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerHistorico:', error);
      // Mock data para desarrollo
      return [];
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
   */
  crearPeriodo: async (datos) => {
    try {
      // TODO: Implementar llamada real al backend
      const response = await fetch(`${API_BASE_URL}/periodos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(datos),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el período');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en crearPeriodo:', error);
      throw error;
    }
  },

  /**
   * Activar un período académico (cambiar estado a ACTIVO)
   * @param {number} periodoId - ID del período a activar
   * @returns {Promise<Object>} Período actualizado
   */
  activarPeriodo: async (periodoId) => {
    try {
      // TODO: Implementar llamada real al backend
      const response = await fetch(`${API_BASE_URL}/periodos/${periodoId}/activar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al activar el período');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en activarPeriodo:', error);
      throw error;
    }
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
    try {
      // TODO: Implementar llamada real al backend
      const response = await fetch(`${API_BASE_URL}/periodos/${periodoId}/modificar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(datos),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al modificar el período');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en modificarPeriodo:', error);
      throw error;
    }
  },

  /**
   * Finalizar un período académico
   * @param {number} periodoId - ID del período a finalizar
   * @returns {Promise<Object>} Período finalizado
   */
  finalizarPeriodo: async (periodoId) => {
    try {
      // TODO: Implementar llamada real al backend
      const response = await fetch(`${API_BASE_URL}/periodos/${periodoId}/finalizar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al finalizar el período');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en finalizarPeriodo:', error);
      throw error;
    }
  },

  /**
   * Validar si hay un período activo disponible
   * @returns {Promise<boolean>} true si hay período activo, false si no
   */
  validarPeriodoActivo: async () => {
    try {
      const periodo = await periodosApi.obtenerPeriodoActivo();
      return periodo !== null && periodo.estado === 'activo';
    } catch (error) {
      console.error('Error en validarPeriodoActivo:', error);
      return false;
    }
  },
};

/**
 * Servicio API para otras funcionalidades existentes
 */
export const api = {
  // Aquí irán otros servicios API existentes
};

export default api;
