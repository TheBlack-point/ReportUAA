export interface ReportResponseDto {
  idReport: number;
  title: string;
  description: string;
  status: 'Pendiente' | 'En Proceso' | 'Resuelto';
  dateCreated: Date;
  user?: {
    idUser: number;
    name: string;
    email: string;
  };
  location?: {
    idLocation: number;
    name: string;
  };
  photoEvidence?: string[];
}
