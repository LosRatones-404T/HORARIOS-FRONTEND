# 📝 Ejemplos Prácticos de Uso

Ejemplos reales de cómo usar los servicios modularizados en componentes.

## 1. Login Component (Auth Service)

```javascript
import { useState } from 'react';
import { authService } from '@/services';

export default function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(username, password);
      localStorage.setItem('auth_token', response.access_token);
      
      // Redirigir a dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p className="error">{error}</p>}
      <input 
        type="text" 
        value={username} 
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}
```

## 2. Users List Component (Users Service)

```javascript
import { useState, useEffect } from 'react';
import { usersService } from '@/services';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(`Error cargando usuarios: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (username) => {
    if (!confirm(`¿Eliminar usuario ${username}?`)) return;

    try {
      await usersService.deleteUser(username);
      setUsers(users.filter(u => u.username !== username));
    } catch (err) {
      setError(`Error eliminando usuario: ${err.message}`);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Usuarios del Sistema</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.is_active ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.username)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## 3. Periodos Académicos (Periodos Service)

```javascript
import { useState, useEffect } from 'react';
import { periodosService } from '@/services';

export default function PeriodosGestion() {
  const [periodoActivo, setPeriodoActivo] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPeriodos();
  }, []);

  const loadPeriodos = async () => {
    try {
      const [activo, hist] = await Promise.all([
        periodosService.obtenerPeriodoActivo(),
        periodosService.obtenerHistorico()
      ]);
      
      setPeriodoActivo(activo);
      setHistorico(hist);
    } catch (error) {
      console.error('Error cargando períodos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearPeriodo = async (datos) => {
    try {
      const nuevo = await periodosService.crearPeriodo(datos);
      setPeriodoActivo(nuevo);
      alert('Período creado exitosamente');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleActivarPeriodo = async () => {
    if (!periodoActivo) return;

    try {
      const activado = await periodosService.activarPeriodo(periodoActivo.id);
      setPeriodoActivo(activado);
      alert('Período activado');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Gestión de Períodos Académicos</h2>
      
      {periodoActivo ? (
        <div className="periodo-activo">
          <h3>Período Activo</h3>
          <p><strong>Tipo:</strong> {periodoActivo.tipo}</p>
          <p><strong>Inicio:</strong> {periodoActivo.fecha_inicio}</p>
          <p><strong>Fin:</strong> {periodoActivo.fecha_fin}</p>
          <p><strong>Estado:</strong> {periodoActivo.estado}</p>
          
          {periodoActivo.estado === 'planificado' && (
            <button onClick={handleActivarPeriodo}>Activar Período</button>
          )}
        </div>
      ) : (
        <p>No hay período activo</p>
      )}

      <h3>Histórico</h3>
      <ul>
        {historico.map(p => (
          <li key={p.id}>
            {p.tipo} - {p.fecha_inicio} a {p.fecha_fin} ({p.estado})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 4. Horarios con Filtros (Calendario Service)

```javascript
import { useState, useEffect } from 'react';
import { calendarioService } from '@/services';

export default function HorariosComponent() {
  const [horarios, setHorarios] = useState([]);
  const [carrera, setCarrera] = useState('Ingeniería en Sistemas');
  const [semestre, setSemestre] = useState('1');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHorarios();
  }, [carrera, semestre]);

  const loadHorarios = async () => {
    setLoading(true);
    try {
      const data = await calendarioService.obtenerHorarioSemanal({
        carrera,
        semestre
      });
      setHorarios(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Horario Semanal</h2>
      
      <div>
        <label>
          Carrera:
          <select value={carrera} onChange={e => setCarrera(e.target.value)}>
            <option>Ingeniería en Sistemas</option>
            <option>Ingeniería Industrial</option>
          </select>
        </label>
        
        <label>
          Semestre:
          <input 
            type="number" 
            value={semestre} 
            onChange={e => setSemestre(e.target.value)}
            min="1" 
            max="10"
          />
        </label>
      </div>

      {loading ? (
        <p>Cargando horarios...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Materia</th>
              <th>Profesor</th>
              <th>Día</th>
              <th>Hora</th>
              <th>Aula</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((h, idx) => (
              <tr key={idx}>
                <td>{h.materia}</td>
                <td>{h.profesor}</td>
                <td>{h.dia}</td>
                <td>{h.hora_inicio} - {h.hora_fin}</td>
                <td>{h.aula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

## 5. Generar Examen (Examenes Service)

```javascript
import { useState } from 'react';
import { examenesService } from '@/services';

export default function GenerarExamenComponent() {
  const [config, setConfig] = useState(null);
  const [formData, setFormData] = useState({
    materia: '',
    profesor: '',
    fecha: '',
    hora: '',
    duracion: 120,
    aula: '',
    cantidadPreguntas: 10,
    tipoPreguntas: 'mixta'
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useState(() => {
    loadConfiguracion();
  }, []);

  const loadConfiguracion = async () => {
    try {
      const cfg = await examenesService.obtenerConfiguracion();
      setConfig(cfg);
    } catch (error) {
      console.error('Error cargando config:', error);
    }
  };

  const handleGenerarExamen = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const examen = await examenesService.generarExamen(formData);
      setMensaje(`✅ Examen generado ID: ${examen.id}`);
      // Limpiar formulario
      setFormData({...formData, materia: '', profesor: ''});
    } catch (error) {
      setMensaje(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!config) return <p>Cargando configuración...</p>;

  return (
    <form onSubmit={handleGenerarExamen}>
      <h2>Generar Examen</h2>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <input
        type="text"
        placeholder="Materia"
        value={formData.materia}
        onChange={e => setFormData({...formData, materia: e.target.value})}
        required
      />

      <input
        type="text"
        placeholder="Profesor"
        value={formData.profesor}
        onChange={e => setFormData({...formData, profesor: e.target.value})}
        required
      />

      <input
        type="date"
        value={formData.fecha}
        onChange={e => setFormData({...formData, fecha: e.target.value})}
        required
      />

      <input
        type="time"
        value={formData.hora}
        onChange={e => setFormData({...formData, hora: e.target.value})}
        required
      />

      <select
        value={formData.tipoPreguntas}
        onChange={e => setFormData({...formData, tipoPreguntas: e.target.value})}
      >
        {config.tiposPreguntas.map(tipo => (
          <option key={tipo} value={tipo}>{tipo}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Cantidad de preguntas"
        value={formData.cantidadPreguntas}
        onChange={e => setFormData({...formData, cantidadPreguntas: parseInt(e.target.value)})}
        min="1"
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Generando...' : 'Generar Examen'}
      </button>
    </form>
  );
}
```

## 6. Preferencias de Usuario (Preferencias Service)

```javascript
import { useState, useEffect } from 'react';
import { preferenciasService } from '@/services';

export default function PreferenciasComponent() {
  const [prefs, setPrefs] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const [prefsData, materiasData] = await Promise.all([
        preferenciasService.obtenerPreferencias(),
        preferenciasService.obtenerMateriasDisponibles()
      ]);
      
      setPrefs(prefsData);
      setMaterias(materiasData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarMateria = async (materiaNombre) => {
    try {
      const updated = await preferenciasService.agregarMateriaPrefijo(materiaNombre);
      setPrefs(updated);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleRemoverMateria = async (materiaNombre) => {
    try {
      const updated = await preferenciasService.removerMateriaPrefijo(materiaNombre);
      setPrefs(updated);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleGuardarPreferencias = async () => {
    setGuardando(true);
    try {
      await preferenciasService.actualizarPreferencias(prefs);
      alert('✅ Preferencias guardadas');
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setGuardando(false);
    }
  };

  if (loading) return <p>Cargando preferencias...</p>;
  if (!prefs) return <p>Error cargando datos</p>;

  return (
    <div>
      <h2>Mis Preferencias</h2>

      <section>
        <h3>Materias Favoritas</h3>
        <div>
          {prefs.materiasFavoritas?.map(mat => (
            <div key={mat} className="materia-item">
              <span>{mat}</span>
              <button onClick={() => handleRemoverMateria(mat)}>
                Remover
              </button>
            </div>
          ))}
        </div>

        <h4>Agregar Materia</h4>
        <select onChange={e => handleAgregarMateria(e.target.value)}>
          <option value="">Seleccionar materia...</option>
          {materias.map(m => (
            <option key={m.id} value={m.nombre}>
              {m.nombre}
            </option>
          ))}
        </select>
      </section>

      <section>
        <h3>Configuración</h3>
        <label>
          Horario Preferido:
          <select 
            value={prefs.horarioPrefijo} 
            onChange={e => setPrefs({...prefs, horarioPrefijo: e.target.value})}
          >
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
            <option value="noche">Noche</option>
            <option value="mixto">Mixto</option>
          </select>
        </label>

        <label>
          <input 
            type="checkbox" 
            checked={prefs.preferenciasNotificaciones?.cambiosHorario}
            onChange={e => setPrefs({
              ...prefs,
              preferenciasNotificaciones: {
                ...prefs.preferenciasNotificaciones,
                cambiosHorario: e.target.checked
              }
            })}
          />
          Notificar cambios de horario
        </label>
      </section>

      <button 
        onClick={handleGuardarPreferencias} 
        disabled={guardando}
      >
        {guardando ? 'Guardando...' : 'Guardar Preferencias'}
      </button>
    </div>
  );
}
```

## 7. Hook Personalizado (useUsers)

```javascript
// hooks/useUsers.js
import { useState, useCallback } from 'react';
import { usersService } from '@/services';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await usersService.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (username) => {
    try {
      await usersService.deleteUser(username);
      setUsers(users.filter(u => u.username !== username));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [users]);

  return { users, loading, error, loadUsers, deleteUser };
};

// Uso en componente
export default function UsersList() {
  const { users, loading, error, loadUsers } = useUsers();

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    // ...
  );
}
```

## 8. Manejo de Errores Completo

```javascript
import { periodosService } from '@/services';

async function crearYActivarPeriodo(datos) {
  try {
    // Crear período
    console.log('Creando período...');
    const periodo = await periodosService.crearPeriodo(datos);
    console.log('✅ Período creado:', periodo);

    // Activar período
    console.log('Activando período...');
    const activado = await periodosService.activarPeriodo(periodo.id);
    console.log('✅ Período activado:', activado);

    return activado;

  } catch (error) {
    // Diferente manejo según tipo de error
    if (error.message.includes('ya existe')) {
      console.error('⚠️ Ya existe un período activo');
      throw new Error('No puedes crear otro período mientras hay uno activo');
    }
    
    if (error.message.includes('fechas')) {
      console.error('⚠️ Fechas inválidas');
      throw new Error('La fecha de inicio debe ser anterior a la de fin');
    }

    // Error genérico
    console.error('❌ Error desconocido:', error);
    throw error;
  }
}
```

---

Estos ejemplos cubren los casos de uso más comunes. Para más información, consulta:
- `src/services/README.md`
- Comentarios JSDoc en cada servicio
