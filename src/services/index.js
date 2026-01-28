/**
 * Índice centralizado de todos los servicios
 * 
 * Este archivo importa y exporta todos los servicios de la aplicación
 * permitiendo un acceso fácil y organizado desde cualquier componente
 * 
 * Estructura de servicios:
 * ├── auth/        - Autenticación y login
 * ├── users/       - Gestión de usuarios
 * ├── periodos/    - Períodos académicos
 * ├── calendario/  - Horarios y calendario
 * ├── examenes/    - Generación de exámenes
 * ├── preferencias/- Preferencias de usuarios
 * └── utils/       - Utilidades y helpers
 */

// Servicios principales
export { authService, default as authApi } from './auth/authService';
export { usersService, default as usersApi } from './users/usersService';
export { periodosService, default as periodosApi } from './periodos/periodosService';
export { calendarioService, default as calendarioApi } from './calendario/calendarioService';
export { examenesService, default as examenesApi } from './examenes/examenesService';
export { preferenciasService, default as preferenciasApi } from './preferencias/preferenciasService';

// Utilidades
export {
  getAuthToken,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
  fetchLogin,
  simulateNetworkDelay
} from './utils/helpers';

/**
 * Importar solo lo que necesitas:
 * 
 * // Opción 1: Importar servicios individuales
 * import { authService, usersService } from './services';
 * 
 * // Opción 2: Importar alias de nombres cortos
 * import { authApi, usersApi } from './services';
 * 
 * // Opción 3: Usar en destructuring
 * const { login, register } = authService;
 * 
 * // Opción 4: Importar utilidades
 * import { getAuthToken, fetchGet } from './services';
 */
