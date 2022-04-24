'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: { type: Sequelize.STRING },
      fuel: { type: Sequelize.FLOAT, defaultValue: 0 },
      fuelEfficiency: { type: Sequelize.FLOAT, defaultValue: 0.2 },//TODO should be const
      hull: { type: Sequelize.FLOAT, defaultValue: 0 },
      hullFactor: { type: Sequelize.FLOAT, defaultValue: 0.9 },//TODO should be const
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ships');
  }
};