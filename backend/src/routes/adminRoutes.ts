import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { uploadMedia } from '../middleware/upload';
import * as adminController from '../controllers/adminController';
import { login } from '../controllers/loginController';

const router = Router();

router.post('/login', login);
router.get('/properties', requireAdmin, adminController.listProperties);
router.get('/properties/:id', requireAdmin, adminController.getPropertyById);
router.post('/properties', requireAdmin, adminController.createProperty);
router.put('/properties/:id', requireAdmin, adminController.updateProperty);
router.delete('/properties/:id', requireAdmin, adminController.deleteProperty);
router.post('/properties/:id/images', requireAdmin, uploadMedia.array('images', 12), adminController.uploadPropertyImages);
router.post('/translate', requireAdmin, adminController.translateFields);
router.get('/leads/whatsapp', requireAdmin, adminController.listLeads);

export default router;
