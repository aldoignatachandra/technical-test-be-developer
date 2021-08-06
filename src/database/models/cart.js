'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
      Cart.hasOne(models.Products, {
        foreignKey: 'id',
        sourceKey: 'itemId',
        as: 'product',
      });
    }
  }
  Cart.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
      },
      itemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'item_id',
      },
      qty: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 2),
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 4),
      },
      total: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 4),
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(['waiting', 'shipping', 'delivered']),
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(Date.now()),
        type: DataTypes.DATE,
        field: 'created_at',
      },
      createdBy: {
        allowNull: true,
        type: DataTypes.STRING(100),
        field: 'created_by',
        references: {
          model: { tableName: 'users' },
          key: 'email',
        },
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(Date.now()),
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      updatedBy: {
        allowNull: true,
        type: DataTypes.STRING(100),
        field: 'updated_by',
        references: {
          model: { tableName: 'users' },
          key: 'email',
        },
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
      deletedBy: {
        allowNull: true,
        type: DataTypes.STRING(100),
        field: 'deleted_by',
        references: {
          model: { tableName: 'users' },
          key: 'email',
        },
      },
    },
    {
      sequelize,
      modelName: 'Carts',
      tableName: 'carts',
      underscored: true,
      freezeTableName: true,
    }
  );
  return Cart;
};
