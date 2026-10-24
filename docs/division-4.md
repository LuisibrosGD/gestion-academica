# División del trabajo — 4 integrantes

**Proyecto:** Gestión Académica con React (formulario + tarjeta + lista)
**Base:** `docs/instruci.txt` · **Diseño:** `docs/design-system.md` · **Alcance:** `docs/requisitos-funcionales.md`

> Reemplaza `Integrante N` por nombres reales antes de entregar.

---

## Cumplimiento literal de `instruci.txt`

| Indicación del enunciado | Requisito | Archivo | Dueño |
|---|---|---|---|
| `FormularioEstudiante`: captura nombre y carrera | RF-02, RF-03 | `src/components/FormularioEstudiante.jsx` | 2 |
| `TarjetaEstudiante`: muestra datos de un estudiante mediante props | RF-08 | `src/components/TarjetaEstudiante.jsx` | 3 |
| `ListaEstudiantes`: presenta los registros con una lista de componentes | RF-07 | `src/components/ListaEstudiantes.jsx` | 3 |
| El formulario actualiza el estado de la aplicación | RF-05 | `src/App.jsx` | 1 |
| La lista muestra los nuevos registros sin recargar la página | RF-05, RF-07 | `src/App.jsx` + `.map()` | 1 y 3 |
| Criterios: componentes 3 · props 3 · estado 3 · listas 4 · claridad 4 | §8 de `docs/requisitos-funcionales.md` | — | 1, 2, 3 y 4 |

Se respetan **los nombres exactos** de los tres componentes, una sola vista sin rutas y
React con CSS puro. Nada del enunciado queda fuera del reparto.

**Estado del repositorio:** frente 1 (arquitectura, estado, layout y contrato de props)
entregado; componentes 2 y 3 en placeholder de integración listos para reemplazo.

---

## Resumen de frentes

| # | Integrante | Frente | Entregable principal |
|---|---|---|---|
| 1 | Integrante 1 | Arquitectura y estado global | `App.jsx`, `tokens.css`, layout, handlers |
| 2 | Integrante 2 | Captura de datos | `FormularioEstudiante.jsx/.css` |
| 3 | Integrante 3 | Visualización de datos | `TarjetaEstudiante.jsx/.css`, `ListaEstudiantes.jsx/.css` |
| 4 | Integrante 4 | QA, despliegue e informe | Web en Vercel + `.rar` en Drive + Google Docs |

Ruta crítica: **1 → 2 y 3 en paralelo → 4**. Nadie avanza sin el contrato de props (sección 4 de `docs/requisitos-funcionales.md`).

---

## Integrante 1 — Arquitectura y estado global

**Responsabilidad:** que la app exista, compile y sea el único dueño del estado.

**Tareas**

1. Crear el proyecto: `npm create vite@latest . -- --template react` (JS, sin TypeScript).
2. Crear `src/styles/tokens.css` con las variables de `design-system.md` y `src/App.css` (layout, fondo, topbar, grilla).
3. `src/data/carreras.js` con el catálogo y `src/data/estudianteInicial.js` con 2 registros de ejemplo.
4. `src/App.jsx`: estado `estudiantes`, handlers `agregarEstudiante`, `eliminarEstudiante`, `alternarEstado`. Alta inmutable (nuevo array, `id` + `fechaRegistro` + `activo` generados aquí).
5. `src/main.jsx`: importar `tokens.css` antes que `App.css`.
6. Integrar los tres componentes con sus props exactas.

**Cubre:** RF-01, RF-05 · criterio "definición y organización de componentes".
**Entregable:** repo funcionando con datos de ejemplo y contrato de props escrito en el README.
**DoD:** `npm run dev` levanta sin errores de consola; el estado cambia desde `App`.

---

## Integrante 2 — Formulario

**Responsabilidad:** capturar, validar y resetear sin recargar.

**Tareas**

1. `FormularioEstudiante.jsx` con estado local `nombre`, `carrera`, `errores`.
2. Input de nombre + `<select>` de carreras con opción vacía; `label` asociado a cada campo.
3. Validación en submit: obligatorio, `trim`, 2–60 caracteres, formato, carrera del catálogo. Errores inline con `aria-invalid` y `aria-describedby`.
4. Llamar `onAgregar({ nombre, carrera })` solo si es válido; limpiar y devolver foco al nombre.
5. `FormularioEstudiante.css`: tarjeta blanca, radio 16, padding 24, grilla 2→1 columnas, foco con anillo azul, error en rojo.

**Cubre:** RF-02, RF-03, RF-04, RF-06 · criterio "manejo del estado y eventos".
**DoD:** CA-01 a CA-04 pasan; sin `alert()`; doble submit no duplica.

---

## Integrante 3 — Tarjeta y lista

**Responsabilidad:** que el renderizado dinámico y las props se vean impecables.

**Tareas**

1. `TarjetaEstudiante.jsx`: 100% presentacional (`estudiante`, `onEliminar`, `onAlternarEstado`). Avatar con iniciales, nombre, pill de carrera, ID corto, fecha formateada (`toLocaleDateString('es-PE')`), pill Activo/Inactivo, acciones.
2. `ListaEstudiantes.jsx`: `.map()` con `key={estudiante.id}`, contador singular/plural, estado vacío con CTA que enfoca el formulario, grilla `auto-fill minmax(300px, 1fr)`.
3. CSS de ambos: tarjeta radio 16 con hover `translateY(-2px)`, borde 1px, pills, divisor, acciones ghost.
4. Manejar lista vacía y lista larga (10+ registros) sin romper el layout.

