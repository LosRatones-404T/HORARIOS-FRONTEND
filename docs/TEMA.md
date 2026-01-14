# Configuración de Tema

Sistema de theming con soporte para modo claro y oscuro usando Material-UI.

## Ubicación
`src/theme/theme.jsx`

## Uso

```jsx
import { useTheme } from '@mui/material';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default,
      color: theme.palette.text.primary 
    }}>
      Contenido
    </Box>
  );
};
```

## Alternar Tema

```jsx
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  
  return (
    <IconButton onClick={toggleTheme}>
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
```

## Paleta de Colores

### Modo Claro

| Token | main | light | dark | Uso |
|-------|------|-------|------|-----|
| **primary** | `#4A83DD` | `#A6C3FC` | `#3E4E6C` | Elementos principales, botones primarios |
| **secondary** | `#3E4E6C` | `#41495B` | `#2A3344` | Botones secundarios, acentos |
| **tertiary** | `#7B318F` | `#AF89B7` | `#5A2366` | Elementos especiales |
| **accent** | `#DFBCE2` | `#E8C5EB` | `#C9A8CF` | Destacados, chips |
| **error** | `#9F0208` | `#D9010F` | `#7A0106` | Errores, alertas negativas |
| **warning** | `#ED6C02` | - | - | Advertencias |
| **info** | `#0288D1` | - | - | Información |
| **success** | `#2E7D32` | - | - | Éxitos, confirmaciones |

**Fondos (Backgrounds):**

| Token | Color | Uso |
|-------|-------|-----|
| default | `#F0F0F7` | Fondo principal de la app |
| paper | `#FFFFFF` | Cards, modales, superficies elevadas |
| secondary | `#D3D4DB` | Fondos secundarios |

**Textos:**

| Token | Color | Uso |
|-------|-------|-----|
| primary | `#2A3344` | Texto principal |
| secondary | `#3E4E6C` | Texto secundario, descripciones |
| disabled | `#B8B8BF` | Texto deshabilitado |

---

### Modo Oscuro

| Token | main | light | dark | Uso |
|-------|------|-------|------|-----|
| **primary** | `#A6C3FC` | `#C5DBFE` | `#4A83DD` | Elementos principales, botones primarios |
| **secondary** | `#41495B` | `#565E70` | `#3E4E6C` | Botones secundarios, acentos |
| **tertiary** | `#AF89B7` | `#C9A8CF` | `#7B318F` | Elementos especiales |
| **accent** | `#DFBCE2` | `#E8C5EB` | `#C9A8CF` | Destacados, chips |
| **error** | `#D9010F` | `#FF4D55` | `#9F0208` | Errores, alertas negativas |
| **warning** | `#FF9800` | - | - | Advertencias |
| **info** | `#29B6F6` | - | - | Información |
| **success** | `#66BB6A` | - | - | Éxitos, confirmaciones |

**Fondos (Backgrounds):**

| Token | Color | Uso |
|-------|-------|-----|
| default | `#0A0E1A` | Fondo principal de la app |
| paper | `#1A1E2E` | Cards, modales, superficies elevadas |
| secondary | `#2A3344` | Fondos secundarios |

**Textos:**

| Token | Color | Uso |
|-------|-------|-----|
| primary | `#FFFFFF` | Texto principal |
| secondary | `#D3D4DB` | Texto secundario, descripciones |
| disabled | `#B8B8BF` | Texto deshabilitado |

---

## Uso de Tokens en Código

### Colores del Tema

```jsx
sx={{
  // Colores principales
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  
  // Fondos
  bgcolor: 'background.default',
  bgcolor: 'background.paper',
  
  // Textos
  color: 'text.primary',
  color: 'text.secondary',
  color: 'text.disabled',
  
  // Bordes
  borderColor: 'divider',
  
  // Estados
  bgcolor: 'error.main',
  bgcolor: 'warning.main',
  bgcolor: 'success.main',
  bgcolor: 'info.main',
}}
```

### Condicionales por Modo

```jsx
sx={{
  bgcolor: theme.palette.mode === 'light' 
    ? '#FFFFFF' 
    : '#1A1E2E',
  
  color: theme.palette.mode === 'dark' 
    ? theme.palette.text.primary 
    : '#2A3344',
}}
```

---

## Componente ThemeToggle

Ya está integrado en el Header. Ubicación: `src/components/ThemeToggle.jsx`

```jsx
import ThemeToggle from '../components/ThemeToggle';

<ThemeToggle />
```

---

## Breakpoints Responsivos

Material-UI usa estos breakpoints por defecto:

| Breakpoint | Ancho mínimo | Uso |
|------------|--------------|-----|
| xs | 0px | Extra small (móvil) |
| sm | 600px | Small (tablet portrait) |
| md | 900px | Medium (tablet landscape) |
| lg | 1200px | Large (desktop) |
| xl | 1536px | Extra large (pantallas grandes) |

### Uso en sx

```jsx
sx={{
  width: { xs: '100%', sm: '80%', md: '60%' },
  fontSize: { xs: '0.875rem', md: '1rem' },
  p: { xs: 2, md: 4 },
}}
```

---

## Spacing System

Material-UI usa un sistema de spacing donde 1 unidad = 8px:

```jsx
sx={{
  p: 1,    // padding: 8px
  p: 2,    // padding: 16px
  p: 3,    // padding: 24px
  
  // Específicos
  px: 2,   // paddingX: 16px (left + right)
  py: 1,   // paddingY: 8px (top + bottom)
  pt: 2,   // paddingTop: 16px
  
  // Margin igual
  m: 2,    // margin: 16px
  mx: 3,   // marginX: 24px
  
  // Gap
  gap: 2,  // gap: 16px
}}
```

---

## Typography Variants

Configuradas en el tema:

| Variant | Tamaño | Peso | Uso |
|---------|--------|------|-----|
| h1 | 3rem | 700 | Títulos principales |
| h2 | 2.5rem | 700 | Subtítulos grandes |
| h3 | 2rem | 700 | Títulos de sección |
| h4 | 1.75rem | 700 | Subtítulos medianos |
| h5 | 1.5rem | 600 | Títulos pequeños |
| h6 | 1.25rem | 600 | Subtítulos pequeños |
| subtitle1 | 1rem | 600 | Subtítulos |
| subtitle2 | 0.875rem | 600 | Subtítulos pequeños |
| body1 | 1rem | 400 | Texto normal |
| body2 | 0.875rem | 400 | Texto secundario |
| caption | 0.75rem | 400 | Texto muy pequeño |

---

## Border Radius

Configurado en `theme.shape.borderRadius = 8`

```jsx
sx={{
  borderRadius: 1,  // 8px
  borderRadius: 2,  // 16px
  borderRadius: 3,  // 24px
}}
```

---

## Shadows

Material-UI incluye 25 niveles de sombra (0-24):

```jsx
<Paper elevation={0}>   {/* Sin sombra */}
<Paper elevation={1}>   {/* Sombra muy ligera */}
<Paper elevation={3}>   {/* Sombra media */}
<Paper elevation={8}>   {/* Sombra pronunciada */}
```

Para sombras personalizadas:

```jsx
sx={{
  boxShadow: 1,  // theme.shadows[1]
  boxShadow: 3,  // theme.shadows[3]
}}
```
