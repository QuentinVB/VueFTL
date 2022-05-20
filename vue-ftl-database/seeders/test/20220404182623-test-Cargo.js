'use strict';
const uuid = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
     queryInterface.bulkInsert(
      'Cargo',
      [
        {
          id: 1,
          uuid: uuid.v4(),
          content:"Hydrogen",
          quantity:20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
     queryInterface.bulkDelete('Cargo', null, {});
  }
};
