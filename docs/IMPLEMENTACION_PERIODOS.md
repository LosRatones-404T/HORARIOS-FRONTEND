# Sistema de Gestión de Períodos Académicos

## Resumen de Implementación

Se ha implementado un sistema completo para que Servicios Escolares (Secretaría) pueda gestionar períodos académicos, controlando cuándo los Jefes de Carrera pueden generar exámenes.

## 🎯 Características Principales

### 1. **Gestión de Períodos**
- ✅ Crear períodos académicos (Ordinario, Extraordinario, Regularización)
- ✅ Activar períodos para habilitar generación de exámenes
- ✅ Finalizar períodos cuando concluyen
- ✅ Ver histórico de períodos anteriores

### 2. **Modificación por Emergencia**
- ✅ Modificar períodos activos solo en situaciones excepcionales
- ✅ Tipos de emergencia: Desastre natural, Contingencia sanitaria, Situación social, Falla técnica, Otra
- ✅ Requiere justificación detallada (mínimo 50 caracteres)
- ✅ Permite extender fechas, retrasar inicio, o modificar ambas
- ✅ Registro completo de todas las modificaciones

### 3. **Control de Acceso**
- ✅ Los Jefes de Carrera solo pueden generar exámenes con período activo
- ✅ Bloqueo automático de interfaz sin período activo
- ✅ Alertas visuales claras sobre el estado del período
- ✅ Información del período actual visible en todo momento

### 4. **Estados del Período**
- **Planificado**: Creado pero no activo
- **Activo**: En curso, permite generación de exámenes
- **Modificado**: Modificado por emergencia (sigue activo)
- **Finalizado**: Concluido, bloqueado para cambios

## 📁 Archivos Creados/Modificados

### Archivos Nuevos
1. **`/src/screens/PeriodoAcademico.jsx`**
   - Pantalla principal de gestión de períodos
   - Formularios de creación, activación y modificación
   - Vista de histórico de períodos
   - 700+ líneas de código completo

2. **`/docs/PERIODO_ACADEMICO.md`**
   - Documentación técnica completa
   - Especificación de API endpoints
   - Modelo de base de datos sugerido
   - Flujos de usuario detallados

### Archivos Modificados
1. **`/src/services/api.js`**
   - Nuevos servicios: `periodosApi`
   - 7 métodos para gestión de períodos
   - Manejo completo de errores

2. **`/src/components/home/SecretariaHome.jsx`**
   - Validación de período activo al cargar
   - Alertas sobre estado del período
   - Acceso rápido a gestión de períodos
   - Indicador visual de estado

3. **`/src/components/home/JefeHome.jsx`**
   - Validación de período antes de mostrar opciones
   - Alerta de bloqueo si no hay período activo
   - Información clara sobre restricciones

4. **`/src/screens/Generar.jsx`**
   - Validación de período activo
   - Bloqueo de generación sin período activo
   - Información del período actual
   - Deshabilitar botones según estado

5. **`/src/routes/Router.jsx`**
   - Nueva ruta: `/periodo-academico`
   - Accesible para rol secretaria

6. **`/src/components/layout/sidebar/config/menus.jsx`**
   - Nueva opción en menú de Secretaria
   - Ícono: MdSettings

## 🚀 Cómo Usar

### Para Servicios Escolares (Secretaria)

#### Crear y Activar Período
1. Ir a **"Período Académico"** en el menú lateral
2. Click en **"Crear Nuevo Período"**
3. Llenar formulario:
   - Tipo de período
   - Fecha de inicio
   - Fecha de fin
   - Descripción (opcional)
4. Click en **"Crear Período"** → Estado: Planificado
5. Click en **"Iniciar Período"** → Confirmar
6. ✅ Período activo, Jefes pueden generar exámenes

#### Modificar por Emergencia
1. En la vista de Período Académico
2. Click en **"Modificar"** (botón amarillo de advertencia)
3. Seleccionar tipo de emergencia
4. Escribir motivo detallado (mín. 50 caracteres)
5. Ajustar fechas según necesidad
6. Click en **"Aplicar Modificación"**
7. ⚠️ Modificación registrada en historial

#### Finalizar Período
1. Click en **"Finalizar"** en el período activo
2. Confirmar acción
3. ✅ Período finalizado, bloquea generación de nuevos exámenes

### Para Jefes de Carrera

#### Verificar Período Activo
1. En el **Dashboard (Home)**:
   - ✅ Verde = Puede generar exámenes
   - ❌ Rojo = No hay período activo

2. En **"Generar"**:
   - Si NO hay período: Alerta roja, botones deshabilitados
   - Si SÍ hay período: Info azul con fechas, todo habilitado

## 🔌 Integración con Backend

### Endpoints Necesarios

