# Componentes MUI

Guía de referencia rápida para componentes de Material-UI utilizados en el proyecto.

## Box
Contenedor genérico (como un `div`). Úsalo para layout y aplicar estilos con `sx`.

```jsx
<Box sx={{ display: 'flex', gap: 2, p: 2, bgcolor: 'background.default' }}>
  {children}
</Box>
```

**Props comunes:**
- `sx` - Estilos personalizados
- `component` - Elemento HTML a renderizar (default: 'div')

---

## Paper
Superficie elevada con sombra. Úsalo para tarjetas, modales o secciones destacadas.

```jsx
<Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
  Contenido con sombra
</Paper>
```

**Props:**
- `elevation` - Nivel de elevación (0-24)
- `variant` - 'elevation' | 'outlined'

---

## Typography
Texto con estilos tipográficos del tema. Úsalo para títulos, párrafos, labels.

```jsx
<Typography variant="h4" color="text.primary">Título</Typography>
<Typography variant="body1" color="text.secondary">Párrafo</Typography>
```

**Variantes disponibles:**
- Encabezados: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- Subtítulos: `subtitle1`, `subtitle2`
- Cuerpo: `body1`, `body2`
- Otros: `caption`, `overline`, `button`

---

## Button
Botón con variantes predefinidas.

```jsx
<Button variant="contained" color="primary">Primario</Button>
<Button variant="outlined" color="secondary">Secundario</Button>
<Button variant="text">Texto</Button>
```

**Props:**
- `variant` - 'contained' | 'outlined' | 'text'
- `color` - 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
- `size` - 'small' | 'medium' | 'large'
- `startIcon` / `endIcon` - Íconos

---

## TextField
Campo de entrada con estilos del tema.

```jsx
<TextField 
  label="Email" 
  variant="outlined" 
  fullWidth 
  error={hasError}
  helperText="Mensaje de ayuda"
/>
```

**Props:**
- `variant` - 'outlined' | 'filled' | 'standard'
- `type` - 'text' | 'password' | 'email' | 'number'
- `multiline` - Para textarea
- `rows` - Número de filas si es multiline

---

## Container
Centra contenido con ancho máximo responsivo.

```jsx
<Container maxWidth="lg">{children}</Container>
```

**Valores maxWidth:**
- `xs` - 444px
- `sm` - 600px
- `md` - 960px
- `lg` - 1280px
- `xl` - 1920px

---

## Grid
Sistema de cuadrícula responsivo (12 columnas).

```jsx
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} md={4}>
    Contenido
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    Contenido
  </Grid>
</Grid>
```

**Props de Container:**
- `spacing` - Espacio entre items (0-10)
- `direction` - 'row' | 'column'
- `justifyContent` - Alineación horizontal
- `alignItems` - Alineación vertical

**Props de Item:**
- `xs`, `sm`, `md`, `lg`, `xl` - Columnas que ocupa (1-12)

---

## Card
Contenedor para contenido agrupado.

```jsx
<Card elevation={2}>
  <CardContent>
    <Typography variant="h5">Título</Typography>
    <Typography variant="body2">Contenido</Typography>
  </CardContent>
  <CardActions>
    <Button>Acción</Button>
  </CardActions>
</Card>
```

**Subcomponentes:**
- `CardHeader` - Encabezado con título y avatar
- `CardMedia` - Imagen o video
- `CardContent` - Contenido principal
- `CardActions` - Acciones/botones

---

## Alert
Mensajes de retroalimentación.

```jsx
<Alert severity="success">
  <AlertTitle>Éxito</AlertTitle>
  Operación completada correctamente
</Alert>
```

**Severities:**
- `success` - Verde
- `info` - Azul
- `warning` - Naranja
- `error` - Rojo

---

## Menu
Menú desplegable contextual.

```jsx
const [anchorEl, setAnchorEl] = useState(null);

<IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
  <MenuIcon />
</IconButton>

<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={() => setAnchorEl(null)}
>
  <MenuItem onClick={handleAction1}>Opción 1</MenuItem>
  <MenuItem onClick={handleAction2}>Opción 2</MenuItem>
</Menu>
```

---

## Dialog
Modal/diálogo.

```jsx
<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Título del Diálogo</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Contenido del diálogo
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancelar</Button>
    <Button onClick={handleConfirm} variant="contained">Confirmar</Button>
  </DialogActions>
</Dialog>
```

---

## Chip
Etiqueta compacta.

```jsx
<Chip 
  label="Aprobado" 
  color="success" 
  size="small"
  onDelete={handleDelete}
  icon={<CheckIcon />}
/>
```

---

## Badge
Indicador de notificaciones.

```jsx
<Badge badgeContent={4} color="error">
  <NotificationsIcon />
</Badge>
```

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
  px: 2,       // paddingX: horizontal
  py: 1,       // paddingY: vertical
  
  // Border
  borderRadius: 2,
  border: '1px solid',
  
  // Layout
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  
  // Tipografía
  fontWeight: 600,
  fontSize: '1.2rem',
  typography: 'body1',
  
  // Responsive
  width: { xs: '100%', md: '50%' },
}}
```
