import { Router } from 'express';

import AppRoutes from '@src/routes/app.routes';

const routes = Router();

routes.use('/health', AppRoutes);

export default routes;
