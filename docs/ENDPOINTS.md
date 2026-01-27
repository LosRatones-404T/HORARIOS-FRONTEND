# Documentación de Endpoints

Todos los endpoints necesarios para el funcionamiento del sistema de gestión de horarios académicos.

## Base URL
```
http://localhost:3000/api
```

---

## 1. Autenticación

### Login
Autentica un usuario y retorna su información junto con un token JWT.

**Endpoint:** `POST /auth/login`

**Parámetros del cuerpo:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@escuela.edu",
    "name": "Administrador",
    "role": "admin",
    "estado": "activo"
  }
}
```

**Respuesta de error (401):**
```json
{
  "success": false,
  "error": "Credenciales incorrectas"
}
```

---

### Logout
Cierra la sesión del usuario actual.

**Endpoint:** `POST /auth/logout`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Sesión cerrada correctamente"
}
```

---

### Verificar Token
Verifica la validez del token JWT actual.

**Endpoint:** `GET /auth/verify`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

---

## 2. Vista Administrador

### 2.1 Gestión de Usuarios

#### Obtener lista de usuarios
Retorna la lista de todos los usuarios del sistema.

**Endpoint:** `GET /admin/usuarios`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Parámetros de query (opcionales):**
```
?role=jefe&estado=activo&page=1&limit=10
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan García",
      "email": "juan.garcia@ejemplo.com",
      "rol": "jefe",
      "departamento": "Ingeniería en Sistemas",
      "estado": "activo",
      "ultimaActividad": "2026-01-13T14:30:00Z",
      "fechaCreacion": "2025-08-01T10:00:00Z"
    },
    {
      "id": 2,
      "nombre": "María López",
      "email": "maria.lopez@ejemplo.com",
      "rol": "secretaria",
      "departamento": "Servicios Escolares",
      "estado": "activo",
      "ultimaActividad": "2026-01-12T16:45:00Z",
      "fechaCreacion": "2025-09-15T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

#### Crear usuario
Crea un nuevo usuario en el sistema.

**Endpoint:** `POST /admin/usuarios`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "nombre": "Carlos Rodríguez",
  "email": "carlos.rodriguez@ejemplo.com",
  "username": "carlos.rodriguez",
  "password": "temporalPassword123",
  "rol": "jefe",
  "departamento": "Ingeniería Industrial"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario creado correctamente",
  "data": {
    "id": 5,
    "nombre": "Carlos Rodríguez",
    "email": "carlos.rodriguez@ejemplo.com",
    "username": "carlos.rodriguez",
    "rol": "jefe",
    "departamento": "Ingeniería Industrial",
    "estado": "activo",
    "fechaCreacion": "2026-01-16T10:00:00Z"
  }
}
```

#### Actualizar usuario
Actualiza la información de un usuario.

**Endpoint:** `PUT /admin/usuarios/{usuarioId}`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "nombre": "Carlos Rodríguez Actualizado",
  "email": "carlos.nuevo@ejemplo.com",
  "rol": "secretaria",
  "estado": "inactivo"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario actualizado correctamente",
  "data": {
    "id": 5,
    "nombre": "Carlos Rodríguez Actualizado",
    "email": "carlos.nuevo@ejemplo.com",
    "rol": "secretaria",
    "estado": "inactivo"
  }
}
```

#### Eliminar usuario
Elimina un usuario del sistema.

**Endpoint:** `DELETE /admin/usuarios/{usuarioId}`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario eliminado correctamente"
}
```

---

### 2.2 Gestión de Períodos Académicos

#### Obtener período activo
Retorna el período académico actualmente activo.

