// PLACEHOLDER DE INTEGRACIÓN — Integrante 3 reemplaza este archivo por la versión final.
// Debe renderizar con .map() y key={estudiante.id}.
import TarjetaEstudiante from './TarjetaEstudiante.jsx';
import './ListaEstudiantes.css';

export default function ListaEstudiantes({ estudiantes, onEliminar, onAlternarEstado }) {
  return (
    <section className="lista">
      <header className="lista__head">
        <h2 className="lista__title">Estudiantes</h2>
        <span className="pill pill--blue num">{estudiantes.length} registros</span>
      </header>

      {estudiantes.length === 0 ? (
        <p className="lista__vacia">Aún no hay estudiantes registrados.</p>
      ) : (
        <div className="lista__grid">
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
