import { listUserCart, updateUserCart } from './cart_controller';
import AuthMiddleware from '../../middlewares/authentication';

let path = '/v1/cart';

const CartRoutes = (app) => {
  app.route(`${path}/user`).get(AuthMiddleware, listUserCart);
  app.route(`${path}/user`).patch(AuthMiddleware, updateUserCart);
};

export { CartRoutes };
