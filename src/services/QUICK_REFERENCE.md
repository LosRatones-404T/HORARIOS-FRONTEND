# Guía Rápida de Servicios Modularizados

## 📦 Importar Servicios

```javascript
// Opción 1: Desde el índice (recomendado)
import { authService, usersService, periodosService } from '@/services';

// Opción 2: Con alias cortos
import { authApi, usersApi, periodosApi } from '@/services';

// Opción 3: Importar todo
import * as services from '@/services';
```

## 🔐 Auth Service

```javascript
// Login
const { access_token } = await authService.login('user', 'pass');

// Obtener usuario actual
const user = await authService.me();

// Registrar usuario (solo admin)
const newUser = await authService.register({
  username: 'juan',
  email: 'juan@example.com',
  password: 'secure123',
  role: 'JEFE_CARRERA'
});
```

## 👥 Users Service

```javascript
// Listar usuarios
const users = await usersService.getAllUsers();

// Obtener un usuario
const user = await usersService.getUser('username');

// Cambiar contraseña
await usersService.updatePassword('username', 'newpass');

// Cambiar rol
await usersService.changeRole('username', 'SECRETARIA');

// Activar/desactivar
await usersService.toggleActive('username');

// Cambiar email
await usersService.changeEmail('username', 'new@example.com');

// Eliminar usuario
await usersService.deleteUser('username');
```

## 📅 Periodos Service

```javascript
// Obtener período activo
const periodo = await periodosService.obtenerPeriodoActivo();

// Obtener histórico
const historico = await periodosService.obtenerHistorico();

// Crear período
const nuevo = await periodosService.crearPeriodo({
  tipo: 'ordinario',
  fecha_inicio: '2026-02-01',
  fecha_fin: '2026-03-30',
  descripcion: 'Período ordinario'
});

// Activar periodo
await periodosService.activarPeriodo(periodoId);

// Modificar por emergencia
await periodosService.modificarPeriodo(periodoId, {
  motivo: 'Descripción detallada...',
  tipo_emergencia: 'movilizacion',
  nueva_fecha_fin: '2026-03-25'
});

// Finalizar
await periodosService.finalizarPeriodo(periodoId);

// Validar si hay período activo
const hay = await periodosService.validarPeriodoActivo();
```

## 📋 Calendario Service

```javascript
// Obtener horarios
const horarios = await calendarioService.obtenerHorarioSemanal({
  carrera: 'Ingeniería en Sistemas',
  semestre: '1'
});

// Horarios de un profesor
const horariosProf = await calendarioService.obtenerHorariosProfesor('Dr. Juan');

// Horarios de una materia
const horariosMat = await calendarioService.obtenerHorarioMateria('Cálculo I');

// Actualizar horario
await calendarioService.actualizarHorario(id, {
  hora_inicio: '09:00',
  aula: '105'
});
```

## 📝 Examenes Service

```javascript
// Generar examen
const examen = await examenesService.generarExamen({
  materia: 'Cálculo I',
  profesor: 'Dr. Juan García',
  fecha: '2026-02-15',
  hora: '14:00',
  duracion: 120,
  aula: '101',
  cantidadPreguntas: 10,
  tipoPreguntas: 'mixta'
});

// Obtener exámenes
const examenes = await examenesService.obtenerExamenes({
  materia: 'Cálculo I',
  estado: 'generado'
});

// Obtener un examen
const exam = await examenesService.obtenerExamen(examenId);

// Actualizar examen
await examenesService.actualizarExamen(examenId, {
  estado: 'aplicado'
});

// Obtener configuración
const config = await examenesService.obtenerConfiguracion();
```

## ⚙️ Preferencias Service

```javascript
// Obtener preferencias actuales
const prefs = await preferenciasService.obtenerPreferencias();

// Establecer preferencias
await preferenciasService.establecerPreferencias({
  materiasFavoritas: ['Cálculo I', 'Prog I'],
  horarioPrefijo: 'tarde',
  preferenciasNotificaciones: {
    cambiosHorario: true,
    generacionExamenes: false
  }
});

// Actualizar parcial
await preferenciasService.actualizarPreferencias({
  horarioPrefijo: 'noche'
});

// Agregar materia a favoritas
await preferenciasService.agregarMateriaPrefijo('Cálculo II');

// Remover materia
await preferenciasService.removerMateriaPrefijo('Álgebra');

// Materias disponibles
const materias = await preferenciasService.obtenerMateriasDisponibles();

// Opciones de configuración
const opciones = await preferenciasService.obtenerOpcionesConfiguracion();
```

## 🛠️ Utilidades

```javascript
import { getAuthToken, fetchGet, fetchPost, fetchPut, fetchDelete } from '@/services';

// Obtener token
const token = getAuthToken();

// Peticiones personalizadas
const data = await fetchGet('/endpoint');
const result = await fetchPost('/endpoint', { body });
const updated = await fetchPut('/endpoint', { body });
const deleted = await fetchDelete('/endpoint');
```

## ⚡ Patrón en Componentes React

```javascript
import { useState, useEffect } from 'react';
import { periodosService } from '@/services';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const resultado = await periodosService.obtenerPeriodoActivo();
        setData(resultado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{data?.tipo}</div>;
}
```

## 📌 Características Principales

✅ **Modular**: Cada servicio es independiente  
✅ **Mock Data**: Funciona sin backend (desarrollo)  
✅ **TypeScript-Ready**: Documenta tipos con JSDoc  
✅ **Errores Claros**: Mensajes descriptivos  
✅ **Compatibilidad**: Funciona con código antiguo  
✅ **Extensible**: Fácil agregar nuevos servicios  

## 🔄 Fallback a Mock Data

Si el backend no está disponible, automáticamente:
- Muestra warning en console
- Retorna datos simulados
- Mantiene consistencia en memoria
- Simula latencia realista

## 📚 Para Más Información

Ver `/src/services/README.md` para documentación completa.
