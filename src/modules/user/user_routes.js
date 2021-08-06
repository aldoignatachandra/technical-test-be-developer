import { user, update } from './user_controller';
import validator from './user_validator';
import AuthMiddleware from '../../middlewares/authentication';

let path = '/v1/user';

const UserRoutes = (app) => {
  app.route(`${path}/details`).get(AuthMiddleware, user);
  app.route(`${path}/update/:id`).patch(AuthMiddleware, validator('update'), update);
};

export { UserRoutes };
