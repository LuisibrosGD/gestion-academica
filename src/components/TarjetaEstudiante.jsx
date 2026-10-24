// PLACEHOLDER DE INTEGRACIÓN — Integrante 3 reemplaza este archivo por la versión final.
// Recibe todo por props: estudiante, onEliminar, onAlternarEstado.
import './TarjetaEstudiante.css';

export default function TarjetaEstudiante({ estudiante, onEliminar, onAlternarEstado }) {
  const { id, nombre, carrera, activo } = estudiante;

  return (
    <article className="card card--pad tarjeta">
      <h3 className="tarjeta__nombre">{nombre}</h3>
      <p className="tarjeta__carrera">{carrera}</p>
      <span className={activo ? 'pill pill--green' : 'pill pill--gray'}>
        {activo ? 'Activo' : 'Inactivo'}
      </span>
      <div className="tarjeta__acciones">
        <button className="btn btn--ghost" type="button" onClick={() => onAlternarEstado(id)}>
          {activo ? 'Desactivar' : 'Activar'}
        </button>
        <button className="btn btn--danger" type="button" onClick={() => onEliminar(id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}
