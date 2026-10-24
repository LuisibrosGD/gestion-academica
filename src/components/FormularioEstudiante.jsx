import { useRef, useState } from 'react';
import { CARRERAS, CARRERA_VACIA, esCarreraValida } from '../data/carreras.js';
import './FormularioEstudiante.css';

const NOMBRE_MIN = 2;
const NOMBRE_MAX = 60;
// Solo letras (incluye acentos y ñ) separadas por espacios.
const PATRON_NOMBRE = /^\p{L}+(?:\s+\p{L}+)*$/u;

// Quita espacios sobrantes: "  Ana   Torres " -> "Ana Torres"
function normalizarNombre(texto) {
  return texto.trim().replace(/\s+/g, ' ');
}

function validarNombre(texto) {
  const nombre = normalizarNombre(texto);
  if (!nombre) return 'El nombre es obligatorio.';
  if (nombre.length < NOMBRE_MIN) return `Mínimo ${NOMBRE_MIN} caracteres.`;
  if (nombre.length > NOMBRE_MAX) return `Máximo ${NOMBRE_MAX} caracteres.`;
  if (!PATRON_NOMBRE.test(nombre)) return 'Usa solo letras y espacios.';
  return '';
}

function validarCarrera(valor) {
  if (!valor) return 'Selecciona una carrera.';
  if (!esCarreraValida(valor)) return 'Elige una carrera de la lista.';
  return '';
}

export default function FormularioEstudiante({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState(CARRERA_VACIA);
  const [errores, setErrores] = useState({ nombre: '', carrera: '' });

  const refNombre = useRef(null);
  const refCarrera = useRef(null);

  function manejarCambioNombre(evento) {
    setNombre(evento.target.value);
    if (errores.nombre) setErrores((previo) => ({ ...previo, nombre: '' }));
  }

  function manejarCambioCarrera(evento) {
    setCarrera(evento.target.value);
    if (errores.carrera) setErrores((previo) => ({ ...previo, carrera: '' }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nuevosErrores = {
      nombre: validarNombre(nombre),
      carrera: validarCarrera(carrera),
    };
    setErrores(nuevosErrores);

    if (nuevosErrores.nombre) {
      refNombre.current.focus();
      return;
    }
    if (nuevosErrores.carrera) {
      refCarrera.current.focus();
      return;
    }

    onAgregar({ nombre: normalizarNombre(nombre), carrera });

    setNombre('');
    setCarrera(CARRERA_VACIA);
    setErrores({ nombre: '', carrera: '' });
    refNombre.current.focus();
  }

  return (
    <form className="card card--pad form" onSubmit={manejarEnvio} noValidate>
      <header className="form__header">
        <h2 className="form__title">Nuevo estudiante</h2>
        <p className="form__subtitle">
          Completa los datos para registrarlo en la lista.
        </p>
      </header>

      <div className="form__grid">
        <div className="field">
          <label className="field__label" htmlFor="nombre-estudiante">
            Nombre completo <span className="field__required">*</span>
          </label>
          <input
            ref={refNombre}
            className={`field__control ${errores.nombre ? 'field__control--error' : ''}`}
            id="nombre-estudiante"
            name="nombre"
            type="text"
            autoComplete="off"
            value={nombre}
            onChange={manejarCambioNombre}
            placeholder="Ej. Ana Torres Quispe"
            aria-required="true"
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? 'error-nombre' : undefined}
          />
          {errores.nombre && (
            <p className="field__error" id="error-nombre">
              {errores.nombre}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="carrera-estudiante">
            Carrera <span className="field__required">*</span>
          </label>
          <select
            ref={refCarrera}
            className={`field__control ${errores.carrera ? 'field__control--error' : ''}`}
            id="carrera-estudiante"
            name="carrera"
            value={carrera}
            onChange={manejarCambioCarrera}
            aria-required="true"
            aria-invalid={Boolean(errores.carrera)}
            aria-describedby={errores.carrera ? 'error-carrera' : undefined}
          >
            <option value={CARRERA_VACIA}>Selecciona una carrera</option>
            {CARRERAS.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
          {errores.carrera && (
            <p className="field__error" id="error-carrera">
              {errores.carrera}
            </p>
          )}
        </div>
      </div>

      <div className="form__actions">
        <button className="btn btn--primary" type="submit">
          Agregar estudiante
        </button>
      </div>
    </form>
  );
}