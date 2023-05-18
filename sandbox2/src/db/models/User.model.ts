import { DataTypes, Model, ModelStatic, Optional } from 'sequelize'
import sequelizeConnection from '../config'

import { IAssociable } from '../interfaces/IAssociable';
import { UserAttributes, UserInput } from '../interfaces/User.interfaces';
import Ship from './Ship.model';


class User extends Model<UserAttributes, UserInput> implements UserAttributes {

    static STARTCREDITS = 500;

    public id!: number
    public name!: string
    public passwordHash!: string
    public description!: string
    public credits!: number

    declare ships?: Ship[]

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static associate<M extends Model>(models:any): void {
        this.hasMany(models.Ship, {
            sourceKey:'id',
            foreignKey: {
                allowNull: true,
                name: 'userId',
            },
            as:'ships'
        });
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,//TODO unsigned
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
    },
    /*
    shipId: {
        type: DataTypes.INTEGER,
        references: {
            model: Ship,
            key: 'id'
        }
    },
    */
    credits: {
		type: DataTypes.INTEGER,
		defaultValue: User.STARTCREDITS,
		/*set(value:number) {
			this.setDataValue("credits", value <= 0 ? 0 : value);
		}*/
	}
}, {
  sequelize: sequelizeConnection,
  paranoid: true,
  //https://github.com/sequelize/sequelize/issues/8984
  indexes: [
    { fields: ['name'], name: 'UQ_User_Name', unique: true }
  ]
})




export default User