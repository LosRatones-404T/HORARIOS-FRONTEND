# Gestión de Períodos Académicos

## Descripción General

Este módulo permite a Servicios Escolares (Secretaría) gestionar los períodos académicos durante los cuales los Jefes de Carrera pueden generar horarios de exámenes. El sistema contempla situaciones de emergencia que permiten modificar períodos activos con justificación adecuada.

## Características Principales

### 1. Creación de Períodos
- **Tipos de período**:
  - Ordinario: Período regular de exámenes
  - Extraordinario: Exámenes extraordinarios
  - Regularización: Período de regularización

- **Estados del período**:
  - **Planificado**: Período creado pero no activo
  - **Activo**: Período en curso, permite generación de exámenes
  - **Modificado**: Período modificado por emergencia
  - **Finalizado**: Período concluido

### 2. Activación de Períodos
- Solo un período puede estar activo a la vez
- Requiere confirmación antes de activar
- Una vez activo, habilita la generación de exámenes para los Jefes de Carrera
- No se puede modificar fácilmente (solo por emergencia)

### 3. Modificación por Emergencia
El sistema permite modificar períodos activos únicamente en situaciones excepcionales:

**Tipos de emergencia permitidos**:
- Desastre natural (terremoto, huracán, inundación)
- Contingencia sanitaria (pandemia, brote)
- Situación social (manifestaciones, paros)
- Falla técnica mayor (caída de sistemas críticos)
- Otra emergencia justificada

**Modificaciones posibles**:
- Extender la fecha de fin del período
- Retrasar la fecha de inicio
- Modificar ambas fechas

**Requisitos**:
- Motivo detallado y justificación
- Se registra el tipo de emergencia
- Se guarda un historial de todas las modificaciones
- Se registra el usuario que realizó la modificación

### 4. Finalización de Períodos
- Los períodos se pueden finalizar manualmente
- Al finalizar, se bloquea la generación de nuevos exámenes
- Se mantiene en el histórico con estadísticas

### 5. Validación en Generación de Exámenes
- Los Jefes de Carrera solo pueden generar exámenes si hay un período activo
- Se muestra información clara del período actual
- Se bloquea la interfaz si no hay período activo
- Se notifica sobre el estado del período

## Integración con Backend

### Endpoints Requeridos

#### 1. Obtener Período Activo
```
GET /api/periodos/activo
```

**Respuesta exitosa (200)**:
```json
{
  "id": 1,
  "tipo": "ordinario",
  "estado": "activo",
  "fecha_inicio": "2026-01-20",
  "fecha_fin": "2026-02-15",
  "fecha_creacion": "2026-01-10T10:00:00Z",
  "fecha_activacion": "2026-01-15T09:30:00Z",
  "descripcion": "Período ordinario de exámenes finales enero-junio 2026",
  "usuario_creador": "admin@escuela.edu",
  "modificaciones": [
    {
      "id": 1,
      "fecha": "2026-01-25T14:00:00Z",
      "tipo_emergencia": "desastre_natural",
      "motivo": "Sismo de magnitud 7.1, se extiende el período",
      "fecha_inicio_anterior": "2026-01-20",
      "fecha_fin_anterior": "2026-02-10",
      "fecha_inicio_nueva": "2026-01-20",
      "fecha_fin_nueva": "2026-02-15",
      "usuario": "secretaria@escuela.edu"
    }
  ]
}
```

**Sin período activo (404)**:
```json
{
  "message": "No hay período académico activo"
}
```

#### 2. Obtener Histórico de Períodos
```
GET /api/periodos/historico
```

**Respuesta (200)**:
```json
[
  {
    "id": 1,
    "tipo": "ordinario",
    "estado": "finalizado",
    "fecha_inicio": "2025-08-01",
    "fecha_fin": "2025-09-15",
    "fecha_creacion": "2025-07-15T10:00:00Z",
    "fecha_finalizacion": "2025-09-15T18:00:00Z",
    "descripcion": "Período ordinario agosto-septiembre 2025",
    "examenes_generados": 15,
    "modificaciones": []
  },
  {
    "id": 2,
    "tipo": "extraordinario",
    "estado": "finalizado",
    "fecha_inicio": "2025-10-01",
    "fecha_fin": "2025-10-20",
    "fecha_creacion": "2025-09-20T10:00:00Z",
    "descripcion": "Período extraordinario octubre 2025",
    "examenes_generados": 8,
    "modificaciones": []
  }
]
```

#### 3. Crear Período
```
POST /api/periodos
```

**Request Body**:
```json
{
  "tipo": "ordinario",
  "fecha_inicio": "2026-01-20",
  "fecha_fin": "2026-02-15",
  "descripcion": "Período ordinario de exámenes finales enero-junio 2026"
}
```

