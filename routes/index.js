import { Router } from 'express';
import { apiRoutes } from './api/index.js';

export const routes = Router()

routes.use('/api', apiRoutes);

routes.use((req, res) => res.send('Wrong route!'));
