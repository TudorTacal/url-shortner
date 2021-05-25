import { Router } from 'express';
import { getUrls, postUrl } from '../controllers/url';

const router: Router = Router();

router.get('/urls', getUrls);

router.post('/url', postUrl);

export default router;
