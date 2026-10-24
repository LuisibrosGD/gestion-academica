# Design System — Gestión Académica

> Guía visual construida a partir de 8 referencias de Figma Community.
> Objetivo: mantener una sola línea visual para `FormularioEstudiante`, `TarjetaEstudiante`
> y `ListaEstudiantes`.

---

## 1. Dirección visual

**Estilo:** SaaS académico / admin panel limpio ("clean dashboard").
Fondo gris azulado muy claro, superficies blancas con borde de 1px, sombras casi invisibles,
tipografía sans geométrica y color usado **solo** para estado o acción.

**Principios**

1. **Jerarquía por peso, no por color.** Títulos 700, cuerpo 400, secundarios 500 en gris.
2. **Un solo primario por pantalla.** Si el botón principal es azul, el resto es neutro.
3. **Densidad media.** Filas de tabla 56–64px, tarjetas con 20–24px de padding.
4. **Bordes redondeados consistentes:** 8 / 12 / 16 / 999.
5. **Iconos de línea dentro de "tiles" con tinte suave** (nunca iconos sueltos a color).
6. **Nada de sombras fuertes.** La separación se logra con borde + fondo.

---

## 2. Paleta de color

| Token | Hex | Uso |
|---|---|---|
| `--bg-app` | `#F5F7FB` | Fondo general de la app |
| `--surface` | `#FFFFFF` | Tarjetas, tablas, sidebar |
| `--surface-muted` | `#F8FAFC` | Header de tabla, hover de fila, inputs de búsqueda |
| `--border` | `#E5E9F0` | Borde de tarjetas y divisores |
| `--border-strong` | `#CBD5E1` | Borde de inputs y botones secundarios |
| `--text` | `#0F172A` | Títulos y valores |
| `--text-secondary` | `#64748B` | Descripciones, labels de formulario |
| `--text-tertiary` | `#94A3B8` | Placeholders, metadatos, group labels |
| `--primary` | `#2563EB` | CTA principal, item activo, foco |
| `--primary-hover` | `#1D4ED8` | Hover del primario |
| `--primary-soft` | `#EFF4FF` | Fondo de pills/badges informativos |
| `--accent` | `#E11D48` | Acción destructiva, "Live", alerta |
| `--accent-soft` | `#FFE4E9` | Fondo de pill de alerta |
| `--success` | `#16A34A` | Asistencia / delta positivo |
| `--success-soft` | `#DCFCE7` | Pill de estado aprobado |
| `--warning` | `#F59E0B` | Delta neutro / advertencia |
| `--purple` | `#7C3AED` | Categorías / carrera |
| `--purple-soft` | `#F3E8FF` | Fondo de categoría |
| `--ink` | `#0B0F19` | Botón negro alternativo (CTA de tarjeta) |

**Regla de uso:** máximo **2 colores de acento** visibles en la misma vista (ej. azul primario + verde de éxito).

---

## 3. Tipografía

**Familia:** `Inter` (fallback `Manrope`, `system-ui`).
Cargar pesos **400 / 500 / 600 / 700**. Tracking ligeramente negativo en títulos grandes.

| Rol | Size | Weight | Line-height | Color |
|---|---|---|---|---|
| Display (saludo / título de página) | 28–30px | 700 | 1.2 | `--text` |
| Título de sección | 18–20px | 700 | 1.3 | `--text` |
| Título de tarjeta | 16px | 700 | 1.4 | `--text` |
| Cuerpo / celda de tabla | 14px | 400–500 | 1.5 | `--text` |
| Metadato / descripción | 13px | 400 | 1.5 | `--text-secondary` |
| Label de KPI / th de tabla | 11–12px | 600 | 1.4 | `--text-tertiary` |
| Pill / badge | 12px | 600 | 1 | según estado |

**Detalles que sí valen la pena**

- `letter-spacing: .04em` + `text-transform: uppercase` en labels de sección y encabezados de tabla.
- Números grandes en KPI con `font-variant-numeric: tabular-nums`.
- Subtítulo bajo el saludo tipo `CS2021089 · Semestre 6 · Hub académico` en 13px gris.

---

## 4. Espaciado, radios y sombras

```css
--space-1: 4px;  --space-2: 8px;  --space-3: 12px;
--space-4: 16px; --space-5: 20px; --space-6: 24px; --space-8: 32px;

--radius-sm: 8px;    /* inputs, botones */
--radius-md: 12px;   /* sub-tarjetas, icon tiles */
--radius-lg: 16px;   /* tarjetas y paneles */
--radius-pill: 999px;

--shadow-xs: 0 1px 2px rgba(15,23,42,.04);
--shadow-sm: 0 4px 16px rgba(15,23,42,.06);
--shadow-md: 0 12px 32px rgba(15,23,42,.10);
```

