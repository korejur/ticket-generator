import { Router } from 'express';
import homeRouter from './home';
import ticketsRouter from './tickets';

const router = Router();

router.use('/', homeRouter);
router.use('/tickets', ticketsRouter);

export default router;