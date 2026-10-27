import type { Request, Response } from 'express';
import { Report, Reporter, User, Location, Area, PhotoEvidence } from '../models/index.ts';
import type { CreateReportDto } from '../dto/CreateReportDto.ts';
import { validateCreateReportDto } from '../dto/CreateReportDto.ts'

export class ReportController {
  // Total Report Detail
  public async getReportById(req: Request, res: Response) {
    try {
      const id = Number(req.params['id']);
      const report = await Report.findByPk(id, {
        include: [User, Location, PhotoEvidence]
      });

      if (!report) {
        return res.status(404).json({ message: 'Reporte no encontrado' });
      }

      return res.status(200).json(report);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener el reporte', error });
    }
  }

  // Check Report Status
  public async getReportStatus(req: Request, res: Response) {
    try {
      const id = Number(req.params['id']);
      const report = await Report.findByPk(id, {
        attributes: ['idReport', 'status']
      });

      if (!report) {
        return res.status(404).json({ message: 'Reporte no encontrado' });
      }

      return res.status(200).json({ status: report.status });
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener el estado', error });
    }
  }

  // Check generated user reports
  public async getReportsByUserId(req: Request, res: Response) {
    try {
      const userId = Number(req.params['id']);
      const reports = await Report.findAll({
        where: { fk_idUser: userId },
        include: [Location]
      });

      return res.status(200).json(reports);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener los reportes del usuario', error });
    }
  }

  // Create new report
  public async createReport(req: Request, res: Response) {
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
    }
}