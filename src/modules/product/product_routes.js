import { products, product, create, update, deleted } from './product_controller';
import validator from './product_validator';
import AuthMiddleware from '../../middlewares/authentication';

let path = '/v1/product';

const ProductRoutes = (app) => {
  app.route(`${path}/list`).get(AuthMiddleware, products);
  app.route(`${path}/details/:id`).get(AuthMiddleware, product);
  app.route(`${path}/create`).post(AuthMiddleware, validator('create'), create);
  app.route(`${path}/update/:id`).patch(AuthMiddleware, validator('update'), update);
  app.route(`${path}/delete/:id`).delete(AuthMiddleware, deleted);
};

export { ProductRoutes };