**Endpoint:** `GET /admin/periodos/activo`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "tipo": "ordinario",
    "estado": "activo",
    "nombre": "Período Ordinario Enero-Febrero 2026",
    "fecha_inicio": "2026-01-20",
    "fecha_fin": "2026-02-28",
    "fecha_creacion": "2025-12-15T10:00:00Z",
    "descripcion": "Período ordinario enero-febrero 2026",
    "usuario_creador": "admin@escuela.edu",
    "examenes_generados": 0
  }
}
```

#### Obtener histórico de períodos
Retorna el histórico de todos los períodos académicos.

**Endpoint:** `GET /admin/periodos/historico`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "tipo": "ordinario",
      "estado": "finalizado",
      "nombre": "Período Ordinario Agosto-Septiembre 2025",
      "fecha_inicio": "2025-08-01",
      "fecha_fin": "2025-09-15",
      "fecha_creacion": "2025-07-15T10:00:00Z",
      "fecha_finalizacion": "2025-09-15T18:00:00Z",
      "descripcion": "Período ordinario agosto-septiembre 2025",
      "usuario_creador": "admin@escuela.edu",
      "examenes_generados": 15
    },
    {
      "id": 2,
      "tipo": "extraordinario",
      "estado": "finalizado",
      "nombre": "Período Extraordinario Octubre 2025",
      "fecha_inicio": "2025-10-01",
      "fecha_fin": "2025-10-20",
      "fecha_creacion": "2025-09-20T10:00:00Z",
      "fecha_finalizacion": "2025-10-20T18:00:00Z",
      "descripcion": "Período extraordinario octubre 2025",
      "usuario_creador": "admin@escuela.edu",
      "examenes_generados": 8
    }
  ]
}
```

#### Crear período académico
Crea un nuevo período académico.

**Endpoint:** `POST /admin/periodos`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "tipo": "ordinario",
  "nombre": "Período Ordinario Marzo-Abril 2026",
  "fecha_inicio": "2026-03-01",
  "fecha_fin": "2026-04-30",
  "descripcion": "Período ordinario marzo-abril 2026"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Período creado correctamente",
  "data": {
    "id": 4,
    "tipo": "ordinario",
    "estado": "inactivo",
    "nombre": "Período Ordinario Marzo-Abril 2026",
    "fecha_inicio": "2026-03-01",
    "fecha_fin": "2026-04-30",
    "fecha_creacion": "2026-01-16T10:00:00Z",
    "descripcion": "Período ordinario marzo-abril 2026",
    "usuario_creador": "admin@escuela.edu",
    "examenes_generados": 0
  }
}
```

#### Activar período académico
Activa un período académico existente.

**Endpoint:** `PUT /admin/periodos/{periodoId}/activar`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Período activado correctamente",
  "data": {
    "id": 4,
    "estado": "activo",
    "nombre": "Período Ordinario Marzo-Abril 2026"
  }
}
```

#### Finalizar período académico
Finaliza un período académico activo.

**Endpoint:** `PUT /admin/periodos/{periodoId}/finalizar`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Período finalizado correctamente",
  "data": {
    "id": 4,
    "estado": "finalizado",
    "nombre": "Período Ordinario Marzo-Abril 2026",
    "fecha_finalizacion": "2026-01-16T15:30:00Z"
  }
}
```

---

### 2.3 Estadísticas del Administrador

#### Obtener dashboard administrativo
Retorna estadísticas generales del sistema.

**Endpoint:** `GET /admin/dashboard`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "estadisticas": {
      "totalUsuarios": 12,
      "usuariosActivos": 10,
      "usuariosInactivos": 2,
      "totalJefes": 4,
      "totalSecretarias": 3,
      "totalAdmins": 1
    },
    "periodos": {
      "periodoActivo": {
        "id": 3,
        "nombre": "Período Ordinario Enero-Febrero 2026",
        "estado": "activo"
      },
      "periodosFinalizados": 2,
      "proximoPeriodo": {
        "id": 4,
        "nombre": "Período Ordinario Marzo-Abril 2026"
      }
    },
    "examenes": {
      "totalGenerados": 23,
      "generadosEnPeriodoActivo": 0,
      "pendientesRevision": 0
    },
    "actividadReciente": [
      {
        "id": 1,
        "usuario": "juan.garcia@ejemplo.com",
        "accion": "login",
        "timestamp": "2026-01-16T14:30:00Z"
      }
    ]
  }
}
```

---

## 3. Vista Jefe de Carrera

### 3.1 Horarios y Materias

#### Obtener lista de materias
Retorna las materias bajo supervisión del jefe.

