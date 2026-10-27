import { Router } from "express";
import { ReportsRoutes } from "./reports_routes.ts"

export class AppRoutes {
    static get router(): Router {
        const router = Router();
        
        router.use('/reports', ReportsRoutes.router);
        return router;
    }
}