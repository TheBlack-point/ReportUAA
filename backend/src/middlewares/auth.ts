import { Request, Response, NextFunction } from 'express';
import { User } from '../models/index';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params['id']);

        if(!userId) {
            return res.status(400).json({message: 'Error en ID de usuario'});
        }

        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(400).json({message: 'Usuario no encontrado'});
        }
        next();
    } catch(err) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
}