**Endpoint:** `GET /jefe/materias`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Parámetros de query (opcionales):**
```
?departamento=Ingeniería en Sistemas&estado=activo&page=1&limit=10
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "codigo": "ING101",
      "nombre": "Programación I",
      "departamento": "Ingeniería en Sistemas",
      "creditos": 4,
      "horas_semana": 5,
      "semestre": 1,
      "profesor": "Dr. Juan García",
      "estado": "activo",
      "estudiantes": 35,
      "horario": {
        "lunes": "09:00-11:00",
        "miércoles": "09:00-11:00",
        "viernes": "09:00-11:00"
      }
    },
    {
      "id": 2,
      "codigo": "ING102",
      "nombre": "Programación II",
      "departamento": "Ingeniería en Sistemas",
      "creditos": 4,
      "horas_semana": 5,
      "semestre": 2,
      "profesor": "Dra. María López",
      "estado": "activo",
      "estudiantes": 32,
      "horario": {
        "martes": "10:00-12:00",
        "jueves": "10:00-12:00"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2
  }
}
```

#### Obtener horario semanal
Retorna el horario semanal de materias.

**Endpoint:** `GET /jefe/horario-semanal`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Parámetros de query (opcionales):**
```
?semana=2026-01-20&profesor={profesorId}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "semana": "2026-01-20",
    "materias": [
      {
        "id": 1,
        "nombre": "Programación I",
        "profesor": "Dr. Juan García",
        "horarios": [
          {
            "dia": "lunes",
            "horaInicio": "09:00",
            "horaFin": "11:00",
            "aula": "A101"
          },
          {
            "dia": "miércoles",
            "horaInicio": "09:00",
            "horaFin": "11:00",
            "aula": "A101"
          }
        ]
      }
    ]
  }
}
```

---

### 3.2 Generación de Exámenes

#### Generar exámenes
Genera los exámenes para un período específico.

**Endpoint:** `POST /jefe/examenes/generar`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "periodoId": 3,
  "materias": [1, 2, 5],
  "tipo": "ordinario"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Exámenes generados correctamente",
  "data": {
    "periodo": {
      "id": 3,
      "nombre": "Período Ordinario Enero-Febrero 2026"
    },
    "examenesGenerados": 3,
    "detalles": [
      {
        "id": 101,
        "materia": "Programación I",
        "profesor": "Dr. Juan García",
        "tipo": "ordinario",
        "estado": "generado",
        "fechaGeneracion": "2026-01-16T10:30:00Z"
      }
    ]
  }
}
```

#### Obtener exámenes generados
Retorna los exámenes generados en el período actual.

**Endpoint:** `GET /jefe/examenes`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Parámetros de query (opcionales):**
```
?periodoId=3&estado=generado&page=1&limit=10
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "materia": "Programación I",
      "codigo": "ING101",
      "profesor": "Dr. Juan García",
      "tipo": "ordinario",
      "estado": "generado",
      "fechaGeneracion": "2026-01-16T10:30:00Z",
      "estudiantes": 35,
      "aula": "A101"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

---

### 3.3 Revisión de Horarios

#### Obtener solicitudes de revisión
Retorna las solicitudes de revisión de horarios.

**Endpoint:** `GET /jefe/revisiones`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Parámetros de query (opcionales):**
```
?estado=pendiente&page=1&limit=10
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "materia": "Programación I",
      "cambio_solicitado": "Cambio de horario de lunes a martes",
      "razon": "Conflicto con otra materia",
      "estado": "pendiente",
      "solicitado_por": "Dr. Juan García",
      "fecha_solicitud": "2026-01-15T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

#### Aprobar revisión
Aprueba una solicitud de revisión.

**Endpoint:** `PUT /jefe/revisiones/{revisionId}/aprobar`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "observaciones": "Cambio aprobado correctamente"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Revisión aprobada correctamente",
  "data": {
    "id": 1,
    "estado": "aprobado",
    "fecha_aprobacion": "2026-01-16T10:00:00Z"
  }
}
```

#### Rechazar revisión
Rechaza una solicitud de revisión.

