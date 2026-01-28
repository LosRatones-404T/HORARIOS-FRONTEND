# Servicios Modularizados - Documentación

## Descripción General

Los servicios de la aplicación han sido modularizados en seis módulos independientes, cada uno responsable de una funcionalidad específica. Cada módulo incluye:

- **Funciones principales**: Conectadas a endpoints del backend
- **Fallback con Mock Data**: Si el backend no está disponible, usa datos simulados
- **Documentación JSDoc**: Incluye ejemplos de uso en cada función
- **Manejo de errores**: Gestión robusta de errores con logs descriptivos

## Estructura de Carpetas

```
src/services/
├── auth/
│   └── authService.js          # Login, registro, autenticación
├── users/
│   └── usersService.js         # Gestión de usuarios
├── periodos/
│   └── periodosService.js      # Períodos académicos
├── calendario/
│   └── calendarioService.js    # Horarios y calendario
├── examenes/
│   └── examenesService.js      # Generación de exámenes
├── preferencias/
│   └── preferenciasService.js  # Preferencias de usuarios
├── utils/
│   └── helpers.js              # Funciones auxiliares
└── index.js                    # Índice centralizado
```

## Módulos

### 1. **Auth Service** (`auth/authService.js`)

Maneja autenticación y autorización.

#### Métodos disponibles:

```javascript
import { authService } from '@/services';

// Login
const response = await authService.login('username', 'password');
// Retorna: { access_token, token_type, ... }

// Registrar usuario (solo admin)
const newUser = await authService.register({
  username: 'juan.garcia',
  email: 'juan@example.com',
  password: 'securePassword123',
  role: 'JEFE_CARRERA'
});

// Obtener información del usuario autenticado
const user = await authService.me();
// Retorna: { id, username, email, role, is_active, ... }
```

**Mock data:** Disponible automáticamente si el backend no responde

---

### 2. **Users Service** (`users/usersService.js`)

Gestión completa de usuarios del sistema.

#### Métodos disponibles:

```javascript
import { usersService } from '@/services';

// Obtener todos los usuarios
const users = await usersService.getAllUsers();

// Obtener un usuario específico
const user = await usersService.getUser('username');

// Actualizar contraseña
await usersService.updatePassword('username', 'newPassword123');

// Cambiar rol del usuario
await usersService.changeRole('username', 'SECRETARIA');

// Activar/desactivar usuario
await usersService.toggleActive('username');

// Cambiar email
await usersService.changeEmail('username', 'newemail@example.com');

// Eliminar usuario
await usersService.deleteUser('username');
```

**Mock data:** Incluye 3 usuarios de ejemplo

---

### 3. **Periodos Service** (`periodos/periodosService.js`)

Gestión de períodos académicos (ordinario, extraordinario, etc).

#### Métodos disponibles:

```javascript
import { periodosService } from '@/services';

// Obtener período activo
const periodo = await periodosService.obtenerPeriodoActivo();

// Obtener histórico
const historico = await periodosService.obtenerHistorico();

// Crear nuevo período
const nuevo = await periodosService.crearPeriodo({
  tipo: 'ordinario',
  fecha_inicio: '2026-02-01',
  fecha_fin: '2026-03-30',
  descripcion: 'Período ordinario'
});

// Activar período
await periodosService.activarPeriodo(periodoId);

// Modificar por emergencia
await periodosService.modificarPeriodo(periodoId, {
  motivo: 'Movilización estudiantil que requiere...',
  tipo_emergencia: 'movilizacion',
  nueva_fecha_fin: '2026-03-25'
});

// Finalizar período
await periodosService.finalizarPeriodo(periodoId);

// Validar si hay período activo
const hayPeriodo = await periodosService.validarPeriodoActivo();
```

**Mock data:** 2 períodos históricos + gestión de localStorage

**Reseteo de datos:** `periodosService.resetearMockData()`

---

### 4. **Calendario Service** (`calendario/calendarioService.js`)

Gestión de horarios y calendario.

#### Métodos disponibles:

```javascript
import { calendarioService } from '@/services';

// Obtener horario semanal con filtros
const horarios = await calendarioService.obtenerHorarioSemanal({
  carrera: 'Ingeniería en Sistemas',
  semestre: '1',
  profesor: 'Dr. Juan García' // opcional
});

// Horarios de un profesor específico
const horariosProf = await calendarioService.obtenerHorariosProfesor('Dr. Juan García');

// Horarios de una materia
const horariosMat = await calendarioService.obtenerHorarioMateria('Cálculo I');

// Actualizar un horario
await calendarioService.actualizarHorario(horarioId, {
  hora_inicio: '09:00',
  aula: '105'
});
```

**Mock data:** 5 horarios de ejemplo

---

### 5. **Examenes Service** (`examenes/examenesService.js`)

Generación y gestión de exámenes.

#### Métodos disponibles:

```javascript
import { examenesService } from '@/services';

// Generar examen automáticamente
const examen = await examenesService.generarExamen({
  materia: 'Cálculo I',
  profesor: 'Dr. Juan García',
  fecha: '2026-02-15',
  hora: '14:00',
  duracion: 120, // minutos
  aula: '101',
  cantidadPreguntas: 10,
  tipoPreguntas: 'mixta',
  dificultad: 'media'
});

// Obtener exámenes con filtros
const examenes = await examenesService.obtenerExamenes({
  materia: 'Cálculo I',
  estado: 'generado',
  profesor: 'Dr. Juan García'
});

// Obtener examen específico
const examen = await examenesService.obtenerExamen(examenId);

// Actualizar examen
await examenesService.actualizarExamen(examenId, {
  estado: 'aplicado',
  fecha: '2026-02-16'
});

// Obtener configuración disponible
const config = await examenesService.obtenerConfiguracion();
// Retorna: { tiposPreguntas, dificultades, tiempos, ... }
```

