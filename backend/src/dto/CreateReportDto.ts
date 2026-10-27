export interface CreateReportDto {
  elementCode: string;
  description: string;
  issueType: string;
  priority: number;
  fk_idReporter: number;
  fk_idLocation: number;
  fk_idArea: number;
  inspectionVisit?: boolean;
  notes?: string;
}

const isText = (value: unknown, max?: number): boolean => {
  if (typeof value !== 'string' || value.trim() === '') return false;
  return max === undefined || value.length <= max;
};

const isPositiveInt = (value: unknown): boolean => {
  return Number.isInteger(value) && (value as number) > 0;
};

export const validateCreateReportDto = (data: any): string[] => {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    return ['El cuerpo de la petición es obligatorio'];
  }

  if (!isText(data.elementCode, 50)) {
    errors.push('elementCode es obligatorio (máximo 50 caracteres)');
  }
  if (!isText(data.description)) {
    errors.push('description es obligatoria');
  }
  if (!isText(data.issueType, 100)) {
    errors.push('issueType es obligatorio (máximo 100 caracteres)');
  }
  if (!isPositiveInt(data.priority)) {
    errors.push('priority debe ser un número entero mayor a 0');
  }
  if (!isPositiveInt(data.fk_idReporter)) {
    errors.push('fk_idReporter debe ser un número entero mayor a 0');
  }
  if (!isPositiveInt(data.fk_idLocation)) {
    errors.push('fk_idLocation debe ser un número entero mayor a 0');
  }
  if (!isPositiveInt(data.fk_idArea)) {
    errors.push('fk_idArea debe ser un número entero mayor a 0');
  }
  if (data.inspectionVisit !== undefined && typeof data.inspectionVisit !== 'boolean') {
    errors.push('inspectionVisit debe ser true o false');
  }
  if (data.notes !== undefined && typeof data.notes !== 'string') {
    errors.push('notes debe ser texto');
  }

  return errors;
};
