import { Router } from 'express';
import { sendContactEmail } from '../controllers/contactController';
import { validateContact } from '../middlewares/validateContact';

const router = Router();

router.post('/contact', validateContact, sendContactEmail);

export default router;