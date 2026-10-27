import { Request, Response } from 'express';
import { Report, Reporter, Location, Area } from '../models/index';
import { CreateReportDto, validateCreateReportDto } from '../dto/CreateReportDto';

export const createReport = async (req: Request, res: Response) => {
  try {
    const errors = validateCreateReportDto(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Datos inválidos', errors });
    }

    const data: CreateReportDto = req.body;

    const reporter = await Reporter.findByPk(data.fk_idReporter);
    if (!reporter) {
      return res.status(404).json({ message: 'El usuario no existe' });
    }

    const location = await Location.findByPk(data.fk_idLocation);
    if (!location) {
      return res.status(404).json({ message: 'La ubicación no existe' });
    }

    const area = await Area.findByPk(data.fk_idArea);
    if (!area) {
      return res.status(404).json({ message: 'El área no existe' });
    }

    const report = await Report.create({
      elementCode: data.elementCode,
      description: data.description,
      issueType: data.issueType,
      priority: data.priority,
      fk_idReporter: data.fk_idReporter,
      fk_idLocation: data.fk_idLocation,
      fk_idArea: data.fk_idArea,
      inspectionVisit: data.inspectionVisit,
      notes: data.notes,
    });

    return res.status(201).json(report);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'No se pudo registrar el reporte' });
  }
};
