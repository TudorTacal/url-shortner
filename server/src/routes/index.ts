import { Router } from 'express';
import { getUrls, addUrl } from '../controllers/url';

const router: Router = Router();

router.get('/urls', getUrls);

router.post('/add-url', addUrl);

export default router;
