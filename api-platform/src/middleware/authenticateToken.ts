import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/token';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    const decoded = verifyToken(token);
    if (!decoded) return res.sendStatus(403);

    req.user = decoded;
    next();
}
