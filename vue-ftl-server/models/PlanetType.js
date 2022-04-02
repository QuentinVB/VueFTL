import Color from "color";
import { Model, DataTypes } from "sequelize";

export default class PlanetType extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            baseColor: {
                type: DataTypes.STRING,
                defaultValue: "#000000",
            },
            colorRGB: {
                type: DataTypes.VIRTUAL,
                get() {
                    return Color(this.getDataValue('baseColor')).rgb() ;
                  },
                  set(value) {
                    if(!Array.isArray(value) | value.length != 3) throw new Error('setting RGB must be an array with 3 number');
                    this.setDataValue('baseColor',Color.rgb(value).hex())
                  }
            },
            baseRadius: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
            landable: {
                type: DataTypes.BOOLEAN,
            },
        },
            {
                sequelize
            }
        );
    }
}