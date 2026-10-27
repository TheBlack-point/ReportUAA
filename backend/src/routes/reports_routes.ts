import { Router } from 'express';
import { ReportController } from '../controllers/report_controller.ts';

export class ReportsRoutes {
    static get router(): Router {
        const router = Router();
        const reportController =  new ReportController();
        
        router.get('/:id', reportController.getReportById);
        router.get('/:id/status', reportController.getReportStatus);
        router.get('/user/:userId', reportController.getReportsByUserId);
        router.post('/', reportController.createReport)

        return router;
    }
}
