"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("StellarSystems", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			uuid: {
				type: Sequelize.STRING,//uuid
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			planetesCount: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			position_X: {
				type: Sequelize.FLOAT,
				defaultValue: 0,
			},
			position_Y: {
				type: Sequelize.FLOAT,
				defaultValue: 0,
			},
			position_Z: {
				type: Sequelize.FLOAT,
				defaultValue: 0,
			},
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
		await queryInterface.dropTable("StellarSystems");
	}
};