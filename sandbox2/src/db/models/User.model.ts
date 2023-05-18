import { DataTypes, Model, ModelStatic, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Ship from './Ship.model';
import { IAssociable } from '../interfaces/IAssociable';

interface UserAttributes {
    id: number;
    name: string;
    
    passwordHash: string;
    description?: string;
    credits?: number;

    shipId?: number;
    ship?: Ship;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'passwordHash' > {
    password: string;
}

export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {

    static STARTCREDITS = 500;

    public id!: number
    public name!: string
    public passwordHash!: string
    public description!: string
    public credits!: number

    public shipId!: number
    declare ship:Ship
    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static associate<M extends Model>(models:any): void {
        User.hasOne(models.Ship, {
            foreignKey: {
                allowNull: true,
                name: 'shipId'
            }
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
    shipId: {
        type: DataTypes.INTEGER,
        references: {
            model: Ship,
            key: 'id'
        }
    },
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