export class PriorityService {
  /**
   * Determina automáticamente la prioridad de un reporte.
   * 1 = Baja, 2 = Media, 3 = Alta
   */
  public static calculatePriority(issueType: string, description: string): number {
    const textToCheck = `${issueType} ${description}`.toLowerCase();

    // Palabras clave que indican alta prioridad (riesgo eléctrico, fugas graves, fuego, seguridad)
    const highPriorityKeywords = [
      'fuego', 'cortocircuito', 'chispa', 'peligro', 'fuga de agua', 
      'gas', 'roto', 'caída', 'inundación', 'inestable'
    ];

    // Palabras clave de prioridad media
    const mediumPriorityKeywords = [
      'parpadea', 'tambalea', 'mancha', 'ruido', 'lento'
    ];

    // Evaluar si contiene palabras de alta prioridad
    for (const keyword of highPriorityKeywords) {
      if (textToCheck.includes(keyword)) {
        return 3; // Alta
      }
    }

    // Evaluar si contiene palabras de prioridad media
    for (const keyword of mediumPriorityKeywords) {
      if (textToCheck.includes(keyword)) {
        return 2; // Media
      }
    }

    // Por defecto, si no es crítico, se asigna prioridad baja
    return 1; // Baja
  }
}
