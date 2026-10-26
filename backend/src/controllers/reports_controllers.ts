import { Request, Response } from 'express';
import { Report, Reporter, Location, Area } from '../models/index';
import type { CreateReportDto } from '../dto/CreateReportDto';

export const createReport = async (req: Request, res: Response) => {
  try {
    const data: CreateReportDto = req.body;

    if (!data.elementCode || !data.description || !data.issueType) {
      return res.status(400).json({ message: 'Faltan datos del reporte' });
    }
    if (!data.priority || !data.fk_idReporter || !data.fk_idLocation || !data.fk_idArea) {
      return res.status(400).json({ message: 'Faltan datos del reporte' });
    }

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