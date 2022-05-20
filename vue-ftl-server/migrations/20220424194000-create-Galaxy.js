"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Galaxies", {
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
			starCount: {
				type: Sequelize.INTEGER,
				defaultValue: 1,
			},
			radius: {
				type: Sequelize.INTEGER,
				defaultValue: 20,
			},
			type: {
				type: Sequelize.STRING,
				defaultValue: "round",
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
		await queryInterface.dropTable("Galaxies");
	}
};