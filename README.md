# Sistema de Gestión Académica con React

Trabajo práctico del curso **Taller de construccion de Software Web** — Ciclo **8** — Grupo **3**
Docente: **[NOMBRE DEL DOCENTE]**

Aplicación de una sola vista que registra estudiantes y actualiza la lista en tiempo real,
sin recargar la página. Construida con **React 18 + Vite** y **CSS puro**.

> Reemplaza los textos entre corchetes antes de entregar.

---

## Enlaces de entrega

| Recurso | Enlace |
|---|---|
| Aplicación publicada (Vercel) | _pendiente_ |
| Código fuente (.rar en Google Drive) | _pendiente_ |
| Repositorio (opcional) | _pendiente_ |

---

## Equipo

| # | Integrante | Frente |
|---|---|---|
| 1 | [Nombre] | Arquitectura, estado global, layout y contrato de props |
| 2 | [Nombre] | `FormularioEstudiante` (captura y validación) |
| 3 | [Nombre] | `TarjetaEstudiante` y `ListaEstudiantes` |
| 4 | [Nombre] | QA, despliegue en Vercel e informe |

Detalle completo en [`docs/division-4.md`](docs/division-4.md).

---

## Documentación

| Archivo | Contenido |
|---|---|
| [`docs/instruci.txt`](docs/instruci.txt) | Enunciado original del trabajo |
| [`docs/requisitos-funcionales.md`](docs/requisitos-funcionales.md) | RF, contratos, casos de aceptación |
| [`docs/design-system.md`](docs/design-system.md) | Paleta, tipografía, componentes y patrones |
| [`docs/division-4.md`](docs/division-4.md) | Reparto de tareas, cronograma e informe |

---

## Estructura del proyecto

```
Gestion-Academica-React/
  README.md
  docs/                        # enunciado, requisitos, diseño y división
  index.html
  package.json
  vite.config.js
  src/
    main.jsx                   # monta React e importa estilos globales
    App.jsx                    # estado global + handlers + layout
    App.css                    # topbar, page, KPIs, grilla, footer
    styles/
      tokens.css               # variables de diseño + primitivas
    data/
      carreras.js              # catálogo de carreras
      estudianteInicial.js     # registros de ejemplo
    components/
      FormularioEstudiante.jsx / .css
      TarjetaEstudiante.jsx    / .css
      ListaEstudiantes.jsx     / .css
```

---

## Cómo ejecutar

Requiere Node 18 o superior.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve el build
```

---

## Contrato de componentes

```jsx
<App />
// estado: estudiantes[] — único dueño del estado

<FormularioEstudiante
  onAgregar={(datos) => void}      // datos = { nombre, carrera } SIN id ni fecha
/>

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

**Modelo de estudiante**

```js
{
  id: 'est-…',                       // generado en App (string único)
  nombre: 'Ana Torres Quispe',       // string sin espacios sobrantes
  carrera: 'Ingeniería de Sistemas', // debe existir en data/carreras.js
  fechaRegistro: '2026-10-24T…',     // ISO generado en App
  activo: true                       // boolean, por defecto true
}
```

**Reglas de integración**

- El input de nombre tiene `id="nombre-estudiante"` y el contenedor del formulario
  `id="formulario-estudiante"` (los usa el CTA del estado vacío).
- Reutilizar las primitivas de `tokens.css` (`.card`, `.pill`, `.btn`, `.field`, `.num`)
  sin redefinirlas.
- Los componentes no reciben `setEstudiantes` ni mutan el array: solo llaman callbacks.
- `.map()` con `key={estudiante.id}`; nunca el índice.

---

## Estado del repositorio

`App.jsx`, `tokens.css` y `App.css` están completos. Los tres componentes están como
**placeholder de integración** (compilan y permiten probar el flujo de estado) hasta que los
integrantes 2 y 3 suban su versión final.

## Criterios de la rúbrica cubiertos

| Criterio | Dónde |
|---|---|
| Definición y organización de componentes | Estructura `src/components` + `App` como contenedor |
| Uso correcto de props | `TarjetaEstudiante` 100% presentacional |
| Manejo del estado y eventos | `App.jsx` + formulario controlado |
| Renderizado dinámico de listas | `.map()` con `key` en `ListaEstudiantes` |
| Claridad y funcionamiento | Tokens únicos, CSS por componente, sin dependencias extra |
