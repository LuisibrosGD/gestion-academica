# Requisitos Funcionales — Gestión Académica (React + CSS puro)

> Base: `docs/instruci.txt`. Alcance: 3 componentes, estado en memoria, sin backend.
> Stack asumido: React 18 + Vite, JSX, **CSS plano** (sin Tailwind ni librerías UI).
> Diseño visual: ver `docs/design-system.md`.

---

## 1. Alcance

**Entra:** formulario controlado, alta de estudiantes, tarjetas por props, lista dinámica,
eliminación/cambio de estado, contador y estado vacío.

**No entra:** login, rutas, backend, base de datos, edición de registros, paginación real,
tests automatizados, TypeScript.

**Persistencia:** opcional (`localStorage`), no obligatoria para aprobar.

---

## 2. Modelo de datos

```js
// Estudiante
{
  id: "est-1719312000000",   // string único generado al crear
  nombre: "Ana Torres",      // 2–60 caracteres, trim aplicado
  carrera: "Ingeniería de Sistemas",
  fechaRegistro: "2026-10-24T14:00:00.000Z", // ISO, se genera automático
  activo: true               // default true
}
```

**Catálogo de carreras** (constante, fuente única):

```
Ingeniería de Sistemas · Ingeniería de Software · Administración de Empresas
Contabilidad · Derecho · Psicología · Arquitectura · Medicina
```

---

## 3. Requisitos funcionales

### RF-01 · Estructura principal
La aplicación muestra, en una sola vista: encabezado, formulario, resumen (contador) y lista.

- **Prioridad:** Must
- **Criterio:** una sola página, sin rutas, sin recarga.

### RF-02 · Captura de nombre
`FormularioEstudiante` renderiza un input de texto para **nombre completo**.

- **Prioridad:** Must
- **Reglas:** obligatorio · `trim` antes de validar · 2 a 60 caracteres · solo letras, espacios y acentos.
- **Criterio:** el valor se refleja en el estado del formulario en cada tecla (`onChange`).

### RF-03 · Captura de carrera
`FormularioEstudiante` renderiza un `<select>` con las carreras del catálogo + opción vacía
"Selecciona una carrera".

- **Prioridad:** Must
- **Reglas:** obligatorio · debe pertenecer al catálogo.
- **Criterio:** no se permite texto libre.

### RF-04 · Validación al enviar
Al hacer submit se validan ambos campos y, si hay errores, **no** se agrega el registro.

- **Prioridad:** Must
- **Reglas:** mensaje inline bajo cada campo (`12px`, color acento), `aria-invalid` y
  `aria-describedby`; sin `alert()`; se limpia el error al corregir el campo.
- **Criterio:** doble submit con campos vacíos no crea registros.

### RF-05 · Alta de estudiante
Con datos válidos, el formulario notifica al padre mediante `onAgregar`.

- **Prioridad:** Must
- **Reglas:** el padre (`App`) genera `id`, `fechaRegistro` y `activo: true`;
  el alta es **inmutable** (nuevo array, sin `push`).
- **Criterio:** el nuevo estudiante aparece en la lista **sin recargar la página**.

### RF-06 · Reset posterior al alta
Tras un alta exitosa el formulario queda limpio y el foco vuelve al input de nombre.

- **Prioridad:** Must
- **Criterio:** campos vacíos, sin errores visibles, foco en nombre.

### RF-07 · Renderizado dinámico de la lista
`ListaEstudiantes` recibe el array y renderiza una tarjeta por elemento con `.map()`.

- **Prioridad:** Must (vale 4 pts)
- **Reglas:** `key={estudiante.id}` (nunca el índice); no mutar el array recibido.
- **Criterio:** con 0, 1 y N estudiantes el render es correcto y estable.

### RF-08 · Tarjeta por props
`TarjetaEstudiante` es **presentacional**: solo recibe props y no tiene estado propio.

- **Prioridad:** Must (vale 3 pts)
- **Props:** `estudiante`, `onEliminar(id)`, `onAlternarEstado(id)`.
- **Muestra:** iniciales en avatar, nombre, carrera (pill), ID corto, fecha de registro formateada,
  pill de estado (`Activo` verde / `Inactivo` gris).
- **Criterio:** la misma tarjeta sirve para cualquier estudiante sin cambios de código.

### RF-09 · Estado vacío
Si no hay estudiantes, se muestra un bloque vacío con icono, título, texto de ayuda y CTA
"Agregar el primero" que enfoca el formulario.

- **Prioridad:** Must
- **Criterio:** no se renderiza un contenedor colapsado ni texto suelto.

### RF-10 · Contador
El encabezado de la lista muestra el total con formato singular/plural
(`1 estudiante` / `N estudiantes`).

- **Prioridad:** Should
- **Criterio:** el número se actualiza al agregar y al eliminar.

### RF-11 · Eliminar estudiante
Cada tarjeta tiene acción de eliminar que quita el registro del estado.

