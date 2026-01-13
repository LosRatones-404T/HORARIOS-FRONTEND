# 🎯 Guía Rápida - Pantalla Usuarios

## Acceso

Solo el **usuario admin** puede acceder a `/usuarios`.

```
http://localhost:5173/usuarios
```

Si no es admin, será redirigido a `/home`.

---

## Interface Visual

```
┌──────────────────────────┬──────────────────────────────────────┐
│   LISTA DE USUARIOS      │   PANEL DE EDICIÓN                   │
│                          │                                      │
│ [🔍 Buscar...]          │ Editar: Juan García              [X] │
│ [Rol: Todos ▼]          │ ────────────────────────────────     │
│ [+ Nuevo Usuario]        │                                      │
│                          │ Nombre: [                        ]  │
│ ┌──────────────────────┐ │ Email:  [                        ]  │
│ │ Juan García          │ │ Rol:    [Jefe de Carrera    ▼]      │
│ │ juan@ejemplo.com     │ │                                      │
│ │ [Jefe] [Activo]      │ │ Estado: [Activo]                    │
│ └──────────────────────┘ │ Última: 2026-01-13                  │
│ (Click aquí)             │ ────────────────────────────────     │
│                          │                                      │
│ ┌──────────────────────┐ │ [📝 Guardar Cambios]                │
│ │ María López          │ │ [🔄 Restablecer Contraseña]        │
│ │ maria@ejemplo.com    │ │ [🗑️ Eliminar Usuario]              │
│ │ [Secret] [Activo]    │ │ [Cancelar]                         │
│ └──────────────────────┘ │                                      │
│                          │                                      │
│ ┌──────────────────────┐ │                                      │
│ │ Carlos Rodríguez     │ │                                      │
│ │ carlos@ejemplo.com   │ │                                      │
│ │ [Jefe] [Inactivo]    │ │                                      │
│ └──────────────────────┘ │                                      │
│                          │                                      │
│ ┌──────────────────────┐ │                                      │
│ │ Ana Martínez         │ │                                      │
│ │ ana@ejemplo.com      │ │                                      │
│ │ [Secret] [Activo]    │ │                                      │
│ └──────────────────────┘ │                                      │
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
```

---

## Cómo Usar

### 1️⃣ CREAR NUEVO USUARIO

```
PASO 1: Click en [+ Nuevo Usuario]
        ↓
        Panel derecho muestra formulario vacío

PASO 2: Completa los campos
        - Nombre: Juan García
        - Email: juan@ejemplo.com
        - Rol: Jefe de Carrera (dropdown)

PASO 3: Click en [Crear Usuario]
        ↓
        Espera 1.5 segundos (simulación)
        ↓
        Usuario aparece en lista izquierda
        Mensaje de éxito aparece arriba
        Panel se limpia

✅ Nuevo usuario creado
```

### 2️⃣ EDITAR USUARIO EXISTENTE

```
PASO 1: Click en un usuario en la lista izquierda
        ↓
        Panel derecho se llena con sus datos

PASO 2: Modifica los campos que necesites
        - Nombre, Email, Rol

PASO 3: Click en [Guardar Cambios]
        ↓
        Espera 1.5 segundos
        ↓
        Cambios se reflejan en la tarjeta
        Mensaje de éxito aparece

✅ Usuario actualizado
```

### 3️⃣ BUSCAR USUARIO

```
OPCIÓN A: Búsqueda por Nombre o Email
          Click en [🔍 Buscar...]
          Tipo: "juan"
          ↓
          Lista se filtra en tiempo real
          (Muestra solo coincidencias)

OPCIÓN B: Filtro por Rol
          Click en [Rol: Todos ▼]
          Selecciona: "Jefe de Carrera"
          ↓
          Lista muestra solo jefes
          Combina con búsqueda si ambas están activas

OPCIÓN C: Combinar Búsqueda + Filtro
          Busca "juan" + Filtra "Jefe"
          ↓
          Muestra jefes named "juan"
```

### 4️⃣ RESETEAR CONTRASEÑA

```
PASO 1: Selecciona usuario en lista
        ↓
        Panel derecho muestra sus datos

PASO 2: Click en [🔄 Restablecer Contraseña]
        ↓
        Dialog modal aparece

PASO 3: Ingresa contraseña temporal
        Ejemplo: "TempPass123!"

PASO 4: Click en [Restablecer]
        ↓
        Espera 1.5 segundos
        ↓
        Dialog se cierra
        Mensaje de éxito
        (Backend enviaría email con nueva contraseña)

✅ Contraseña restablecida
```

### 5️⃣ ELIMINAR USUARIO

```
PASO 1: Selecciona usuario en lista
        ↓
        Panel derecho muestra sus datos

PASO 2: Click en [🗑️ Eliminar Usuario]
        ↓
        Dialog de confirmación aparece
        "¿Estás seguro de eliminar a Juan García?
         Esta acción no se puede deshacer."

PASO 3: Click en [Eliminar Usuario]
        ↓
        Usuario desaparece de lista
        Panel se limpia
        Mensaje de éxito

✅ Usuario eliminado
```

---

## Estados Visuales

### Panel Vacío (Inicio)
```
Panel muestra:
"Selecciona un usuario o crea uno nuevo"
"Usa la lista de la izquierda para seleccionar 
 un usuario o haz clic en 'Nuevo Usuario'"
```

