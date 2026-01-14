// Configuración de entorno
// En producción, cambiar a la URL real del backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Modo de desarrollo con mock data
const USE_MOCK_DATA = true;

export { API_BASE_URL, USE_MOCK_DATA };

