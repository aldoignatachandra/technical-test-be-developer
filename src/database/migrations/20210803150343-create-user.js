'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(255),
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(255),
        field: 'last_name',
      },
      telephone: {
        allowNull: true,
        type: Sequelize.STRING(15),
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM(['customer', 'owner']),
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
    await queryInterface.dropTable('users');
  },
};
