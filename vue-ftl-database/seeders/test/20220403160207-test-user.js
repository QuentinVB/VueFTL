'use strict';
const uuid = require('uuid');
/**
  * Add seed commands here.
  *
  * Example:
  * await queryInterface.bulkInsert('People', [{
  *   name: 'John Doe',
  *   isBetaMember: false
  * }], {});
 */
module.exports = {
  async up(queryInterface, Sequelize) {

    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          username: "John Doe",
          email: "john.doe@example.com",
          passwordHash: "",
          uuid: uuid.v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  }
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */, 
   async down(queryInterface, Sequelize) {

    queryInterface.bulkDelete('Users', null, {});
  }
};