- Sidebar `260px`, topbar `64px`, contenido con `max-width: 1280px` y padding `24–32px`.
- Gap de grillas: `20–24px`.

---

## 5. Componentes base

### Botones

| Variante | Fondo | Texto | Borde | Uso |
|---|---|---|---|---|
| Primary | `--primary` | `#FFF` | — | Acción principal de la vista |
| Secondary | `#FFF` | `--text` | `--border-strong` | Acciones alternas (Subir XLS) |
| Ink | `--ink` | `#FFF` | — | CTA dentro de tarjeta (View Materials) |
| Ghost | transparente | `--text-secondary` | — | Acciones de fila |
| Danger | transparente | `--accent` | — | Eliminar / Reiniciar filtro |

Altura `40px` (sm `32`, lg `44`), padding `0 16px`, radio `8px`, fuente `14/600`.
Icono opcional de 16px separado `8px`.

### Pills / Badges

Altura `24px`, padding `0 10px`, radio `999px`, `12/600`, icono 14px.
Fondo *soft* + texto del mismo tono: azul (info), verde (ok), violeta (categoría), rojo (alerta).

Ejemplos: `5 subjects this semester`, `2 modules`, `150 agencias`, `Live`, `Aprobado`.

### Inputs y selects

Altura `42px`, radio `8px`, borde `--border-strong`, padding `0 14px`, fondo `#FFF`.
Label `13/600` arriba con `*` en `--accent` si es obligatorio. Placeholder `--text-tertiary`.
Foco: borde `--primary` + `box-shadow: 0 0 0 3px rgba(37,99,235,.15)`.
Error: borde `--accent` + helper text `12px` rojo.

### Barra de progreso

Alto `8px`, track `#E9EEF5`, radio `999px`, fill `--ink` o `--primary`.
Label del % a la derecha en `13/700`; debajo dos textos `11–12px` gris (`23 clases asistidas` / `28 totales`).

### Icon tile

`40x40`, radio `12px`, fondo tintado al 10–12%, icono de línea `20px` del mismo tono.
Tintes usados: azul `#EFF4FF`, violeta `#F3E8FF`, naranja `#FFF4E5`, verde `#E7F8EE`.

### Avatar

`32px` (topbar) / `44px` (tarjeta) / `72px` (perfil).
Círculo con iniciales sobre color derivado del nombre, o foto con anillo de 3px `--primary-soft`.

### Tabla

- Contenedor: tarjeta blanca radio 16, `overflow: hidden`.
- Header: fondo `--surface-muted` (o `--primary` con texto blanco si quieres una versión más "admin"), `th 11–12/600 uppercase`, altura 44.
- Filas: 56–64px, divisor `#EEF2F7`, hover `--surface-muted`.
- Acciones a la derecha: 2 iconos 18px (editar azul, eliminar rojo), sin borde.
- Contador junto al título: pill azul soft (`13 estudiantes`).

### Paginación

Botones `36x36` radio `8`, borde `--border`; activo fondo `--primary` texto blanco.
`Anterior` / `Siguiente` como botones outline con icono de flecha, separados en los extremos.

---

## 6. Patrones de layout

```
┌──────────┬──────────────────────────────────────────────┐
│          │ Topbar: buscador · notif · avatar            │
│ Sidebar  ├──────────────────────────────────────────────┤
│  260px   │ Page header: título + subtítulo | acciones   │
│          ├──────────────────────────────────────────────┤
│  grupos  │ KPI row (3–4 tarjetas)                       │
│  activo  │                                              │
│  azul    │ Filtros + contador                           │
│          │ Tabla / Grid de tarjetas                     │
│  logout  │ Paginación                                   │
└──────────┴──────────────────────────────────────────────┘
```

**Sidebar**
Logo arriba, luego grupos con label `11/600 uppercase` gris (`GESTIÓN`, `ACADÉMICO`).
Ítem `40px`, radio `8`, icono 18px + label `14/500`.
Activo: fondo `--primary` + texto blanco **o** fondo `--primary-soft` + texto primario + barra izquierda de 3px.
`Logout` anclado al fondo con divisor superior.

**Topbar**
Buscador `320px` con icono lupa, fondo `--surface-muted`, radio `10`.
A la derecha: campana con dot de notificación, avatar `32` + nombre `13/600` + rol `11` gris.

**Page header**
Título `26–28/700` + subtítulo `13` gris a la izquierda; botones a la derecha
(secundario "Exportar" + primario "Añadir estudiante").

**KPI row** (4 columnas, `gap: 20px`)
Label `12/500` gris → valor `26–28/700` → delta `12/600` con flecha (verde ↑ / rojo ↓) → icon tile a la derecha.

