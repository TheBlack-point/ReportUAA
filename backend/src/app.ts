import { Server } from './server.ts';
import { AppRoutes } from './routes/index.ts';
import dotenv from 'dotenv';
import sequelizeConnection from './conf/sequelize.connection.ts';

dotenv.config();
const port = Number(process.env['PORT']);

async function main() {
    try {
        await sequelizeConnection.connect();
        const server = new Server({port, routes:
            AppRoutes.router});
        server.start();
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}