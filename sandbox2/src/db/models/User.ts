import { DataTypes, Model, ModelStatic, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface UserAttributes {
    id: number;
    name: string;
    
    passwordHash: string;
    description?: string;
    credits?: number;
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
    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
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
        unique: true,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
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
  paranoid: true
})

export default User