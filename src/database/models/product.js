'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Product.init(
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
      itemName: {
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'item_name',
      },
      itemCode: {
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'item_code',
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 4),
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      uom: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      qty: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 2),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(255),
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
      modelName: 'Products',
      tableName: 'products',
      underscored: true,
      freezeTableName: true,
    }
  );
  return Product;
};