**Formulario por secciones**
Breadcrumb → título → bloques separados por hairline con subtítulo `14/700`
(`Identificación`, `Datos académicos`, `Contacto`), label + input en columna,
grilla de 2 columnas en desktop, 1 en móvil. Acciones al final alineadas a la derecha
(`Cancelar` ghost + `Guardar` primary).

**Panel lateral de perfil** (opcional)
Avatar centrado, nombre `16/700`, ID gris, luego pares clave-valor con label `11 uppercase` y valor `13/600`.

---

## 7. Especificación de los 3 componentes del trabajo

### `FormularioEstudiante`
- Tarjeta blanca radio 16, padding 24, borde `--border`, `shadow-xs`, `max-width: 720px`.
- Título `Nuevo estudiante` (16/700) + subtítulo 13 gris.
- Campos: **Nombre completo** (input, requerido) y **Carrera** (select, requerido).
- Grilla 2 columnas (desktop) / 1 (móvil), gap 16.
- Botón full-width en móvil, alineado a la derecha en desktop: `Agregar estudiante` (primary).
- Estado de error inline bajo el campo (`12px`, `--accent`), sin `alert()`.
- Al enviar: limpiar campos, devolver foco al primer input.

### `TarjetaEstudiante`
- Radio 16, borde 1px, padding 20, hover con `shadow-sm` + `translateY(-2px)` (`150ms`).
- Header: avatar con iniciales `44px` + nombre `16/700` + código/ID `12` gris.
- Badge de carrera arriba a la derecha en violeta soft (pill).
- 2 filas de metadatos con icono 16px (correo / fecha de registro / estado).
- Separador + fila de estado: pill verde `Activo` o rojo `Inactivo`.
- Footer: acciones ghost (editar / eliminar) alineadas a la derecha.
- Recibe **todo por props**: `estudiante`, `onEliminar`, `onEditar`. Sin estado propio.

### `ListaEstudiantes`
- Header de sección: título `Estudiantes` + pill contador (`N registros`) + acciones.
- **Variante A (grid):** `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`, gap 20.
- **Variante B (tabla):** columnas `#`, Nombre, Carrera (pill), Registro, Acciones; header `--surface-muted`.
- Fila/índice con badge circular tipo "A" (verde) para el estado.
- Estado vacío: icono 48 gris, `Aún no hay estudiantes`, subtítulo 13 gris, CTA que enfoca el formulario.
- `key={estudiante.id}` siempre; el render se hace con `.map()`.

**Wireframe recomendado**

```
[ Saludo + subtítulo ]                      [ pill: N estudiantes ]
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ KPI Total     │ │ KPI Activos   │ │ KPI Carreras  │
└───────────────┘ └───────────────┘ └───────────────┘
┌─────────────────────────────┐ ┌──────────────────────┐
│ FormularioEstudiante        │ │ TarjetaEstudiante    │
│ (nombre, carrera, submit)   │ │ (preview en vivo)    │
└─────────────────────────────┘ └──────────────────────┘
ListaEstudiantes (grid de tarjetas)  · o tabla
```

---

## 8. De dónde sale cada idea

| Idea | Referencia |
|---|---|
| Saludo personal + subtítulo con ID/semestre + pill de carrera | Dashboard "Welcome back, Arjun" |
| Fila de 4 KPI con icon tile tintado y barra de progreso | Dashboard "Welcome back" |
| CTA negro dentro de tarjeta (`View Materials`) | Dashboard "Welcome back" |
| Card de materia: título centrado, código, badge de módulos, meta a 2 columnas | Dashboard "Welcome back" |
| Grid de tarjetas 2x2 como alternativa a tabla | Dashboard "Welcome back" |
| Sidebar con grupos y label uppercase; activo en rojo/soft | Portal IRACIAS |
| Banner hero con foto + degradado y dots de carrusel | Portal IRACIAS |
| Badge circular de nota ("A") al final de la fila | Portal IRACIAS |
| Panel lateral de perfil con pares label/valor | Portal IRACIAS |
| Calendario con leyenda de puntos de color | Portal IRACIAS |
| Card "Top" con ranking numerado 01/02 y botón pill rojo | Portal IRACIAS |
| Fondo azul muy claro + tarjetas blancas muy redondeadas | Inventario farmacia |
| Pills de categoría (violeta) y de stock (verde) | Inventario farmacia |
| Íconos de acción mínimos sin borde (lápiz azul / papelera roja) | Inventario farmacia |
| KPI ultra minimalista (label + valor, sin icono) | Inventario farmacia |
| Sidebar con ítem activo azul sólido y `Logout` al fondo | BUSTOKE |
| Topbar con buscador + notificación con dot + avatar con rol | BUSTOKE |
| Header de página con secundario outline + primario sólido | BUSTOKE |
| Barra de filtros en tarjeta con selects y "Reiniciar" en rojo | BUSTOKE |
| Tabla con header azul sólido + pill contador | BUSTOKE |
| Paginación con activo azul y flechas outline | BUSTOKE |
| KPI con delta `↑ 1.8% Más que ayer` en verde/rojo | BUSTOKE |
| Formulario por secciones con label + asterisco y breadcrumb | BUSTOKE (Datos de la agencia) |
| Gráfico de área con tooltip y dropdown de periodo | BUSTOKE |

