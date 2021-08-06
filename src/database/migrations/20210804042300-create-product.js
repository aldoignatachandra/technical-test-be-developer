'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
      },
      itemName: {
        allowNull: false,
        type: Sequelize.STRING(255),
        field: 'item_name',
      },
      itemCode: {
        allowNull: false,
        type: Sequelize.STRING(255),
        field: 'item_code',
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(25, 4),
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      uom: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      qty: {
        allowNull: false,
        type: Sequelize.DECIMAL(25, 2),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(Date.now()),
        type: Sequelize.DATE,
        field: 'created_at',
      },
      createdBy: {
        allowNull: true,
        type: Sequelize.STRING(100),
        field: 'created_by',
        references: {
          model: { tableName: 'users' },
          key: 'email',
        },
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(Date.now()),
        type: Sequelize.DATE,
        field: 'updated_at',
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.STRING(100),
        field: 'updated_by',
        references: {
          model: { tableName: 'users' },
          key: 'email',
        },
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
      deletedBy: {
        allowNull: true,
        type: Sequelize.STRING(100),
        field: 'deleted_by',
        references: {
          model: { tableName: 'users' },
          key: 'email',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