**Cubre:** RF-07 a RF-12 · criterios "uso correcto de props" y "renderizado dinámico" (4 pts).
**DoD:** CA-05 a CA-08 y CA-10 pasan; ninguna key usa el índice; mismas props sirven para cualquier estudiante.

---

## Integrante 4 — QA, despliegue e informe

**Responsabilidad:** que el profesor pueda abrir la web, leer el informe y ejecutar el código.

### 4.1 QA

Revisar que **toda la aplicación funcione**. Nada más.

- [ ] Agregar un estudiante desde el formulario
- [ ] La lista se actualiza sin recargar la página
- [ ] El contador cambia al agregar y eliminar
- [ ] Eliminar y activar/desactivar funcionan
- [ ] La consola no muestra errores
- [ ] Se ve bien en celular y en laptop

Si algo falla, avisar al dueño del componente: 1 (`App`), 2 (formulario) o 3 (tarjeta/lista).

### 4.2 Despliegue en Vercel y RAR en Drive

1. Compilar y probar local: `npm run build` y `npm run preview`.
2. Subir el proyecto a GitHub.
3. En **Vercel** → *Add New Project* → importar el repo → Framework **Vite** →
   Build `npm run build`, Output `dist` → **Deploy**.
4. Abrir la URL en una ventana de incógnito y registrar un estudiante de prueba.
5. **Generar el RAR limpio** (sin `node_modules`, `dist`, `.git` ni `.vscode`):

   ```powershell
   & "C:\Program Files\WinRAR\Rar.exe" a -r -xnode_modules -xdist -x.git -x.vscode `
     Gestion-Academica-React.rar Gestion-Academica-React\
   ```

   Debe incluir: `README.md`, `docs/`, `src/`, `index.html`, `package.json`,
   `package-lock.json`, `vite.config.js`, `.gitignore`.
6. Subir el `.rar` a **Google Drive** → *Compartir* → **Cualquier persona con el enlace → Lector**.
7. Guardar los dos enlaces (Vercel y Drive) para el informe.

### 4.3 Informe en Google Docs

Dos partes, nada más.

**Página 1 — Carátula**

```
UNIVERSIDAD [NOMBRE]
Facultad de [FACULTAD] — Escuela de [ESCUELA]
Curso: [CURSO] — Ciclo [N] — Grupo [G]

"Sistema de Gestión Académica con React"
Trabajo práctico: React y Componentes

Docente: [NOMBRE DEL DOCENTE]

Integrantes:
1. [Nombre completo] — [código]
2. [Nombre completo] — [código]
3. [Nombre completo] — [código]
4. [Nombre completo] — [código]

Lima, [mes] de [año]
```

**Página 2 — Enlaces**

| Recurso | Enlace |
|---|---|
| Aplicación publicada (Vercel) | [URL] |
| Código fuente (`.rar` en Google Drive) | [URL del archivo con permiso abierto] |

**Página 3 en adelante — Código fuente completo**

Pegar **todos** los archivos como texto, en este orden, cada uno con su encabezado
`// Archivo: ruta/archivo.ext`:

```
README.md
package.json
index.html
vite.config.js
src/main.jsx
src/App.jsx
src/App.css
src/styles/tokens.css
src/components/FormularioEstudiante.jsx
src/components/FormularioEstudiante.css
src/components/TarjetaEstudiante.jsx
src/components/TarjetaEstudiante.css
src/components/ListaEstudiantes.jsx
src/components/ListaEstudiantes.css
src/data/carreras.js
src/data/estudianteInicial.js
```

Antes del código incluir solo estas tres líneas de ejecución:

```
npm install
npm run dev      # http://localhost:5173
```

**Formato**

- Hoja A4, márgenes 2.5 cm, Arial 11, interlineado 1.15.
- Código: `Insertar → Bloques de creación → Bloque de código`. **Nunca** como imagen,
  el profesor debe poder copiar y ejecutar.
- Compartir el documento: *Cualquier persona con el enlace → Lector*. Exportar también a PDF.

### 4.4 Checklist de entrega

- [ ] Carátula con docente, curso e integrantes
- [ ] Enlace de Vercel probado en incógnito
- [ ] RAR sin `node_modules`, `dist` ni `.git`
- [ ] Enlace de Drive con permiso abierto
- [ ] Código pegado como texto, completo y en orden
- [ ] `npm install` / `npm run dev` incluidos
- [ ] PDF de respaldo
- [ ] Documento entregado antes de la fecha límite

---

## Cronograma sugerido

| Día | Integrante 1 | Integrante 2 | Integrante 3 | Integrante 4 |
|---|---|---|---|---|
| 1 | Setup, tokens, `App.jsx`, handlers | Estructura JSX + CSS del formulario | Estructura JSX + CSS de tarjeta y lista | Carátula e integrantes |
| 2 | Integración y estado | Validación + reset/foco | `map`, keys, estado vacío, contador | Deploy en Vercel + RAR en Drive |
| 3 | Fixes | Fixes | Fixes | QA y enlaces en el informe |
| 4 | — | — | — | Pegar código, PDF y entrega |
