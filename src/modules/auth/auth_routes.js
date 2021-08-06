import { register, login } from './auth_controller';
import validator from './auth_validator';

let path = '/v1/auth';

const AuthRoutes = (app) => {
  app.route(`${path}/register`).post(validator('register'), register);
  app.route(`${path}/login`).post(validator('login'), login);
};

export { AuthRoutes };
