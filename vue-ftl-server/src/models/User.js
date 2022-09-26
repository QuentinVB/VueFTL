"use strict";
const { Model } =require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static STARTCREDITS = 500;
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			User.hasOne(models["Ship"]);
		}
    
		//TODO : TO JSON/To ViewModel
		ToObject() {
			return {
				username: this.username,
				uuid: this.uuid,
				credits: this._credits,
				ship: this.ship,
			};
		}
	}

	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			passwordHash: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			uuid: {
				type: DataTypes.STRING,//uuid
				allowNull: false,
			},
			credits: {
				type: DataTypes.INTEGER,
				defaultValue: this.STARTCREDITS,
				set(value) {
					this.setDataValue("credits", value <= 0 ? 0 : value);
				}
			},
		},
		{
			sequelize
		}
	);

	return User;
};