import { Router } from 'express';
import { getReportById, getReportStatus, getReportsByUserId } from '../controllers/reports_controller';

const router = Router();

router.get('/:id', getReportById);

router.get('/:id/status', getReportStatus);

router.get('/user/:userId', getReportsByUserId);

export default router;
