import {describe, it, expect, vitest, vi} from 'vitest'; //test == it, vi == vitest
import { Server } from '../src/server.ts';
import sequelizeConnection from '../src/config/sequelize_connection.ts'
import { disconnect } from 'process';

vitest.mock('../src/server.ts');
vitest.mock('../src/conf/sequelize.connection.ts', () => ({
    default: {
        getSequelize: vi.fn().mockReturnValue({define: vi.fn()}),
        connect: vi.fn().mockResolvedValue(undefined),
        disconnect: vi.fn().mockResolvedValue(undefined)
    },
})); 

describe('app.ts config testing', ()=>{
    it('should start server', async ()=>{
        const spyDB = vi.spyOn(sequelizeConnection,'connect');

        await import('../src/app.ts');

        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port:Number(process.env.PORT),
            routes: expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalledTimes(1);
    })
})