**Endpoint:** `PUT /jefe/revisiones/{revisionId}/rechazar`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "razon": "No se puede realizar el cambio en este momento"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Revisión rechazada correctamente",
  "data": {
    "id": 1,
    "estado": "rechazado",
    "fecha_rechazo": "2026-01-16T10:00:00Z"
  }
}
```

---

### 3.4 Dashboard Jefe de Carrera

#### Obtener dashboard del jefe
Retorna estadísticas e información relevante para el jefe.

**Endpoint:** `GET /jefe/dashboard`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "periodo": {
      "id": 3,
      "nombre": "Período Ordinario Enero-Febrero 2026",
      "estado": "activo",
      "fecha_inicio": "2026-01-20",
      "fecha_fin": "2026-02-28"
    },
    "materias": {
      "total": 8,
      "activas": 8
    },
    "examenes": {
      "generados": 0,
      "pendientes_generacion": 8
    },
    "revisiones": {
      "pendientes": 1,
      "aprobadas": 5,
      "rechazadas": 2
    },
    "horarios": {
      "conflictos_detectados": 0,
      "materias_sin_horario": 0
    }
  }
}
```

---

## 4. Vista Servicios Escolares

### 4.1 Revisión de Exámenes

#### Obtener exámenes para revisar
Retorna los exámenes que están pendientes de revisión.

**Endpoint:** `GET /secretaria/examenes/pendientes`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Parámetros de query (opcionales):**
```
?periodo=3&jefe={jefeId}&page=1&limit=10
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "materia": "Programación I",
      "codigo": "ING101",
      "jefe_carrera": "Dr. Juan García",
      "profesor": "Dr. Juan García",
      "tipo": "ordinario",
      "estado": "pendiente_revision",
      "fecha_generacion": "2026-01-16T10:30:00Z",
      "estudiantes": 35,
      "aula": "A101",
      "fechas_disponibles": ["2026-01-20", "2026-01-21", "2026-01-22"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

#### Revisar examen
Realiza la revisión de un examen.

**Endpoint:** `POST /secretaria/examenes/{examenId}/revisar`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "estado": "aprobado",
  "observaciones": "Examen aprobado",
  "fecha_examen": "2026-01-20",
  "hora_inicio": "09:00",
  "hora_fin": "11:00"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Examen revisado correctamente",
  "data": {
    "id": 101,
    "estado": "aprobado",
    "fecha_revision": "2026-01-16T14:30:00Z",
    "fecha_examen": "2026-01-20",
    "hora_inicio": "09:00",
    "hora_fin": "11:00"
  }
}
```

#### Rechazar examen
Rechaza un examen solicitando correcciones.

**Endpoint:** `POST /secretaria/examenes/{examenId}/rechazar`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "razon": "revisar",
  "observaciones": "Se requiere ajustar el horario de examen"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Examen rechazado correctamente",
  "data": {
    "id": 101,
    "estado": "rechazado",
    "fecha_rechazo": "2026-01-16T14:30:00Z",
    "observaciones": "Se requiere ajustar el horario de examen"
  }
}
```

---

### 4.2 Gestión de Horarios de Exámenes

#### Obtener calendario de exámenes
Retorna el calendario con todos los exámenes aprobados.

**Endpoint:** `GET /secretaria/calendario`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Parámetros de query (opcionales):**
```
?periodo=3&fecha_inicio=2026-01-20&fecha_fin=2026-02-28
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "periodo": {
      "id": 3,
      "nombre": "Período Ordinario Enero-Febrero 2026"
    },
    "examen": [
      {
        "id": 101,
        "materia": "Programación I",
        "codigo": "ING101",
        "profesor": "Dr. Juan García",
        "fecha": "2026-01-20",
        "hora_inicio": "09:00",
        "hora_fin": "11:00",
        "aula": "A101",
        "estudiantes": 35,
        "estado": "aprobado"
      },
      {
        "id": 102,
        "materia": "Programación II",
        "codigo": "ING102",
        "profesor": "Dra. María López",
        "fecha": "2026-01-20",
        "hora_inicio": "14:00",
        "hora_fin": "16:00",
        "aula": "A102",
        "estudiantes": 32,
        "estado": "aprobado"
      }
    ]
  }
}
```

#### Cambiar horario de examen
Modifica el horario de un examen aprobado.

**Endpoint:** `PUT /secretaria/examenes/{examenId}/horario`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "fecha": "2026-01-21",
  "hora_inicio": "10:00",
  "hora_fin": "12:00",
  "aula": "A103"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Horario actualizado correctamente",
  "data": {
    "id": 101,
    "fecha": "2026-01-21",
    "hora_inicio": "10:00",
    "hora_fin": "12:00",
    "aula": "A103"
  }
}
```

