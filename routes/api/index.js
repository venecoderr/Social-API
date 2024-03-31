import { Router } from 'express';
import { thoughtRoutes } from './thoughtRoutes.js';
import { userRoutes } from './userRoutes.js';

export const apiRoutes = Router()

apiRoutes.use('/users', userRoutes)
apiRoutes.use('/thoughts', thoughtRoutes)

apiRoutes.use((req, res) => res.send('Use /users or /thoughts end-points'))

