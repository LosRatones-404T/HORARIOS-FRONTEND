/**
 * Estados del horario/examen generado
 */
export const ESTADOS = {
  BORRADOR: 'borrador',
  ENVIADO: 'enviado',
  EN_REVISION: 'en_revision',
  REVISADO: 'revisado',
  APROBADO: 'aprobado',
  RECHAZADO: 'rechazado',
};

export const ESTADO_LABELS = {
  [ESTADOS.BORRADOR]: 'Borrador',
  [ESTADOS.ENVIADO]: 'Enviado',
  [ESTADOS.EN_REVISION]: 'En Revisión',
  [ESTADOS.REVISADO]: 'Revisado',
  [ESTADOS.APROBADO]: 'Aprobado',
  [ESTADOS.RECHAZADO]: 'Rechazado',
};

export const ESTADO_COLORS = {
  [ESTADOS.BORRADOR]: 'default',
  [ESTADOS.ENVIADO]: 'info',
  [ESTADOS.EN_REVISION]: 'warning',
  [ESTADOS.REVISADO]: 'primary',
  [ESTADOS.APROBADO]: 'success',
  [ESTADOS.RECHAZADO]: 'error',
};