**Mock data:** 2 exámenes de ejemplo + configuración predeterminada

---

### 6. **Preferencias Service** (`preferencias/preferenciasService.js`)

Preferencias y configuración personal del usuario.

#### Métodos disponibles:

```javascript
import { preferenciasService } from '@/services';

// Obtener preferencias del usuario autenticado
const prefs = await preferenciasService.obtenerPreferencias();

// Obtener preferencias de otro usuario (solo admin)
const prefsOtro = await preferenciasService.obtenerPreferenciasPorUsuario('username');

// Establecer preferencias completas
await preferenciasService.establecerPreferencias({
  materiasFavoritas: ['Cálculo I', 'Programación I'],
  horarioPrefijo: 'tarde',
  preferenciasNotificaciones: {
    cambiosHorario: true,
    generacionExamenes: false,
    modificacionesPeriodo: true
  },
  porcentajeAvanceVisual: true,
  frecuenciaActualizacion: 'realtime'
});

// Actualizar preferencias parciales
await preferenciasService.actualizarPreferencias({
  horarioPrefijo: 'noche'
});

// Agregar materia a favoritas
await preferenciasService.agregarMateriaPrefijo('Cálculo II');

// Remover materia de favoritas
await preferenciasService.removerMateriaPrefijo('Cálculo I');

// Obtener materias disponibles
const materias = await preferenciasService.obtenerMateriasDisponibles();

// Obtener opciones de configuración
const opciones = await preferenciasService.obtenerOpcionesConfiguracion();
// Retorna: { horarios, frecuenciasActualizacion, tiposNotificacion }
```

**Mock data:** Preferencias de ejemplo + 5 materias

---

## Utilidades (`utils/helpers.js`)

Funciones auxiliares para peticiones HTTP autenticadas.

```javascript
import {
  getAuthToken,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
  fetchLogin,
  simulateNetworkDelay
} from '@/services';

// Obtener token de autenticación
const token = getAuthToken();

// Peticiones autenticadas
const data = await fetchGet('/endpoint');
const result = await fetchPost('/endpoint', { data });
const updated = await fetchPut('/endpoint', { data });
const deleted = await fetchDelete('/endpoint');

// Simular latencia (desarrollo)
await simulateNetworkDelay(500);
```

---

## Patrones de Uso

### Importar en un componente:

```javascript
// Opción 1: Importar servicios individuales
import { authService, usersService } from '@/services';

// Opción 2: Usar alias cortos
import { authApi, usersApi } from '@/services';

// Opción 3: Importar funciones específicas
const { login, register } = authService;
const { getAllUsers, deleteUser } = usersService;
```

### Uso en componentes React:

```javascript
import { useEffect, useState } from 'react';
import { periodosService } from '@/services';

export default function MiComponente() {
  const [periodo, setPeriodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPeriodo = async () => {
      try {
        const data = await periodosService.obtenerPeriodoActivo();
        setPeriodo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarPeriodo();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{periodo?.tipo}</div>;
}
```

---

## Manejo de Errores

Todos los servicios incluyen manejo robusto de errores:

```javascript
try {
  const users = await usersService.getAllUsers();
} catch (error) {
  console.error('Error al obtener usuarios:', error.message);
  // El servicio mostrará en console qué tipo de error ocurrió
  // y fallará gracefully a mock data si es disponible
}
```

---

## Mock Data - Desarrollo

Cuando el backend no está disponible, cada servicio automáticamente:

1. **Detecta el error** y muestra un warning en console
2. **Simula la petición** con latencia realista (200-500ms)
3. **Retorna datos mock** válidos para desarrollo
4. **Mantiene la consistencia** (cambios se reflejan en memoria)

### Desactivar completamente el mock:

Edita el archivo del servicio y comenta las secciones de fallback `catch`.

### Usar solo mock:

Comenta las líneas que hacen `fetchGet`, `fetchPost`, etc.

---

## Migración desde el viejo `api.js`

Si tienes código que usa el viejo archivo:

### Antes (api.js monolítico):
```javascript
import { authApi, usersApi, periodosApi } from '@/services/api';
```

### Ahora (modularizado):
```javascript
import { authService, usersService, periodosService } from '@/services';
// O usa los alias cortos
import { authApi, usersApi, periodosApi } from '@/services';
```

**Los nombres de funciones son idénticos**, así que tu código debería funcionar sin cambios.

---

## Próximos Pasos

1. **Reemplazar imports** en componentes existentes
2. **Agregar nuevos servicios** siguiendo el patrón modular
3. **Actualizar tests** para cada módulo
4. **Documentar endpoints** a medida que se implementan en el backend
5. **Ajustar mock data** según las necesidades reales

---

## Soporte

Para preguntas o problemas con los servicios, revisa:
- Comentarios JSDoc en cada función
- Ejemplos en las docstrings
- Estructura de datos en mock data
- Logs de error en la consola
