import { useState, useEffect } from 'react';
import { ESTADOS } from '../constants/estadosExamen';

/**
 * Hook para manejar la lógica de revisión de horarios
 * Usado por Secretaria/Servicios Escolares para aprobar o rechazar horarios
 */
const useRevision = () => {
  // Lista de horarios pendientes de revisión
  const [horariosPendientes, setHorariosPendientes] = useState([]);
  
  // Horario seleccionado actualmente
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  
  // Estado de carga
  const [loading, setLoading] = useState(true);
  
  // Diálogo de aprobar/rechazar
  const [dialogAprobar, setDialogAprobar] = useState(false);
  const [dialogRechazar, setDialogRechazar] = useState(false);
  
  // Campos de retroalimentación
  const [observaciones, setObservaciones] = useState('');
  const [retroalimentacion, setRetroalimentacion] = useState('');

  // TODO: Conectar con el backend
  // GET /api/revision/pendientes
  useEffect(() => {
    const fetchHorariosPendientes = async () => {
      setLoading(true);
      
      // Mock data - reemplazar con llamada al backend
      setTimeout(() => {
        const mockHorarios = [
          {
            id: 1,
            jefe_carrera: 'Dr. Juan Pérez García',
            carrera: 'Ingeniería en Sistemas Computacionales',
            tipo_examen: 'Parcial 1',
            periodo: 'Periodo 1 - 2026',
            fecha_envio: '2026-01-10',
            total_examenes: 25,
            estado: ESTADOS.EN_REVISION,
            semestres: ['1°', '2°', '3°', '4°', '5°'],
            horarios: [
              {
                semestre: '1°',
                materia: 'Cálculo Diferencial',
                profesor: 'Ing. María López',
                aula: 'A101',
                fecha: '2026-01-20',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                duracion: 2,
                alumnos: 35
              },
              {
                semestre: '1°',
                materia: 'Fundamentos de Programación',
                profesor: 'Ing. Carlos Ramírez',
                aula: 'L1',
                fecha: '2026-01-20',
                hora_inicio: '10:00',
                hora_fin: '12:00',
                duracion: 2,
                alumnos: 32
              },
              {
                semestre: '2°',
                materia: 'Estructura de Datos',
                profesor: 'Dr. Ana Torres',
                aula: 'L2',
                fecha: '2026-01-20',
                hora_inicio: '12:00',
                hora_fin: '14:00',
                duracion: 2,
                alumnos: 30
              },
              {
                semestre: '3°',
                materia: 'Base de Datos',
                profesor: 'Mtro. Pedro Sánchez',
                aula: 'L3',
                fecha: '2026-01-21',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                duracion: 2,
                alumnos: 28
              },
            ]
          },
          {
            id: 2,
            jefe_carrera: 'Dra. María González',
            carrera: 'Ingeniería Industrial',
            tipo_examen: 'Parcial 1',
            periodo: 'Periodo 1 - 2026',
            fecha_envio: '2026-01-11',
            total_examenes: 18,
            estado: ESTADOS.EN_REVISION,
            semestres: ['1°', '2°', '3°'],
            horarios: [
              {
                semestre: '1°',
                materia: 'Probabilidad y Estadística',
                profesor: 'Dr. Roberto Méndez',
                aula: 'A201',
                fecha: '2026-01-22',
                hora_inicio: '14:00',
                hora_fin: '16:00',
                duracion: 2,
                alumnos: 40
              },
              {
                semestre: '2°',
                materia: 'Ingeniería de Métodos',
                profesor: 'Ing. Laura Castillo',
                aula: 'A202',
                fecha: '2026-01-22',
                hora_inicio: '16:00',
                hora_fin: '18:00',
                duracion: 2,
                alumnos: 35
              },
            ]
          },
          {
            id: 3,
            jefe_carrera: 'Mtro. Carlos Rodríguez',
            carrera: 'Ingeniería Electrónica',
            tipo_examen: 'Ordinario',
            periodo: 'Periodo 1 - 2026',
            fecha_envio: '2026-01-12',
            total_examenes: 15,
            estado: ESTADOS.EN_REVISION,
            semestres: ['4°', '5°', '6°'],
            horarios: [
              {
                semestre: '4°',
                materia: 'Circuitos Eléctricos II',
                profesor: 'Dr. Jorge Hernández',
                aula: 'LE1',
                fecha: '2026-01-23',
                hora_inicio: '08:00',
                hora_fin: '11:00',
                duracion: 3,
                alumnos: 25
              },
            ]
          }
        ];
        
        setHorariosPendientes(mockHorarios);
        setLoading(false);
      }, 1000);
    };

    fetchHorariosPendientes();
  }, []);

  // Seleccionar horario para revisar
  const seleccionarHorario = (horario) => {
    setHorarioSeleccionado(horario);
    setObservaciones('');
    setRetroalimentacion('');
  };

  // Abrir diálogo de aprobar
  const abrirDialogoAprobar = () => {
    setDialogAprobar(true);
    setObservaciones('');
  };

  // Cerrar diálogo de aprobar
  const cerrarDialogoAprobar = () => {
    setDialogAprobar(false);
    setObservaciones('');
  };

  // Abrir diálogo de rechazar
  const abrirDialogoRechazar = () => {
    setDialogRechazar(true);
    setRetroalimentacion('');
  };

  // Cerrar diálogo de rechazar
  const cerrarDialogoRechazar = () => {
    setDialogRechazar(false);
    setRetroalimentacion('');
  };

  // Aprobar horario
  const aprobarHorario = async () => {
    if (!horarioSeleccionado) return;

    // TODO: Conectar con backend
    // PUT /api/revision/:id/aprobar
    // body: { observaciones }
    
    console.log('Aprobando horario:', {
      id: horarioSeleccionado.id,
      observaciones
    });

    // Simular aprobación
    setHorariosPendientes(prev => 
      prev.filter(h => h.id !== horarioSeleccionado.id)
    );
    
    setHorarioSeleccionado(null);
    cerrarDialogoAprobar();
    
    // TODO: Mostrar notificación de éxito
    alert('Horario aprobado exitosamente');
  };

  // Rechazar horario
  const rechazarHorario = async () => {
    if (!horarioSeleccionado || !retroalimentacion.trim()) {
      alert('La retroalimentación es obligatoria para rechazar');
      return;
    }

    // TODO: Conectar con backend
    // PUT /api/revision/:id/rechazar
    // body: { retroalimentacion }
    
    console.log('Rechazando horario:', {
      id: horarioSeleccionado.id,
      retroalimentacion
    });

    // Simular rechazo
    setHorariosPendientes(prev => 
      prev.filter(h => h.id !== horarioSeleccionado.id)
    );
    
    setHorarioSeleccionado(null);
    cerrarDialogoRechazar();
    
    // TODO: Mostrar notificación de éxito
    alert('Horario rechazado. Se ha notificado al Jefe de Carrera.');
  };

  return {
    // Estado
    horariosPendientes,
    horarioSeleccionado,
    loading,
    dialogAprobar,
    dialogRechazar,
    observaciones,
    retroalimentacion,
    
    // Acciones
    seleccionarHorario,
    abrirDialogoAprobar,
    cerrarDialogoAprobar,
    abrirDialogoRechazar,
    cerrarDialogoRechazar,
    setObservaciones,
    setRetroalimentacion,
    aprobarHorario,
    rechazarHorario,
  };
};

export default useRevision;
