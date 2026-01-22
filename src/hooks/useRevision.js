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
            jefe_carrera: 'Dr. Alejandro Jarillo Silva',
            carrera: 'Informática',
            tipo_examen: 'Parcial 1',
            periodo: 'Periodo 1 - 2026',
            fecha_envio: '2026-01-10',
            total_examenes: 25,
            estado: ESTADOS.EN_REVISION,
            semestres: ['1°', '3°', '5°', '7°', '9°'],
            horarios: [
              {
                semestre: '1°',
                materia: 'Diseño Estructurado de Algoritmos',
                profesor: 'Dr. Alejandro Jarillo Silva',
                aula: 'Lab-301',
                fecha: '2026-01-20',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                duracion: 2,
                alumnos: 35
              },
              {
                semestre: '1°',
                materia: 'Cálculo I',
                profesor: 'Dr. Arturo Benítez Hernández',
                aula: 'Aula-101',
                fecha: '2026-01-20',
                hora_inicio: '10:00',
                hora_fin: '12:00',
                duracion: 2,
                alumnos: 32
              },
              {
                semestre: '3°',
                materia: 'Estructuras de Datos',
                profesor: 'Dr. Jesús Cruz Ahuactzil',
                aula: 'Lab-303',
                fecha: '2026-01-20',
                hora_inicio: '10:00',
                hora_fin: '12:00',
                duracion: 2,
                alumnos: 30
              },
              {
                semestre: '5°',
                materia: 'Bases de Datos II',
                profesor: 'Dr. Alejandro Jarillo Silva',
                aula: 'Lab-308',
                fecha: '2026-01-21',
                hora_inicio: '09:00',
                hora_fin: '11:00',
                duracion: 2,
                alumnos: 28
              },
              {
                semestre: '7°',
                materia: 'Ingeniería de Software II',
                profesor: 'M.C.A.C. José Alberto Cruz Tolentino',
                aula: 'Aula-209',
                fecha: '2026-01-21',
                hora_inicio: '11:00',
                hora_fin: '13:00',
                duracion: 2,
                alumnos: 26
              },
              {
                semestre: '9°',
                materia: 'Inteligencia Artificial',
                profesor: 'Dr. José J. Hernández Barriga',
                aula: 'Lab-316',
                fecha: '2026-01-22',
                hora_inicio: '11:00',
                hora_fin: '13:00',
                duracion: 2,
                alumnos: 24
              },
            ]
          },
          {
            id: 2,
            jefe_carrera: 'Dr. Amando Alejandro Ruiz Figueroa',
            carrera: 'Medicina',
            tipo_examen: 'Parcial 1',
            periodo: 'Periodo 1 - 2026',
            fecha_envio: '2026-01-11',
            total_examenes: 15,
            estado: ESTADOS.EN_REVISION,
            semestres: ['1°', '3°', '5°'],
            horarios: [
              {
                semestre: '1°',
                materia: 'Anatomía Humana I',
                profesor: 'Dr. Arisel Darío Barragán López',
                aula: 'Aula-201',
                fecha: '2026-01-22',
                hora_inicio: '14:00',
                hora_fin: '16:00',
                duracion: 2,
                alumnos: 40
              },
              {
                semestre: '3°',
                materia: 'Fisiología Humana',
                profesor: 'Dra. Aidee Cruz Barragán',
                aula: 'Aula-202',
                fecha: '2026-01-22',
                hora_inicio: '16:00',
                hora_fin: '18:00',
                duracion: 2,
                alumnos: 35
              },
              {
                semestre: '5°',
                materia: 'Farmacología Clínica',
                profesor: 'Dr. Eric Melecio Castro Leal',
                aula: 'Aula-203',
                fecha: '2026-01-23',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                duracion: 2,
                alumnos: 30
              },
            ]
          },
          {
            id: 3,
            jefe_carrera: 'M.C. Mónica Pérez Meza',
            carrera: 'Administración Pública',
            tipo_examen: 'Ordinario',
            periodo: 'Periodo 1 - 2026',
            fecha_envio: '2026-01-12',
            total_examenes: 20,
            estado: ESTADOS.EN_REVISION,
            semestres: ['1°', '3°', '5°', '7°'],
            horarios: [
              {
                semestre: '1°',
                materia: 'Introducción a la Administración Pública',
                profesor: 'M.C. Mónica Pérez Meza',
                aula: 'Aula-AP01',
                fecha: '2026-01-23',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                duracion: 2,
                alumnos: 28
              },
              {
                semestre: '3°',
                materia: 'Derecho Administrativo',
                profesor: 'M.C. Teresita de J. Mijangos Martínez',
                aula: 'Aula-AP02',
                fecha: '2026-01-23',
                hora_inicio: '10:00',
                hora_fin: '12:00',
                duracion: 2,
                alumnos: 26
              },
              {
                semestre: '5°',
                materia: 'Políticas Públicas',
                profesor: 'M.C.C. Lirio Ruiz Guerra',
                aula: 'Aula-AP03',
                fecha: '2026-01-24',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                duracion: 2,
                alumnos: 24
              },
              {
                semestre: '7°',
                materia: 'Gestión de Recursos Públicos',
                profesor: 'M.C.A.C. José Alberto Cruz Tolentino',
                aula: 'Aula-AP04',
                fecha: '2026-01-24',
                hora_inicio: '10:00',
                hora_fin: '12:00',
                duracion: 2,
                alumnos: 22
              },
            ]
          }
        ];
        
        setHorariosPendientes(mockHorarios);
        // Seleccionar automáticamente el primer horario
        if (mockHorarios.length > 0) {
          setHorarioSeleccionado(mockHorarios[0]);
        }
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
