# Exportación de Calendarios a PDF

## Descripción

Se implementó la funcionalidad de exportación de calendarios de exámenes a PDF para los roles de **Jefe de Carrera** y **Servicios Escolares (Secretaria)**.

## Características Implementadas

### Para Jefe de Carrera

**Botón Simple de Exportación**
- ✅ Un solo botón "Exportar PDF" en la esquina superior derecha
- ✅ Exporta el calendario completo de su carrera (Lic. en Informática)
- ✅ Incluye todos los semestres con sus horarios
- ✅ Formato profesional en orientación horizontal (landscape)
- ✅ Nombre del archivo: `Calendario_Lic._en_Informática_[TipoExamen].pdf`

### Para Servicios Escolares (Secretaria)

**Dos Opciones de Exportación**

1. **Exportar Carrera Actual**
   - ✅ Botón principal "Exportar Carrera Actual"
   - ✅ Exporta solo la carrera que está visualizando actualmente
   - ✅ Útil para reportes individuales por carrera

2. **Exportar Todas las Carreras**
   - ✅ Opción en menú desplegable
   - ✅ Genera un PDF consolidado con TODAS las carreras
   - ✅ Cada carrera en páginas separadas
   - ✅ Útil para reportes institucionales completos
   - ✅ Nombre del archivo: `Calendario_General_[TipoExamen].pdf`

## Contenido de los PDFs

### Información Incluida
- ✅ Título: "Calendario de Exámenes"
- ✅ Nombre de la carrera
- ✅ Tipo de examen (Parcial 1, Ordinario, etc.)
- ✅ Período académico
- ✅ Fecha y hora de generación
- ✅ Paginación automática

### Por Cada Semestre
- ✅ Nombre del semestre (ej: "PRIMER SEMESTRE")
- ✅ Tabla con horarios:
  - Día de la semana
  - Hora del examen
  - Nombre de la materia
  - Aula asignada

### Características del Formato
- ✅ Orientación horizontal para mejor visualización
- ✅ Encabezados con color institucional
- ✅ Tablas con líneas alternas para mejor lectura
- ✅ Número de página en pie de página
- ✅ Saltos de página automáticos cuando es necesario

## Ubicación en la Interfaz

### Jefe de Carrera
```
Pantalla: Calendario
Ubicación: Esquina superior derecha
Botón: "Exportar PDF" (con ícono de descarga)
```

### Secretaria/Servicios Escolares
```
Pantalla: Calendario
Ubicación: Esquina superior derecha
Componente: ButtonGroup con dos opciones

Botón Principal: "Exportar Carrera Actual"
Menú Desplegable:
  - Exportar Carrera Actual (muestra nombre de carrera)
  - Exportar Todas las Carreras (genera PDF consolidado)
```

## Archivos Creados/Modificados

### Nuevos Archivos
1. **`/src/utils/pdfExport.js`**
   - Funciones de exportación a PDF
   - `exportarCalendarioCarrera()` - Exporta una carrera
   - `exportarTodasLasCarreras()` - Exporta todas las carreras

### Archivos Modificados
1. **`/src/screens/Calendario.jsx`**
   - Agregados botones de exportación
   - Agregado menú desplegable para secretaria
   - Agregadas funciones de manejo de exportación
   - Diferenciación por rol (jefe vs secretaria)

### Dependencias Instaladas
- ✅ `jspdf` - Librería para generar PDFs
- ✅ `jspdf-autotable` - Plugin para tablas en PDFs

## Uso

### Como Jefe de Carrera
1. Ir a **"Calendario"** en el menú
2. Seleccionar el tipo de examen (Parcial 1, Ordinario, etc.)
3. Click en **"Exportar PDF"**
4. El PDF se descarga automáticamente

### Como Secretaria
1. Ir a **"Calendario"** en el menú
2. Seleccionar el tipo de examen
3. Seleccionar la carrera (si solo quieres una)
4. **Opción 1**: Click en "Exportar Carrera Actual" para descargar solo esa carrera
5. **Opción 2**: Click en el menú desplegable → "Exportar Todas las Carreras" para un PDF consolidado

## Ejemplo de Nombres de Archivos Generados

```
Calendario_Lic._en_Informática_Parcial_1.pdf
Calendario_Ing._en_Sistemas_Computacionales_Ordinario.pdf
Calendario_General_Extraordinario_1.pdf (todas las carreras)
```

## Características Técnicas

### Formato del PDF
- Tamaño: A4 Landscape
- Fuente: Helvetica
- Color primario: #3F51B5 (Material-UI Primary)
- Márgenes: 14mm izquierda/derecha

### Optimizaciones
- Saltos de página automáticos
- Agrupación de eventos por día
- Ordenamiento por hora
- Manejo de semestres sin horarios
- Paginación dinámica

### Validaciones
- Verifica que haya datos para exportar
- Muestra notificaciones de éxito
- Maneja errores silenciosamente

## Futuras Mejoras Sugeridas

1. **Filtros adicionales**
   - Por rango de fechas
   - Por aulas específicas
   - Por semestre individual

2. **Personalización**
   - Logo institucional en el header
   - Colores personalizables
   - Opciones de orientación (vertical/horizontal)

3. **Formatos adicionales**
   - Exportar a Excel (.xlsx)
   - Exportar a CSV
   - Enviar por email

4. **Estadísticas**
   - Total de exámenes
   - Distribución por días
   - Aulas más utilizadas

## Notas Técnicas

- Los datos actualmente son **mock data** de ejemplo
- En producción, los datos vendrían del backend
- La exportación se hace completamente en el cliente (navegador)
- No requiere conexión a servidor para generar PDFs
- Compatible con todos los navegadores modernos

## Testing Sugerido

1. Exportar como Jefe con diferentes tipos de examen
2. Exportar como Secretaria - carrera individual
3. Exportar como Secretaria - todas las carreras
4. Verificar formato en diferentes tipos de examen
5. Verificar paginación con muchos semestres
6. Verificar visualización en diferentes visores PDF
