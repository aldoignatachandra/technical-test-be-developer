import ResponseHelper from '../../helpers/response_helper';
import { findCartByUserId, updateCart } from './cart_repository';
import { findUserById } from '../user/user_repository';
import { findAllListOwnProduct } from '../product/product_repository';

// Get Data Cart Per User Login
const listUserCart = async (req, res) => {
  try {
    const { userId } = req.app.locals;
    const search = req.query.search;
    const order = req.query.order;
    const sort = req.query.sort;
    const status = 'waiting'; // Only 'Waiting' For Development

    let result = await findCartByUserId(userId, search, status, order, sort);

    return ResponseHelper(res, 200, 'Success Get List User Cart', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Get List User Cart', error.message);
  }
};

// Action User Cart
const updateUserCart = async (req, res) => {
  try {
    const { userId } = req.app.locals;

    // Get Data User Login
    let user = await findUserById(userId);

    // Set Data For Update Spesific User Cart
    let setData = req.body;

    // Check Data Item ( Cannot Add/Update Your Own Item To Cart)
    let dataItem = await findAllListOwnProduct(userId);
    for (let item of setData) {
      let foundItem = dataItem.findIndex((e) => e.id === item.itemId);
      if (foundItem > -1) {
        return ResponseHelper(res, 409, 'Cannot Add Your Own Product To Cart', [
          {
            message: 'Cannot Add Your Own Product To Cart',
            itemData: {
              id: item.itemId,
              itemName: dataItem[foundItem].itemName,
              itemCode: dataItem[foundItem].itemCode,
            },
          },
        ]);
      }
    }

    // Add/Update/Delete Data Item From Cart
    let result = await updateCart(user, setData);

    return ResponseHelper(res, 201, 'Success Update User Cart', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Update User Cart', error.message);
  }
};

export { listUserCart, updateUserCart };
