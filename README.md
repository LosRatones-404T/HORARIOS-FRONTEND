# Horarios Frontend

Sistema de gestión de horarios - UNSIS

---

## Tema y Colores

Configuración en `src/theme/theme.jsx`. Soporta modo claro y oscuro.

### Modo Claro

| Token | main | light | dark |
|-------|------|-------|------|
| **primary** | `#4A83DD` | `#A6C3FC` | `#3E4E6C` |
| **secondary** | `#3E4E6C` | `#41495B` | `#2A3344` |
| **tertiary** | `#7B318F` | `#AF89B7` | `#5A2366` |
| **error** | `#9F0208` | `#D9010F` | `#7A0106` |

| Fondo | Color | Texto | Color |
|-------|-------|-------|-------|
| default | `#F0F0F7` | primary | `#2A3344` |
| paper | `#FFFFFF` | secondary | `#3E4E6C` |
| secondary | `#D3D4DB` | disabled | `#B8B8BF` |

### Modo Oscuro

| Token | main | light | dark |
|-------|------|-------|------|
| **primary** | `#A6C3FC` | `#C5DBFE` | `#4A83DD` |
| **secondary** | `#41495B` | `#565E70` | `#3E4E6C` |
| **tertiary** | `#AF89B7` | `#C9A8CF` | `#7B318F` |
| **error** | `#D9010F` | `#FF4D55` | `#9F0208` |

| Fondo | Color | Texto | Color |
|-------|-------|-------|-------|
| default | `#0A0E1A` | primary | `#FFFFFF` |
| paper | `#1A1E2E` | secondary | `#D3D4DB` |
| secondary | `#2A3344` | disabled | `#B8B8BF` |

---

## Componentes MUI

### `Box`
Contenedor genérico (como un `div`). Úsalo para layout y aplicar estilos con `sx`.

```jsx
<Box sx={{ display: 'flex', gap: 2, p: 2, bgcolor: 'background.default' }}>
  {children}
</Box>
```

### `Paper`
Superficie elevada con sombra. Úsalo para tarjetas, modales o secciones destacadas.

```jsx
<Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
  Contenido con sombra
</Paper>
```

### `Typography`
Texto con estilos tipográficos del tema. Úsalo para títulos, párrafos, labels.

```jsx
<Typography variant="h4" color="text.primary">Título</Typography>
<Typography variant="body1" color="text.secondary">Párrafo</Typography>
```

**Variantes disponibles:** `h1`-`h6`, `subtitle1`, `subtitle2`, `body1`, `body2`, `caption`

### `Button`
Botón con variantes predefinidas.

```jsx
<Button variant="contained" color="primary">Primario</Button>
<Button variant="outlined" color="secondary">Secundario</Button>
<Button variant="text">Texto</Button>
```

### `TextField`
Campo de entrada con estilos del tema.

```jsx
<TextField label="Email" variant="outlined" fullWidth />
```

### `Container`
Centra contenido con ancho máximo responsivo.

```jsx
<Container maxWidth="sm">{children}</Container>
```

**Valores disponibles:** `xs`, `sm`, `md`, `lg`, `xl`

---

## Parámetros en `sx`

Usa tokens del tema para consistencia:

```jsx
sx={{
  // Colores
  bgcolor: 'background.paper',
  color: 'text.primary',
  borderColor: 'divider',
  
  // Spacing (1 = 8px)
  p: 2,        // padding: 16px
  m: 1,        // margin: 8px
  gap: 2,      // gap: 16px
  
  // Border radius del tema
  borderRadius: 2,  // usa theme.shape.borderRadius * 2
  
  // Tipografía
  typography: 'body1',
}}
```

---

## Alternar Tema

```jsx
import { useTheme } from '../hooks/useTheme';

const { mode, toggleTheme } = useTheme();
// mode: 'light' | 'dark'
// toggleTheme(): alterna entre modos
```

---

## Iconos

Usa `react-icons`:

```jsx
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

<FaUser />
```

---
