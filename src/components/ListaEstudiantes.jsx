import TarjetaEstudiante from './TarjetaEstudiante.jsx';
import './ListaEstudiantes.css';

/**
 * Componente que renderiza dinámicamente la lista de tarjetas de estudiantes.
 * Cumple con RF-07, RF-09, RF-10 del proyecto.
 */
export default function ListaEstudiantes({ estudiantes = [], onEliminar, onAlternarEstado }) {
  const total = estudiantes.length;

  // Formato singular/plural del contador (RF-10, CA-08)
  const textoContador = total === 1 ? '1 estudiante' : `${total} estudiantes`;

  // Enfoca y hace scroll hacia el input del formulario (RF-09, CA-07)
  function manejarEnfoqueFormulario() {
    const inputNombre = document.getElementById('nombre-estudiante');
    if (inputNombre) {
      inputNombre.focus();
      inputNombre.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return (
    <section className="lista-estudiantes" aria-labelledby="titulo-lista-estudiantes">
      {/* Cabecera con título y contador */}
      <header className="lista-estudiantes__head">
        <div className="lista-estudiantes__title-wrap">
          <h2 className="lista-estudiantes__title" id="titulo-lista-estudiantes">
            Estudiantes
          </h2>
          <span
            className="pill pill--blue num lista-estudiantes__badge"
            aria-live="polite"
            aria-atomic="true"
          >
            {textoContador}
          </span>
        </div>
      </header>

      {/* Renderizado condicional: Estado Vacío vs Grilla Dinámica */}
      {total === 0 ? (
        <div className="card lista-estudiantes__vacia" role="status">
          <div className="lista-estudiantes__vacia-icon-wrap" aria-hidden="true">
            <svg
              className="lista-estudiantes__vacia-icon"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="lista-estudiantes__vacia-title">Aún no hay estudiantes registrados</h3>
          <p className="lista-estudiantes__vacia-desc">
            Comienza ingresando los datos en el formulario para registrar al primer estudiante.
          </p>
          <button
            type="button"
            className="btn btn--primary lista-estudiantes__vacia-btn"
            onClick={manejarEnfoqueFormulario}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Agregar primer estudiante</span>
          </button>
        </div>
      ) : (
        /* Grilla dinámica de tarjetas: .map() obligatorio con key={estudiante.id} (RF-07) */
        <div className="lista-estudiantes__grid">
          {estudiantes.map((estudiante) => (
            <TarjetaEstudiante
              key={estudiante.id}
              estudiante={estudiante}
              onEliminar={onEliminar}
              onAlternarEstado={onAlternarEstado}
            />
          ))}
        </div>
      )}
    </section>
  );
}