- **Prioridad:** Should
- **Reglas:** confirmación nativa (`window.confirm`) aceptada; el array se reemplaza, no se muta.
- **Criterio:** el contador y la lista se actualizan al instante.

### RF-12 · Cambiar estado activo/inactivo
Cada tarjeta alterna `activo` y refleja el cambio en la pill y en el estilo del borde/avatar.

- **Prioridad:** Could
- **Criterio:** el estado persiste mientras la app siga abierta.

### RF-13 · Persistencia local
Guardar/leer `estudiantes` en `localStorage` con `useEffect` y validar el JSON al leer.

- **Prioridad:** Could
- **Criterio:** al recargar, los registros previos se mantienen; si el JSON es inválido, arranca vacío.

### RF-14 · Búsqueda por nombre o carrera
Input de búsqueda que filtra en memoria (sin alterar el estado fuente).

- **Prioridad:** Could
- **Criterio:** el contador muestra resultados filtrados y se puede limpiar.

---

## 4. Contratos de componentes

```jsx
<App />
  estado: estudiantes[]

<FormularioEstudiante
  onAgregar={(datos) => void}   // { nombre, carrera }
/>
  estado local: nombre, carrera, errores

<ListaEstudiantes
  estudiantes={estudiante[]}
  onEliminar={(id) => void}
  onAlternarEstado={(id) => void}
/>

<TarjetaEstudiante
  estudiante={estudiante}
  onEliminar={(id) => void}
  onAlternarEstado={(id) => void}
/>
```

**Flujo de estado (lifting state up)**

```
input → FormularioEstudiante (estado local)
      → onAgregar({nombre, carrera})
      → App (setEstudiantes: nuevo array con id/fecha/activo)
      → prop estudiantes
      → ListaEstudiantes → map → TarjetaEstudiante
```

---

## 5. Estructura de archivos

```
src/
  main.jsx
  App.jsx                 // estado + handlers
  App.css                 // layout general
  styles/
    tokens.css            // variables de design-system.md
  components/
    FormularioEstudiante.jsx
    FormularioEstudiante.css
    ListaEstudiantes.jsx
    ListaEstudiantes.css
    TarjetaEstudiante.jsx
    TarjetaEstudiante.css
  data/
    carreras.js           // catálogo
    estudianteInicial.js  // 2–3 registros de ejemplo (opcional)
```

Regla: **un componente = un `.jsx` + un `.css`** con clases en `kebab-case` y prefijo por componente
(`.form-*`, `.card-*`, `.lista-*`). Sin estilos inline salvo valores dinámicos inevitables.

---

## 6. Requisitos no funcionales

| ID | Requisito |
|---|---|
| RNF-01 | Sin recarga de página ni recarga manual para ver cambios |
| RNF-02 | Sin dependencias extra (ni Tailwind, ni UI kits); solo React + CSS |
| RNF-03 | Consola del navegador sin errores ni warnings de `key`/props |
| RNF-04 | Responsive: 1 columna en móvil, grilla de tarjetas ≥ 768px |
| RNF-05 | Accesibilidad básica: `label` asociado, foco visible, contraste AA, `aria-live` en el contador |
| RNF-06 | Código legible: nombres descriptivos, sin lógica duplicada, funciones < 30 líneas |
| RNF-07 | Tokens de color/tipografía centralizados en `tokens.css` |

---

## 7. Casos de aceptación

| # | Dado | Cuando | Entonces |
|---|---|---|---|
| CA-01 | Formulario vacío | envío | 2 errores inline, sin alta, foco en nombre |
| CA-02 | Nombre "A" | envío | error "mínimo 2 caracteres" |
| CA-03 | Nombre válido y sin carrera | envío | error solo en carrera |
| CA-04 | Datos válidos | envío | registro agregado al final, formulario limpio, foco en nombre |
| CA-05 | 1 estudiante en lista | render | 1 tarjeta con datos correctos |
| CA-06 | 3 estudiantes | eliminar el del medio | quedan 2, sin re-render extraño ni keys duplicadas |
| CA-07 | Lista vacía | render | estado vacío con CTA funcional |
| CA-08 | 1 estudiante | render | contador dice "1 estudiante" |
| CA-09 | Recarga con datos guardados | carga | mismos registros |
| CA-10 | Cualquier estudiante | inspección | mismo componente reutilizado, sin condición por nombre |

---

## 8. Trazabilidad con la rúbrica

| Criterio (puntaje) | Requisitos que lo cubren |
|---|---|
| Definición y organización de componentes (3) | RF-01, RF-08, RF-07 + sección 5 |
| Uso correcto de props (3) | RF-08, RF-11, RF-12, sección 4 |
| Manejo del estado y eventos (3) | RF-02, RF-04, RF-05, RF-06 |
| Renderizado dinámico de listas (4) | RF-07, RF-09, RF-10, RF-14 |
| Claridad y funcionamiento (4) | RF-03, RNF-03 a RNF-07, sección 7 |
