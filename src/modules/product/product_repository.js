import db from '../../database/models';
const { Users, Products } = db;
import { Op } from 'sequelize';

// Find One Product By Id
const findProductById = async (id) => {
  try {
    let result = await Products.findByPk(id, {
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findProductById', error);
    throw new Error(error);
  }
};

// Find One Product By Filter
const findOneProduct = async (filter) => {
  try {
    let result = await Products.findOne({
      ...filter,
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOneProduct', error);
    throw new Error(error);
  }
};

// Find List Product
const findListProduct = async ({ search, userId, sortPrice }, page, limit) => {
  try {
    let result = await Products.findAndCountAll({
      where: {
        itemName: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        userId: userId ? userId : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
      order: [[sortPrice ? 'price' : 'id', sortPrice ? sortPrice : 'desc']],
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListProduct', error);
    throw new Error(error);
  }
};

// Find All List Own Product;
const findAllListOwnProduct = async (userId) => {
  try {
    let result = await Products.findAll({
      where: { userId },
      raw: true,
      attributes: ['id', 'itemName', 'itemCode'],
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findAllListOwnProduct', error);
    throw new Error(error);
  }
};

// Create New Product
const createProduct = async (data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Products.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createProduct', error);
    throw new Error(error);
  }
};

// Update Product
const updateProduct = async (data, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Products.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateProduct', error);
    throw new Error(error);
  }
};

// Delete Product
const deleteProduct = async (productId, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Products.destroy({ where: { id: productId }, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] deleteProduct', error);
    throw new Error(error);
  }
};

export {
  findProductById,
  findOneProduct,
  findListProduct,
  findAllListOwnProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
