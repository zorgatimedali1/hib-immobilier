import { Router } from 'express';
import * as publicController from '../controllers/publicController';
import * as leadController from '../controllers/leadController';

const router = Router();

router.get('/properties', publicController.getProperties);
router.get('/properties/:slug', publicController.getPropertyBySlug);
router.post('/leads/whatsapp', leadController.createWhatsappLead);

export default router;
