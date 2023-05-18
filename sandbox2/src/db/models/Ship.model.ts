import { DataTypes, Model, ModelStatic, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface ShipAttributes {
    id: number;
    name: string;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ShipInput extends Optional<ShipAttributes, 'id' > {}

export interface ShipOutput extends Required<ShipAttributes> {}

class Ship extends Model<ShipAttributes, ShipInput> implements ShipAttributes {

    public id!: number
    public name!: string
    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    public static associate<M extends Model>(models:Model[]): void {
       
    }
}

Ship.init({
    id: {
        type: DataTypes.INTEGER,//TODO unsigned when not sequelize
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

}, {
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Ship