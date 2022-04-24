const Color = require("color");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StellarType extends Model {
        static associate(models) {
            StellarType.hasMany(models["StarSystem"]);
        }
    }
    StellarType.init({
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
                return Color(this.getDataValue('baseColor')).rgb();
            },
            set(value) {
                if (!Array.isArray(value) | value.length != 3) throw new Error('setting RGB must be an array with 3 number');
                this.setDataValue('baseColor', Color.rgb(value).hex())
            }
        },
        baseRadius: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
    },
        {
            sequelize
        }
    );
    return StellarType;
}