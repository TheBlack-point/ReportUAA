import { Request, Response } from 'express';
import { Report, User, Location, PhotoEvidence } from '../models/index';

// US-010: Complete Report Detail
export const getReportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
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
};

// US-007: Check Report Status
export const getReportStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
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
};

// Check generated user reports
export const getReportsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const reports = await Report.findAll({
      where: { fk_idUser: userId },
      include: [Location]
    });

    return res.status(200).json(reports);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los reportes del usuario', error });
  }
};