---

### 4.3 Preferencias y Configuración

#### Obtener preferencias
Retorna las preferencias de configuración de servicios escolares.

**Endpoint:** `GET /secretaria/preferencias`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "notificaciones": {
      "email_pendientes_revision": true,
      "email_cambios_horario": true,
      "email_recordatorio": true
    },
    "horarios": {
      "duracion_examen_default": 120,
      "intervalo_minimo_entre_examenes": 30,
      "hora_inicio_examenes": "08:00",
      "hora_fin_examenes": "18:00"
    },
    "tema": "light"
  }
}
```

#### Actualizar preferencias
Actualiza las preferencias de configuración.

**Endpoint:** `PUT /secretaria/preferencias`

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del cuerpo:**
```json
{
  "notificaciones": {
    "email_pendientes_revision": false,
    "email_cambios_horario": true,
    "email_recordatorio": true
  },
  "horarios": {
    "duracion_examen_default": 120,
    "intervalo_minimo_entre_examenes": 30,
    "hora_inicio_examenes": "08:00",
    "hora_fin_examenes": "18:00"
  },
  "tema": "dark"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Preferencias actualizadas correctamente",
  "data": {
    "notificaciones": {
      "email_pendientes_revision": false,
      "email_cambios_horario": true,
      "email_recordatorio": true
    },
    "horarios": {
      "duracion_examen_default": 120
    },
    "tema": "dark"
  }
}
```

---

### 4.4 Dashboard Servicios Escolares

#### Obtener dashboard de secretaria
Retorna estadísticas e información relevante para servicios escolares.

**Endpoint:** `GET /secretaria/dashboard`

**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "periodo": {
      "id": 3,
      "nombre": "Período Ordinario Enero-Febrero 2026",
      "estado": "activo",
      "fecha_inicio": "2026-01-20",
      "fecha_fin": "2026-02-28"
    },
    "examenes": {
      "pendientes_revision": 3,
      "revisados_hoy": 2,
      "total_revisados": 15,
      "aprobados": 12,
      "rechazados": 3
    },
    "calendario": {
      "total_examenes_programados": 12,
      "proximos_5_examenes": [
        {
          "id": 101,
          "materia": "Programación I",
          "fecha": "2026-01-20",
          "hora": "09:00"
        }
      ]
    },
    "conflictos": {
      "conflictos_horarios": 0,
      "aulas_no_disponibles": 0
    }
  }
}
```

---

## 5. Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Solicitud inválida |
| 401 | Unauthorized - No autorizado |
| 403 | Forbidden - Acceso prohibido |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto (ej: período ya existe) |
| 422 | Unprocessable Entity - Datos inválidos |
| 500 | Internal Server Error - Error del servidor |

---

## 6. Formatos de Fechas y Horas

- **Fechas**: `YYYY-MM-DD` (ej: 2026-01-16)
- **Horas**: `HH:mm` formato 24h (ej: 14:30)
- **Timestamps ISO 8601**: `YYYY-MM-DDTHH:mm:ssZ` (ej: 2026-01-16T14:30:00Z)

---

## 7. Headers Comunes

Todos los endpoints protegidos requieren:
```
Authorization: Bearer {token}
Content-Type: application/json (para POST, PUT, DELETE)
```

---

## 8. Notas de Implementación

1. **Autenticación**: Utilizar JWT para todas las solicitudes autenticadas
2. **CORS**: Configurar CORS para permitir solicitudes desde `http://localhost:5173`
3. **Validación**: Validar todos los parámetros de entrada en el backend
4. **Errores**: Retornar mensajes de error consistentes con estructura estándar
5. **Paginación**: Implementar en todos los endpoints que retornan listas
6. **Rate Limiting**: Implementar rate limiting para evitar abuso
7. **Logging**: Registrar todas las acciones importantes para auditoría
