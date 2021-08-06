'use strict';

const users = [
  {
    email: 'aldoignatachandra@gmail.com',
    password: '$2a$10$OIGou/YOjUMvEBg0bpSsX.DZQZ8.h.xjLSTpzcdkxOyZzBoTk24yO', //aldoignata
    first_name: 'aldo',
    last_name: 'ignata chandra',
    telephone: '081234567890',
    role: 'owner',
    created_by: 'aldoignatachandra@gmail.com',
    updated_by: 'aldoignatachandra@gmail.com',
  },
  {
    email: 'hakimubaidillah@gmail.com',
    password: '$2a$10$4U7.fgjZ8DXw.pFmhBoogugcFlVa2Q/1fgM20mOEtbCgrRLwUY2e.', //hakimubaidillah
    first_name: 'hakim',
    last_name: 'ubaidillah',
    telephone: '081234123798',
    role: 'owner',
    created_by: 'hakimubaidillah@gmail.com',
    updated_by: 'hakimubaidillah@gmail.com',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', null, {});
  },
};