### Panel con Usuario (Editando)
```
Panel muestra:
- Título: "Editar: Juan García" 
  (o "Nuevo Usuario" si creando)
- Campos: Nombre, Email, Rol
- Botones: Guardar, Restablecer, Eliminar, Cancelar
- Info: Estado, Última Actividad (read-only)
```

### Mensaje de Éxito
```
Verde en la parte superior, desaparece en 5 segundos:
✓ Usuario Juan García creado exitosamente
```

### Cargando
```
Botón con spinner mientras guarda:
[⏳ Guardando...]
```

---

## Atajos Útiles

| Acción | Acceso |
|--------|--------|
| Crear nuevo | `[+ Nuevo Usuario]` o Busca usuario que no existe |
| Editar | Click en tarjeta de usuario |
| Buscar | Escribe en `[🔍 Buscar...]` |
| Filtrar por rol | Dropdown `[Rol: Todos ▼]` |
| Resetear contraseña | Usuario seleccionado → `[🔄]` |
| Eliminar | Usuario seleccionado → `[🗑️]` |
| Cerrar edición | Click `[X]` o botón `[Cancelar]` |

---

## Datos de Muestra

Cuando abres la pantalla por primera vez, hay 4 usuarios:

| Nombre | Email | Rol | Estado |
|--------|-------|-----|--------|
| Juan García | juan.garcia@ejemplo.com | Jefe | Activo |
| María López | maria.lopez@ejemplo.com | Secretaria | Activo |
| Carlos Rodríguez | carlos.rodriguez@ejemplo.com | Jefe | Inactivo |
| Ana Martínez | ana.martinez@ejemplo.com | Secretaria | Activo |

Puedes crear, editar, deletear, todo se refleja en vivo.

---

## Pantalla en Móvil

En pantallas pequeñas, el layout se apila:
- Arriba: Lista de usuarios
- Abajo: Panel de edición

O desaparece el panel si nada seleccionado.

```
┌─────────────────────────────────┐
│  Lista de Usuarios              │
├─────────────────────────────────┤
│ [Buscar] [Filtro] [+ Nuevo]    │
│                                 │
│ ┌──────────────────────────────┐│
│ │ Juan García                  ││
│ │ juan@ejemplo.com             ││
│ │ [Jefe] [Activo]              ││
│ └──────────────────────────────┘│
│                                 │
│ ┌──────────────────────────────┐│
│ │ María López                  ││
│ │ maria@ejemplo.com            ││
│ │ [Secret] [Activo]            ││
│ └──────────────────────────────┘│
└─────────────────────────────────┘
       ↓ Click usuario ↓
┌─────────────────────────────────┐
│  Editar: Juan García       [X]  │
├─────────────────────────────────┤
│ Nombre: [                    ]  │
│ Email:  [                    ]  │
│ Rol:    [Jefe            ▼]     │
│                                 │
│ [Guardar] [Restablecer] [Del]   │
│ [Cancelar]                      │
└─────────────────────────────────┘
```

---

## Validaciones

El formulario valida:
- ❌ **No permite guardar si Nombre está vacío**
- ❌ **No permite guardar si Email está vacío**
- ✅ Email debe tener formato válido (type="email")
- ✅ Rol siempre debe estar seleccionado

Si intenta guardar vacío:
```
alert("Por favor, completa todos los campos")
```

---

## Integración con Backend

Cuando conektes con tu API, reemplaza:

```jsx
// Cambiar esto:
await new Promise(resolve => setTimeout(resolve, 1500));

// Por esto:
const response = await fetch('/api/usuarios/crear', {
  method: 'POST',
  body: JSON.stringify(formData)
});
const nuevoUsuario = await response.json();
setUsuarios([...usuarios, nuevoUsuario]);
```

Todos los TODOs están en el código comentados.

---

## Problemas Comunes

### "Nada aparece en la lista"
- ✅ Normal si es primera vez
- ✅ Click `[+ Nuevo Usuario]` para crear primero

### "No veo el panel de edición"
- ✅ Click en un usuario en la lista izquierda
- ✅ O click `[+ Nuevo Usuario]`

### "El botón Guardar no funciona"
- ❌ Faltan campos requeridos (Nombre, Email)
- ❌ Revisar que ambos tengan contenido

### "Quiero limpiar la búsqueda"
- ✅ Click en `[Buscar]` y borra el texto
- ✅ Automáticamente se resetea

### "¿Dónde guarda los datos?"
- 📍 En memoria (useState), no persiste al refresh
- 📍 Cuando integres backend, se guardará en DB

---

## Tips & Tricks

1. **Búsqueda rápida**: Empieza a escribir, busca dinámicamente
2. **Filtro + Búsqueda**: Combínalos para filtrar más
3. **Enter después de cambio**: Los cambios se ven al guardar
4. **Click en X**: Cierra edición sin guardar
5. **Botón Cancelar**: También limpia el formulario
6. **Últimas búsquedas se mantienen**: Hasta que refresques la página

---

## Soporte

Si hay errores o comportamiento extraño:
1. Abre DevTools (F12)
2. Ve a Console
3. Busca errores en rojo
4. Reporta el error completo

Feliz administración de usuarios! 🎉
