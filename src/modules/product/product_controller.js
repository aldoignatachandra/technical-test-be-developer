import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import {
  findProductById,
  findOneProduct,
  findListProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product_repository';
import { findUserById } from '../user/user_repository';
import { v4 as uuidv4 } from 'uuid';

// Find List Product
const products = async (req, res) => {
  try {
    const { userId } = req.app.locals;
    const search = req.query.search || '';
    const myProduct = Number(req.query.myProduct || 0);
    const sortPrice = req.query.sortPrice || 'desc';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};

    if (search) requirement.search = search;
    if (myProduct) requirement.userId = userId;
    if (sortPrice) requirement.sortPrice = sortPrice;

    let result = await findListProduct(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      totalPage: Math.ceil(result.count / limit),
      totalData: result.count,
    };

    return ResponseHelper(res, 200, 'Success Get List Data Product', result.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Get List Data Product', error.message);
  }
};

// Find One Product By Id
const product = async (req, res) => {
  try {
    const { id } = req.params;

    let result = await findProductById(id);

    // Check Product Exist Or Not
    if (!result) {
      return ResponseHelper(res, 409, 'Product Is Not Exist In Database', [
        { message: 'Product Is Not Exist In Database', param: 'id' },
      ]);
    }

    return ResponseHelper(res, 200, 'Success Get Details Product', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Get Details Product', error.message);
  }
};

// Create New Data Product
const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { userId } = req.app.locals;

    let user = await findUserById(userId);

    const newProduct = await createProduct({
      ...req.body,
      itemCode: uuidv4(),
      userId,
      createdBy: user.email,
      updatedBy: user.email,
    });

    return ResponseHelper(res, 201, 'Success Create New Product', newProduct);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Create New Product', error.message);
  }
};

// Update Data Product
const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { id } = req.params;
    const { userId } = req.app.locals;
    const body = req.body;

    // Check Product Exist Or Not
    let checkProduct = await findProductById(id);
    if (!checkProduct) {
      return ResponseHelper(res, 409, 'Product Is Not Exist In Database', [
        { message: 'Product Is Not Exist In Database', param: 'id' },
      ]);
    }

    // Check Product Owner
    let checkOwner = await findOneProduct({ where: { id, userId } });
    if (!checkOwner) {
      return ResponseHelper(res, 409, 'Cannot Update Other People`s Product', [
        { message: 'Cannot Update Other People`s Product', param: 'user_id' },
      ]);
    }

    let user = await findUserById(userId);

    // Update Product
    await updateProduct({ ...body, updatedBy: user.email }, { where: { id } });

    const result = await findProductById(id);

    return ResponseHelper(res, 201, 'Success Updated Selected Product', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Updated Selected Product', error.message);
  }
};

// Delete Data Product
const deleted = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.app.locals;

    // Check Product Exist Or Not
    let checkProduct = await findProductById(id);
    if (!checkProduct) {
      return ResponseHelper(res, 409, 'Product Is Not Exist In Database', [
        { message: 'Product Is Not Exist In Database', param: 'id' },
      ]);
    }

    // Check Product Owner
    let checkOwner = await findOneProduct({ where: { id, userId } });
    if (!checkOwner) {
      return ResponseHelper(res, 409, 'Cannot Delete Other People`s Product', [
        { message: 'Cannot Delete Other People`s Product', param: 'user_id' },
      ]);
    }

    let user = await findUserById(userId);

    await updateProduct({ deletedBy: user.email }, { where: { id } });

    await deleteProduct(id);

    return ResponseHelper(res, 201, 'Success Deleted Selected Product', { id: Number(id) });
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'Failed Deleted Selected Product', error.message);
  }
};

export { products, product, create, update, deleted };
