// Configuración de entorno
// En producción, cambiar a la URL real del backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Modo de desarrollo con mock data
// Cambiar a false para usar el backend real
const USE_MOCK_DATA = false;

export { API_BASE_URL, USE_MOCK_DATA };

