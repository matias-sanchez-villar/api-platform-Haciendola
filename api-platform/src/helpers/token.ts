import jwt from 'jsonwebtoken';
import { environment } from '../environments/environment';

export function createToken(payload: any): string {
    return jwt.sign(payload, "cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ", { expiresIn: "86400" });
}

export function verifyToken(token: string): any | null {
    try {
        const decoded = jwt.verify(token, environment.SECRET_KEY);
        return decoded;
    } catch (error) {
        return error;
    }
}

export function renewToken(token: string): string | null {
    const decoded = verifyToken(token);
    if (decoded) {
        const payload = { ...decoded };
        delete payload.iat;
        delete payload.exp;
        return createToken(payload);
    }
    return null;
}
