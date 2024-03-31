import { Router } from 'express';
// import { thoughtsRoutes } from './thoughtsRoutes.js';
import { userRoutes } from './userRoutes.js';

export const apiRoutes = Router()

apiRoutes.use('/users', userRoutes)

apiRoutes.use((req, res) => res.send('Use /users or /thoughts end-points'))

