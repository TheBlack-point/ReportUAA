import { Router } from 'express';
import { getReportById, getReportStatus, getReportsByUserId } from '../controllers/reports_controller';

const router = Router();

// US-010: Detalle[cite: 2]
router.get('/:id', getReportById);

// US-007: Estado[cite: 2]
router.get('/:id/status', getReportStatus);

// Reportes por usuario[cite: 2]
router.get('/user/:userId', getReportsByUserId);

export default router;
