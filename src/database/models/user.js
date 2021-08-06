'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Products, {
        foreignKey: 'userId',
        as: 'products',
      });
      User.hasMany(models.Carts, {
        foreignKey: 'userId',
        as: 'carts',
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'last_name',
      },
      telephone: {
        allowNull: true,
        type: DataTypes.STRING(15),
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM(['customer', 'owner']),
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
      modelName: 'Users',
      tableName: 'users',
      underscored: true,
      freezeTableName: true,
    }
  );
  return User;
};