**Validaciones**:
- `tipo`: Debe ser "ordinario", "extraordinario" o "regularizacion"
- `fecha_inicio`: Requerida, formato YYYY-MM-DD
- `fecha_fin`: Requerida, formato YYYY-MM-DD, debe ser posterior a fecha_inicio
- `descripcion`: Opcional, máximo 500 caracteres
- No debe haber otro período activo o planificado

**Respuesta exitosa (201)**:
```json
{
  "id": 3,
  "tipo": "ordinario",
  "estado": "planificado",
  "fecha_inicio": "2026-01-20",
  "fecha_fin": "2026-02-15",
  "fecha_creacion": "2026-01-10T10:00:00Z",
  "descripcion": "Período ordinario de exámenes finales enero-junio 2026",
  "usuario_creador": "secretaria@escuela.edu",
  "modificaciones": []
}
```

**Error - Ya existe período activo (409)**:
```json
{
  "message": "Ya existe un período académico activo o planificado",
  "periodo_existente": {
    "id": 2,
    "estado": "activo"
  }
}
```

#### 4. Activar Período
```
POST /api/periodos/{id}/activar
```

**Validaciones**:
- El período debe existir
- El período debe estar en estado "planificado"
- No debe haber otro período activo
- La fecha actual debe estar dentro del rango del período (opcional)

**Respuesta exitosa (200)**:
```json
{
  "id": 3,
  "tipo": "ordinario",
  "estado": "activo",
  "fecha_inicio": "2026-01-20",
  "fecha_fin": "2026-02-15",
  "fecha_activacion": "2026-01-15T09:30:00Z",
  "descripcion": "Período ordinario de exámenes finales enero-junio 2026",
  "modificaciones": []
}
```

**Error - Período no encontrado (404)**:
```json
{
  "message": "Período académico no encontrado"
}
```

**Error - Estado inválido (400)**:
```json
{
  "message": "El período no está en estado planificado"
}
```

#### 5. Modificar Período por Emergencia
```
PUT /api/periodos/{id}/modificar
```

**Request Body**:
```json
{
  "tipo_emergencia": "desastre_natural",
  "motivo": "Sismo de magnitud 7.1 ocurrido el 25 de enero. Se extiende el período para permitir reposición de exámenes afectados.",
  "nueva_fecha_inicio": "2026-01-20",
  "nueva_fecha_fin": "2026-02-20"
}
```

**Campos**:
- `tipo_emergencia`: "desastre_natural", "contingencia_sanitaria", "situacion_social", "falla_tecnica", "otra"
- `motivo`: Requerido, mínimo 50 caracteres, máximo 1000
- `nueva_fecha_inicio`: Opcional, si se omite se mantiene la actual
- `nueva_fecha_fin`: Opcional, si se omite se mantiene la actual
- Al menos una de las fechas debe ser modificada

**Validaciones**:
- El período debe estar activo
- El motivo debe tener justificación suficiente
- Las nuevas fechas deben ser válidas
- Se requiere autorización especial (rol secretaria o admin)

**Respuesta exitosa (200)**:
```json
{
  "id": 3,
  "tipo": "ordinario",
  "estado": "modificado",
  "fecha_inicio": "2026-01-20",
  "fecha_fin": "2026-02-20",
  "descripcion": "Período ordinario de exámenes finales enero-junio 2026",
  "modificaciones": [
    {
      "id": 1,
      "fecha": "2026-01-25T14:00:00Z",
      "tipo_emergencia": "desastre_natural",
      "motivo": "Sismo de magnitud 7.1 ocurrido el 25 de enero...",
      "fecha_inicio_anterior": "2026-01-20",
      "fecha_fin_anterior": "2026-02-15",
      "fecha_inicio_nueva": "2026-01-20",
      "fecha_fin_nueva": "2026-02-20",
      "usuario": "secretaria@escuela.edu"
    }
  ]
}
```

**Error - Motivo insuficiente (400)**:
```json
{
  "message": "El motivo debe tener al menos 50 caracteres"
}
```

#### 6. Finalizar Período
```
POST /api/periodos/{id}/finalizar
```

**Validaciones**:
- El período debe existir
- El período debe estar activo o modificado
- Se requiere autorización (rol secretaria o admin)

**Respuesta exitosa (200)**:
```json
{
  "id": 3,
  "tipo": "ordinario",
  "estado": "finalizado",
  "fecha_inicio": "2026-01-20",
  "fecha_fin": "2026-02-20",
  "fecha_finalizacion": "2026-02-20T18:00:00Z",
  "descripcion": "Período ordinario de exámenes finales enero-junio 2026",
  "examenes_generados": 12,
  "modificaciones": [...]
}
```

#### 7. Validar Período Activo (Helper)
```
GET /api/periodos/validar
```

**Respuesta (200)**:
```json
{
  "hay_periodo_activo": true,
  "puede_generar_examenes": true,
  "periodo_id": 3
}
```

### Modelo de Datos Sugerido

