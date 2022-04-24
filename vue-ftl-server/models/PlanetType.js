const Color = require("color");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PlanetType extends Model {
        static associate(models) {
            PlanetType.hasMany(models["Planet"]);
        }
        
        /**
         * Generate default StellarType instance
         * @static
         * @returns {PlanetType} a cargo object
         */
        static DefaultPlanetType() {
            const planetType = PlanetType.build({
                name: "Silicate",
            });
            return planetType;
        }
    }
    PlanetType.init({
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
                return Color(this.getDataValue('baseColor')).rgb().array();
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
        landable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
        {
            sequelize
        }
    );
    return PlanetType;
}