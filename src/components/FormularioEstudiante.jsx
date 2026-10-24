// PLACEHOLDER DE INTEGRACIÓN — Integrante 2 reemplaza este archivo por la versión final.
// Solo sirve para verificar el flujo de estado/props definido por el Integrante 1.
import { useState } from 'react';
import { CARRERAS } from '../data/carreras.js';
import './FormularioEstudiante.css';

export default function FormularioEstudiante({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');

  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!nombre.trim() || !carrera) return;
    onAgregar({ nombre, carrera });
    setNombre('');
    setCarrera('');
  }

  return (
    <form className="card card--pad form" onSubmit={manejarEnvio}>
      <h2 className="form__title">Nuevo estudiante</h2>

      <div className="field">
        <label className="field__label" htmlFor="nombre-estudiante">
          Nombre completo <span className="field__required">*</span>
        </label>
        <input
          className="field__control"
          id="nombre-estudiante"
          name="nombre"
          type="text"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          placeholder="Ej. Ana Torres Quispe"
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="carrera-estudiante">
          Carrera <span className="field__required">*</span>
        </label>
        <select
          className="field__control"
          id="carrera-estudiante"
          name="carrera"
          value={carrera}
          onChange={(evento) => setCarrera(evento.target.value)}
        >
          <option value="">Selecciona una carrera</option>
          {CARRERAS.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn--primary" type="submit">
        Agregar estudiante
      </button>
    </form>
  );
}
