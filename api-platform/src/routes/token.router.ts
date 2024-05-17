import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { renew, verify } from '../controllers/token.contollers';

const token = Router();

token.post('/verify', authenticateToken, verify);
token.post('/renew', authenticateToken, renew);

export default token;