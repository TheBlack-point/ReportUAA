export enum IssueType{
  Furniture = 'Mobiliario',
  ScreensComputers = 'Pantallas - Computadoras',
  NetworkEquipment = 'Equipo de red',
  Electricity = 'Electricidad',
  Plumbing = 'Plomería',
  Infrastructure = 'Infraestructura',
}

export enum Department{
  Maintenance = 'Mantenimiento',
  Systems = 'Sistemas',
  Networks = 'Redes',
}

export class ClassificationService {
  /*assigns the department that attends the report, based on the issue type and the description.*/
  public static classify(issueType: string, description: string): Department{
    const text = description.toLowerCase();

    const damageKeywords = ['roto', 'rota', 'quebrado', 'estrellada', 'golpe'];
    const networkKeywords = ['internet', 'wifi', 'conexión', 'conexion'];

    const isDamage = damageKeywords.some((word) => text.includes(word));
    const isNetwork = networkKeywords.some((word) => text.includes(word));

    if(issueType === IssueType.ScreensComputers){
      if (isDamage) return Department.Maintenance;
      if (isNetwork) return Department.Networks;
      return Department.Systems;
    }

    if(issueType === IssueType.NetworkEquipment){
      if (isDamage) return Department.Maintenance;
      return Department.Networks;
    }

    //furniture, electricity, plumbing and infrastructure
    return Department.Maintenance;
  }
}