```
GET    /api/periodos/activo          # Obtener período activo
GET    /api/periodos/historico       # Histórico de períodos
POST   /api/periodos                 # Crear período
POST   /api/periodos/{id}/activar    # Activar período
PUT    /api/periodos/{id}/modificar  # Modificar por emergencia
POST   /api/periodos/{id}/finalizar  # Finalizar período
GET    /api/periodos/validar         # Validar si hay período activo
```

### Modelo de Datos
```sql
periodos_academicos
├── id
├── tipo (ordinario|extraordinario|regularizacion)
├── estado (planificado|activo|modificado|finalizado)
├── fecha_inicio
├── fecha_fin
├── fecha_creacion
├── fecha_activacion
├── fecha_finalizacion
├── descripcion
└── usuario_creador

modificaciones_periodo
├── id
├── periodo_id
├── fecha
├── tipo_emergencia
├── motivo
├── fecha_inicio_anterior/nueva
├── fecha_fin_anterior/nueva
└── usuario
```

Ver [PERIODO_ACADEMICO.md](docs/PERIODO_ACADEMICO.md) para detalles completos.

## 🔒 Seguridad y Validaciones

### Frontend
- ✅ Validación de fechas lógicas
- ✅ Deshabilitación de botones según permisos
- ✅ Confirmaciones para acciones críticas
- ✅ Motivos de emergencia con longitud mínima

### Backend (Requerido Implementar)
- 🔐 Verificar rol de usuario (secretaria/admin)
- 🔐 Validar que solo haya un período activo
- 🔐 Verificar fechas lógicas
- 🔐 Auditoría de todas las acciones
- 🔐 Validar longitud de motivos (min 50 chars)

## 📊 Flujo Completo

```
┌─────────────────────────────────────────────────────────────┐
│                   SERVICIOS ESCOLARES                        │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
              ┌─────────────────────────┐
              │  Crear Período          │
              │  Estado: PLANIFICADO    │
              └─────────────────────────┘
                           │
                           ↓
              ┌─────────────────────────┐
              │  Iniciar Período        │
              │  Estado: ACTIVO         │ ←── Solo si hay emergencia
              └─────────────────────────┘     se puede modificar
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              JEFES DE CARRERA PUEDEN GENERAR                 │
│                    EXÁMENES                                  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
              ┌─────────────────────────┐
              │  Finalizar Período      │
              │  Estado: FINALIZADO     │
              └─────────────────────────┘
```

## 🎨 Capturas de Funcionalidades

### Pantalla Principal
- ✅ Card del período actual con toda la información
- ✅ Botones contextuales según estado
- ✅ Histórico de períodos en grid
- ✅ Alertas de modificaciones por emergencia

### Diálogos
- ✅ Crear período: Formulario completo con validaciones
- ✅ Confirmar inicio: Advertencia sobre bloqueo posterior
- ✅ Modificar emergencia: Justificación requerida
- ✅ Todas las acciones con feedback visual

### Dashboard Secretaria
- ✅ Indicador de estado del período
- ✅ Acceso rápido a gestión
- ✅ Alertas si no hay período o está planificado

### Dashboard Jefe
- ✅ Bloqueo visual si no hay período
- ✅ Mensaje explicativo claro
- ✅ Información del período activo

## 📝 Próximos Pasos

### Backend
1. Implementar endpoints especificados
2. Crear modelo de base de datos
3. Agregar validaciones de seguridad
4. Implementar sistema de auditoría
5. Configurar notificaciones

### Frontend (Opcional)
1. Agregar notificaciones push cuando cambia el período
2. Implementar búsqueda/filtros en histórico
3. Agregar exportación de reportes
4. Implementar calendario visual de períodos
5. Dashboard de estadísticas de períodos

## 🐛 Testing Sugerido

1. **Crear período** sin período existente
2. **Crear período** con período ya existente (debe fallar)
3. **Activar período** planificado
4. **Generar examen** con período activo
5. **Intentar generar** sin período activo (debe bloquearse)
6. **Modificar período** por emergencia
7. **Finalizar período** activo
8. **Ver histórico** de períodos

## 💡 Notas Importantes

- El sistema está diseñado para **un solo período activo a la vez**
- Las modificaciones por emergencia **requieren justificación detallada**
- Una vez activo, el período **no se puede modificar fácilmente**
- Los Jefes **no pueden** gestionar períodos, solo consultar
- Toda acción crítica **requiere confirmación**
- Se mantiene **historial completo** de modificaciones

## 📞 Soporte

Para preguntas sobre la implementación, consultar:
- Documentación técnica: `/docs/PERIODO_ACADEMICO.md`
- Código fuente: `/src/screens/PeriodoAcademico.jsx`
- Servicios API: `/src/services/api.js`
