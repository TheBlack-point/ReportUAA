export class PriorityService {
  /**
   * Automatically determines the priority of an issue report.
   * 1 = Low, 2 = Medium, 3 = High
   */
  public static calculatePriority(issueType: string, description: string): number {
    const textToCheck = `${issueType} ${description}`.toLowerCase();

    // Keywords indicating high priority (electrical risk, severe leaks, fire, safety)
    const highPriorityKeywords = [
      'fuego', 'cortocircuito', 'chispa', 'peligro', 'fuga de agua', 
      'gas', 'roto', 'caída', 'inundación', 'inestable'
    ];

    // Medium priority keywords
    const mediumPriorityKeywords = [
      'parpadea', 'tambalea', 'mancha', 'ruido', 'lento'
    ];

    // Evaluate if it contains high priority words
    for (const keyword of highPriorityKeywords) {
      if (textToCheck.includes(keyword)) {
        return 3; // High
      }
    }

    // Evaluate if it contains medium priority words
    for (const keyword of mediumPriorityKeywords) {
      if (textToCheck.includes(keyword)) {
        return 2; // Medium
      }
    }

    // By default, if not critical, low priority is assigned
    return 1; // Low
  }
}
