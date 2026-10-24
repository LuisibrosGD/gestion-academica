import { useState } from 'react';
import FormularioEstudiante from './components/FormularioEstudiante.jsx';
import ListaEstudiantes from './components/ListaEstudiantes.jsx';
import { ESTUDIANTES_INICIALES } from './data/estudianteInicial.js';
import { CARRERAS } from './data/carreras.js';

function crearId() {
  const uuid = globalThis.crypto?.randomUUID?.();
  return `est-${uuid ?? Date.now().toString(36)}`;
}

export default function App() {
  const [estudiantes, setEstudiantes] = useState(ESTUDIANTES_INICIALES);

  function agregarEstudiante({ nombre, carrera }) {
    const nuevoEstudiante = {
      id: crearId(),
      nombre: nombre.trim(),
      carrera,
      fechaRegistro: new Date().toISOString(),
      activo: true,
    };
    setEstudiantes((previos) => [...previos, nuevoEstudiante]);
  }

  function eliminarEstudiante(id) {
    setEstudiantes((previos) => previos.filter((estudiante) => estudiante.id !== id));
  }

  function alternarEstado(id) {
    setEstudiantes((previos) =>
      previos.map((estudiante) =>
        estudiante.id === id ? { ...estudiante, activo: !estudiante.activo } : estudiante
      )
    );
  }

  const total = estudiantes.length;
  const activos = estudiantes.filter((estudiante) => estudiante.activo).length;
  const carreras = new Set(estudiantes.map((estudiante) => estudiante.carrera)).size;

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            GA
          </span>
          <span className="brand__text">
            <strong className="brand__name">Gestión Académica</strong>
            <span className="brand__hint">Panel de coordinación</span>
          </span>
        </div>

        <div className="topbar__user">
          <span className="pill pill--blue">Semestre 2026-II</span>
          <span className="avatar avatar--sm" aria-hidden="true">
            AD
          </span>
          <span className="topbar__user-text">
            <strong>Administrador</strong>
            <span>Coordinación académica</span>
          </span>
        </div>
      </header>

      <main className="page">
        <section className="page__head" aria-labelledby="titulo-pagina">
          <div>
            <h1 className="page__title" id="titulo-pagina">
              Gestión de estudiantes
            </h1>
            <p className="page__subtitle">
              Registra nuevos ingresos y consulta la lista de estudiantes matriculados.
            </p>
          </div>
        </section>

        <section className="kpi-grid" aria-label="Resumen de estudiantes">
          <article className="kpi">
            <span className="kpi__label">Total de estudiantes</span>
            <strong className="kpi__value num">{total}</strong>
            <span className="kpi__hint">Registros en el sistema</span>
          </article>
          <article className="kpi">
            <span className="kpi__label">Estudiantes activos</span>
            <strong className="kpi__value num">{activos}</strong>
            <span className="kpi__hint">{total - activos} inactivos</span>
          </article>
          <article className="kpi">
            <span className="kpi__label">Carreras representadas</span>
            <strong className="kpi__value num">{carreras}</strong>
            <span className="kpi__hint">De {CARRERAS.length} carreras disponibles</span>
          </article>
        </section>

        <div className="layout">
          <div className="layout__form" id="formulario-estudiante">
            <FormularioEstudiante onAgregar={agregarEstudiante} />
          </div>

          <div className="layout__list">
            <ListaEstudiantes
              estudiantes={estudiantes}
              onEliminar={eliminarEstudiante}
              onAlternarEstado={alternarEstado}
            />
          </div>
        </div>
      </main>

      <footer className="footer">
        <span>React · Componentes, props y estado</span>
        <span className="footer__hint">Trabajo práctico — Ciclo 8</span>
      </footer>
    </div>
  );
}
