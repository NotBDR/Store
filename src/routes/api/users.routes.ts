import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import authMiddleware from '../../middleware/auth.middleware';

const routes = Router();
routes
    .route('/')
    .get(authMiddleware, controllers.getMany)
    .post(controllers.create);
routes
    .route('/:id')
    .get(authMiddleware, controllers.getOne)
    .patch(authMiddleware, controllers.updateOne)
    .delete(authMiddleware, controllers.deleteOne);

routes.route('/auth').post(controllers.authenticate);

export default routes;
