export interface RegisterObservationDto {
  notes: string;
}

export function validateRegisterObservationDto(body: unknown): string[] {
  const errors: string[] = [];

  if (!body || typeof body !== 'object') {
    errors.push('El cuerpo de la petición es inválido');
    return errors;
  }

  const { notes } = body as Record<string, unknown>;

  if (typeof notes !== 'string' || notes.trim().length === 0) {
    errors.push('El campo notes es obligatorio y debe ser un texto no vacío');
  }

  return errors;
}