```sql
-- Tabla de períodos académicos
CREATE TABLE periodos_academicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('ordinario', 'extraordinario', 'regularizacion') NOT NULL,
    estado ENUM('planificado', 'activo', 'modificado', 'finalizado') DEFAULT 'planificado',
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_activacion TIMESTAMP NULL,
    fecha_finalizacion TIMESTAMP NULL,
    descripcion VARCHAR(500),
    usuario_creador VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de modificaciones por emergencia
CREATE TABLE modificaciones_periodo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    periodo_id INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_emergencia ENUM('desastre_natural', 'contingencia_sanitaria', 'situacion_social', 'falla_tecnica', 'otra') NOT NULL,
    motivo TEXT NOT NULL,
    fecha_inicio_anterior DATE,
    fecha_fin_anterior DATE,
    fecha_inicio_nueva DATE,
    fecha_fin_nueva DATE,
    usuario VARCHAR(100) NOT NULL,
    FOREIGN KEY (periodo_id) REFERENCES periodos_academicos(id)
);

-- Índices
CREATE INDEX idx_periodo_estado ON periodos_academicos(estado);
CREATE INDEX idx_periodo_fechas ON periodos_academicos(fecha_inicio, fecha_fin);
CREATE INDEX idx_modificacion_periodo ON modificaciones_periodo(periodo_id);
```

## Flujos de Usuario

### Flujo 1: Crear e Iniciar Período Normal
1. Servicios Escolares accede a "Período Académico" desde el menú
2. Click en "Crear Nuevo Período"
3. Completa el formulario:
   - Tipo de período
   - Fecha de inicio
   - Fecha de fin
   - Descripción
4. Click en "Crear Período" → Estado: Planificado
5. Click en "Iniciar Período" → Confirma
6. El período cambia a estado "Activo"
7. Los Jefes de Carrera pueden ahora generar exámenes

### Flujo 2: Modificar Período por Emergencia
1. Servicios Escolares detecta una situación de emergencia
2. Accede al período activo
3. Click en "Modificar" (botón de advertencia)
4. Completa el formulario de emergencia:
   - Tipo de emergencia
   - Motivo detallado (mínimo 50 caracteres)
   - Nueva fecha de inicio/fin (según sea necesario)
5. Click en "Aplicar Modificación"
6. El sistema registra la modificación en el historial
7. El período continúa activo con las nuevas fechas

### Flujo 3: Jefe Intenta Generar sin Período Activo
1. Jefe de Carrera accede a "Generar"
2. El sistema valida si hay período activo
3. Si NO hay período activo:
   - Muestra alerta roja bloqueante
   - Deshabilita botones de generación
   - Muestra mensaje explicativo
4. Si hay período activo:
   - Muestra información del período
   - Habilita la generación de exámenes

## Consideraciones de Seguridad

1. **Autorización**: Solo usuarios con rol "secretaria" o "admin" pueden:
   - Crear períodos
   - Activar períodos
   - Modificar períodos
   - Finalizar períodos

2. **Validaciones Backend**: Todas las validaciones deben realizarse en el backend
   - No confiar en validaciones del frontend
   - Validar fechas lógicas
   - Verificar permisos en cada endpoint

3. **Auditoría**: Registrar todas las acciones:
   - Creación de períodos
   - Activaciones
   - Modificaciones (especialmente por emergencia)
   - Finalizaciones
   - Usuario que realizó cada acción

4. **Modificaciones por Emergencia**:
   - Requerir motivo detallado (mínimo 50 caracteres)
   - Registrar tipo de emergencia
   - Mantener historial completo
   - Notificar a administradores de cambios

## Notificaciones Sugeridas

1. **Al crear período**: Email a todos los Jefes de Carrera
2. **Al activar período**: Notificación push + email
3. **Al modificar por emergencia**: Alerta urgente a todos los usuarios
4. **Al finalizar período**: Notificación de cierre

## Métricas y Reportes

- Total de períodos creados por tipo
- Promedio de duración de períodos
- Número de modificaciones por emergencia
- Tipos de emergencia más frecuentes
- Exámenes generados por período
- Tiempo entre creación y activación de períodos

## Archivos Modificados

### Frontend
- `/src/screens/PeriodoAcademico.jsx` - Componente principal de gestión
- `/src/services/api.js` - Servicios API para períodos
- `/src/components/home/SecretariaHome.jsx` - Dashboard con acceso rápido
- `/src/components/home/JefeHome.jsx` - Validación de período activo
- `/src/screens/Generar.jsx` - Bloqueo si no hay período activo
- `/src/routes/Router.jsx` - Ruta `/periodo-academico`
- `/src/components/layout/sidebar/config/menus.jsx` - Menú de navegación

## Testing Recomendado

### Pruebas Unitarias
- Validación de fechas
- Cambios de estado
- Permisos de usuario

### Pruebas de Integración
- Creación → Activación → Generación de examen
- Modificación por emergencia
- Finalización de período

### Pruebas de Usuario
- Flujo completo de Servicios Escolares
- Flujo de Jefe con/sin período activo
- Manejo de errores y validaciones
