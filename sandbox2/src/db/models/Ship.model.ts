import { DataTypes, Model, } from 'sequelize'
import sequelizeConnection from '../config'
import { ShipAttributes, ShipInput } from '../interfaces/Ship.interfaces'
import User from './User.model'

class Ship extends Model<ShipAttributes, ShipInput> implements ShipAttributes {

    public id!: number
    public name!: string

    declare userId?:number
    declare owner?:User
    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    public static associate<M extends Model>(models:any): void {
        /*this.hasOne(models.User, {
            sourceKey:'userId',
            as:'owner'
        });*/
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
    },

}, {
  sequelize: sequelizeConnection,
  paranoid: true,
  indexes: [
    { fields: ['name'], name: 'UQ_Ship_Name', unique: true }
  ]
})

export default Ship