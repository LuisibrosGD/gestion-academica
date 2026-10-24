export const CARRERAS = [
  'Ingeniería de Sistemas',
  'Ingeniería de Software',
  'Administración de Empresas',
  'Contabilidad',
  'Derecho',
  'Psicología',
  'Arquitectura',
  'Medicina',
];

export const CARRERA_VACIA = '';

export function esCarreraValida(carrera) {
  return CARRERAS.includes(carrera);
}
