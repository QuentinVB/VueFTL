'use strict';
 /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
export async function up(queryInterface, Sequelize) {
  
  queryInterface.bulkInsert(
    'Users',
    [
      {
        id: 1,
        username: "John Doe",
        email: "john.doe@example.com",
        passwordHash: "",
        uuid: uuidv4(),
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
   */
export async function down(queryInterface, Sequelize) {

   queryInterface.bulkDelete('Users', null, {});
}
