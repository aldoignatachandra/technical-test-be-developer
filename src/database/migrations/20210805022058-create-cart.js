'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carts', {
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
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'item_id',
      },
      qty: {
        allowNull: false,
        type: Sequelize.DECIMAL(25, 2),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(25, 4),
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL(25, 4),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(['waiting', 'shipping', 'delivered']),
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
    await queryInterface.dropTable('carts');
  },
};
