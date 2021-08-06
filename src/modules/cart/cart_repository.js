import db from '../../database/models';
const { Products, Carts } = db;
import { Op } from 'sequelize';

// Find Cart By User Id
const findCartByUserId = async (userId, search, status, order, sort) => {
  try {
    let result = await Carts.findAll({
      include: [
        {
          model: Products,
          as: 'product',
          where: { itemName: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` } },
        },
      ],
      where: {
        userId,
        status: status ? status : { [Op.like]: `%%` },
      },
      order: [[order ? order : 'id', sort ? sort : 'desc']],
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findCartByUserId', error);
    throw new Error(error);
  }
};

/**
 *  Parameter (Add/Update/Delete)
 *  Add Item To Cart        -> { ...dataItem }
 *  Update Item On Cart     -> { id: 1 , ...dataItem }
 *  Delete Item From Cart   -> { delete: 1, id: 1 , ...dataItem }
 */
// Update User Cart
const updateCart = async (user, data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    for (let cart of data) {
      if (!cart.id) {
        // Add New Item On Cart
        await Carts.create(
          {
            ...cart,
            userId: user.id,
            status: 'waiting',
            createdBy: user.email,
            updatedBy: user.email,
          },
          { transaction: t }
        );

        // Decrement Product Qty From List Product
        await Products.decrement('qty', {
          by: Number(cart.qty),
          where: { id: cart.itemId },
          transaction: t,
        });
      } else if (cart.id && cart.delete) {
        // Delete Item From Cart (Escape Paranoid)
        await Carts.destroy({ where: { id: cart.id }, force: true, transaction: t });

        // Increment Product Qty From List Product
        await Products.increment('qty', {
          by: Number(cart.qty),
          where: { id: cart.itemId },
          transaction: t,
        });
      } else if (cart.id) {
        // Update Item On Cart
        // UNDER MAINTENANCE
      }
    }
    if (!transaction) t.commit();
    return data;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] userCart', error);
    throw new Error(error);
  }
};

export { findCartByUserId, updateCart };
