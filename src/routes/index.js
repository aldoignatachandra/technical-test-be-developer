import { AuthRoutes } from '../modules/auth/auth_routes';
import { UserRoutes } from '../modules/user/user_routes';
import { ProductRoutes } from '../modules/product/product_routes';
import { CartRoutes } from '../modules/cart/cart_routes';

const MainRoutes = (app) => {
  // Testing Routes
  app.route('/hello').get((req, res) => {
    res.send({
      message: 'Hello World!',
    });
  });

  // Auth Routes
  AuthRoutes(app);

  // User Routes
  UserRoutes(app);

  // Product Routes
  ProductRoutes(app);

  // Cart Routes
  CartRoutes(app);
};

export default MainRoutes;