---

## 9. Tokens listos para copiar

### CSS

```css
:root {
  --bg-app: #F5F7FB;
  --surface: #FFFFFF;
  --surface-muted: #F8FAFC;
  --border: #E5E9F0;
  --border-strong: #CBD5E1;
  --text: #0F172A;
  --text-secondary: #64748B;
  --text-tertiary: #94A3B8;
  --primary: #2563EB;
  --primary-hover: #1D4ED8;
  --primary-soft: #EFF4FF;
  --accent: #E11D48;
  --accent-soft: #FFE4E9;
  --success: #16A34A;
  --success-soft: #DCFCE7;
  --warning: #F59E0B;
  --purple: #7C3AED;
  --purple-soft: #F3E8FF;
  --ink: #0B0F19;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-sm: 0 4px 16px rgba(15, 23, 42, .06);
}

body {
  background: var(--bg-app);
  color: var(--text);
  font-family: Inter, Manrope, system-ui, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
```

### Tailwind (`tailwind.config.js`)

```js
export default {
  theme: {
    extend: {
      colors: {
        app: '#F5F7FB',
        surface: '#FFFFFF',
        muted: '#F8FAFC',
        line: '#E5E9F0',
        ink: '#0B0F19',
        primary: { DEFAULT: '#2563EB', hover: '#1D4ED8', soft: '#EFF4FF' },
        accent: { DEFAULT: '#E11D48', soft: '#FFE4E9' },
        ok: { DEFAULT: '#16A34A', soft: '#DCFCE7' },
        cat: { DEFAULT: '#7C3AED', soft: '#F3E8FF' },
      },
      borderRadius: { sm: '8px', md: '12px', lg: '16px' },
      boxShadow: { card: '0 4px 16px rgba(15,23,42,.06)' },
      fontFamily: { sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'] },
    },
  },
};
```

### Clases utilitarias sugeridas

```css
.card       { @apply bg-white border border-line rounded-lg shadow-card; }
.card-pad   { @apply p-6; }
.kpi-label  { @apply text-[12px] font-medium text-slate-500; }
.kpi-value  { @apply text-[28px] font-bold tracking-tight text-ink tabular-nums; }
.pill       { @apply inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-semibold; }
.pill-blue  { @apply bg-primary-soft text-primary; }
.pill-green { @apply bg-ok-soft text-ok; }
.pill-red   { @apply bg-accent-soft text-accent; }
.btn        { @apply inline-flex h-10 items-center gap-2 rounded-sm px-4 text-sm font-semibold transition; }
.btn-primary{ @apply bg-primary text-white hover:bg-primary-hover; }
.btn-outline{ @apply bg-white border border-slate-300 text-ink hover:bg-muted; }
.input      { @apply h-[42px] w-full rounded-sm border border-slate-300 px-3.5 text-sm outline-none
                      focus:border-primary focus:ring-[3px] focus:ring-primary/15; }
.section-lbl{ @apply text-[11px] font-semibold uppercase tracking-[.04em] text-slate-400; }
```

---

## 10. Reglas de oro

**Sí**

- Un solo CTA sólido por vista.
- Iconos siempre de 1.5–2px de trazo y mismo set (Lucide / Heroicons).
- Alinear todo a una grilla de 4px.
- Estados explícitos: hover, focus, disabled, vacío, error.
- Números tabulares en KPIs y tablas.

**No**

- No mezclar más de una familia tipográfica.
- No usar sombras grandes ni degradados de fondo en tarjetas.
- No poner el color de acento en texto largo.
- No dejar `alert()` para validar; usar mensajes inline.
- No usar `index` como `key` en listas dinámicas.

---

## 11. Checklist contra la rúbrica

| Criterio | Cómo lo cubre esta guía |
|---|---|
| Organización de componentes (3 pts) | Sección 7: un archivo por componente, props explícitas |
| Uso de props (3 pts) | `TarjetaEstudiante` 100% presentacional; callbacks `onEliminar` / `onEditar` |
| Estado y eventos (3 pts) | Formulario controlado, validación inline, reset + focus |
| Renderizado dinámico (4 pts) | `.map()` con `key={id}`, contador, estado vacío |
| Claridad y funcionamiento (4 pts) | Tokens y clases consistentes, sin estilos mágicos |
