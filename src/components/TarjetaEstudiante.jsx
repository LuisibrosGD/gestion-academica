import './TarjetaEstudiante.css';

/**
 * Paleta armónica de colores suaves basada en el design system.
 */
const PALETA_AVATARES = [
  { bg: '#eff4ff', color: '#2563eb' }, // Azul primario
  { bg: '#f3e8ff', color: '#7c3aed' }, // Violeta
  { bg: '#dcfce7', color: '#16a34a' }, // Esmeralda / Éxito
  { bg: '#fef3c7', color: '#b45309' }, // Ámbar / Dorado
  { bg: '#ffe4e9', color: '#e11d48' }, // Rosa / Frambuesa
  { bg: '#e0e7ff', color: '#4338ca' }, // Índigo
  { bg: '#ccfbf1', color: '#0f766e' }, // Teal / Esmeralda azulado
];

/**
 * Genera un color consistente a partir del nombre (Color Hashing).
 */
function obtenerColorAvatar(nombre = '') {
  let hash = 0;
  for (let i = 0; i < nombre.length; i += 1) {
    hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
  }
  const indice = Math.abs(hash) % PALETA_AVATARES.length;
  return PALETA_AVATARES[indice];
}

/**
 * Obtiene las iniciales (1 o 2 letras) a partir del nombre completo.
 * Ejemplo: "Ana Torres Quispe" -> "AT"
 */
function obtenerIniciales(nombreCompleto = '') {
  const partes = nombreCompleto.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '??';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}

/**
 * Formatea una fecha ISO a un formato legible en español (Perú).
 * Ejemplo: "2026-09-02T15:30:00.000Z" -> "02 sept 2026"
 */
function formatearFecha(fechaIso) {
  if (!fechaIso) return 'Sin fecha';
  try {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return fechaIso;
  }
}

/**
 * Componente 100% presentacional para mostrar un estudiante.
 * Cumple con RF-08, RF-11, RF-12 del proyecto.
 */
export default function TarjetaEstudiante({ estudiante, onEliminar, onAlternarEstado }) {
  const { id, nombre, carrera, fechaRegistro, activo } = estudiante;

  const iniciales = obtenerIniciales(nombre);
  const fechaFormateada = formatearFecha(fechaRegistro);
  const colorAvatar = obtenerColorAvatar(nombre);

  function manejarEliminar() {
    if (window.confirm(`¿Estás seguro de eliminar a "${nombre}"?`)) {
      onEliminar(id);
    }
  }

  return (
    <article
      className={`card tarjeta-estudiante ${!activo ? 'tarjeta-estudiante--inactivo' : ''}`}
      aria-label={`Estudiante ${nombre}`}
    >
      {/* Cabecera de la tarjeta: Avatar, Info principal y Pill de Carrera */}
      <header className="tarjeta-estudiante__header">
        <div className="tarjeta-estudiante__avatar-wrap">
          <div
            className={`tarjeta-estudiante__avatar ${!activo ? 'tarjeta-estudiante__avatar--inactivo' : ''}`}
            style={
              activo
                ? {
                    '--avatar-bg': colorAvatar.bg,
                    '--avatar-color': colorAvatar.color,
                  }
                : undefined
            }
            aria-hidden="true"
          >
            {iniciales}
          </div>
        </div>

        <div className="tarjeta-estudiante__datos">
          <div className="tarjeta-estudiante__top-row">
            <span className="tarjeta-estudiante__id" title={`ID: ${id}`}>
              {id}
            </span>
            <span className="pill pill--purple tarjeta-estudiante__carrera" title={carrera}>
              {carrera}
            </span>
          </div>
          <h3 className="tarjeta-estudiante__nombre" title={nombre}>
            {nombre}
          </h3>
        </div>
      </header>

      {/* Metadatos: Fecha de registro */}
      <div className="tarjeta-estudiante__meta">
        <svg
          className="tarjeta-estudiante__meta-icon"
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
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="tarjeta-estudiante__meta-text">
          Registrado el <strong className="num">{fechaFormateada}</strong>
        </span>
      </div>

      <div className="tarjeta-estudiante__divider" role="separator" />

      {/* Pie de la tarjeta: Estado actual y Botones de acción */}
      <footer className="tarjeta-estudiante__footer">
        <span
          className={`pill ${activo ? 'pill--green' : 'pill--gray'} tarjeta-estudiante__estado`}
        >
          <span
            className={`tarjeta-estudiante__dot ${activo ? 'tarjeta-estudiante__dot--activo' : ''}`}
            aria-hidden="true"
          />
          {activo ? 'Activo' : 'Inactivo'}
        </span>

        <div className="tarjeta-estudiante__acciones">
          <button
            type="button"
            className="btn btn--ghost tarjeta-estudiante__btn-toggle"
            onClick={() => onAlternarEstado(id)}
            title={activo ? 'Desactivar estudiante' : 'Activar estudiante'}
          >
            {activo ? 'Desactivar' : 'Activar'}
          </button>

          <button
            type="button"
            className="btn btn--danger tarjeta-estudiante__btn-eliminar"
            onClick={manejarEliminar}
            title={`Eliminar a ${nombre}`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Eliminar</span>
          </button>
        </div>
      </footer>
    </article>
  );
}
