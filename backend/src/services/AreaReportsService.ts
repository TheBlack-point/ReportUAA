import { Report } from '../models/index.ts'

export class AreaReportsService {
    static async getReportsByArea(area: Number) {
        const reports = await Report.findAll({
            where: {
                fk_idArea: area
            }
        });
        return reports;
    }
}