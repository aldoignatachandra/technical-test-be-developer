'use strict';

const products = [
  {
    user_id: 1,
    item_name: 'keyboard',
    item_code: '77eb15df-ca6e-4f66-ab82-08cb42d508f3',
    price: 1000000,
    type: 'eletronik',
    uom: 'pcs',
    qty: 50,
    description: 'mechanical keyboard',
    created_by: 'aldoignatachandra@gmail.com',
    updated_by: 'aldoignatachandra@gmail.com',
  },
  {
    user_id: 1,
    item_name: 'mouse',
    item_code: 'aaa418c2-131f-4212-9a97-a0862cb0276e',
    price: 75000,
    type: 'eletronik',
    uom: 'pcs',
    qty: 100,
    description: 'mouse gaming',
    created_by: 'aldoignatachandra@gmail.com',
    updated_by: 'aldoignatachandra@gmail.com',
  },
  {
    user_id: 1,
    item_name: 'monitor',
    item_code: '6d41d17f-f132-4d58-87bd-756f4379d548',
    price: 1200000,
    type: 'eletronik',
    uom: 'pcs',
    qty: 50,
    description: 'monitor',
    created_by: 'aldoignatachandra@gmail.com',
    updated_by: 'aldoignatachandra@gmail.com',
  },
  {
    user_id: 1,
    item_name: 'handphone',
    item_code: '3397c23f-ce76-4b1f-93d4-9447219c8936',
    price: 5000000,
    type: 'eletronik',
    uom: 'pcs',
    qty: 10,
    description: 'handphone',
    created_by: 'aldoignatachandra@gmail.com',
    updated_by: 'aldoignatachandra@gmail.com',
  },
  {
    user_id: 1,
    item_name: 'jaket',
    item_code: 'a4ee254a-5810-4765-83c9-192c55f41807',
    price: 5000000,
    type: 'pakaian',
    uom: 'pcs',
    qty: 100,
    description: 'dompet',
    created_by: 'aldoignatachandra@gmail.com',
    updated_by: 'aldoignatachandra@gmail.com',
  },
  {
    user_id: 2,
    item_name: 'celana',
    item_code: 'b557ce48-2f98-42ee-b8a9-ab8df21438c6',
    price: 125000,
    type: 'pakaian',
    uom: 'pcs',
    qty: 30,
    description: 'celana',
    created_by: 'hakimubaidillah@gmail.com',
    updated_by: 'hakimubaidillah@gmail.com',
  },
  {
    user_id: 2,
    item_name: 'baju',
    item_code: 'dee4ed4c-ef8c-4b97-b11c-554aa9f768e8',
    price: 300000,
    type: 'pakaian',
    uom: 'pcs',
    qty: 70,
    description: 'baju',
    created_by: 'hakimubaidillah@gmail.com',
    updated_by: 'hakimubaidillah@gmail.com',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
