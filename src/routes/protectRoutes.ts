import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/', authenticateToken, (req: Request, res: Response) => {
    res.json({ message: 'Protected route' });
});

export default router;
