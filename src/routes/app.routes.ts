import { Router } from 'express';

import AppController from '@src/controllers/AppController';

const routes = Router();

routes.get('/', AppController.health);

export default routes;
