'use strict';
import { Model, DataTypes } from "sequelize";

export default class User extends Model {
    constructor(username, uuid) {
        super({});
        this.username = username;
        this.uuid = uuid;
    }
    static init(sequelize) {
        return super.init(
            {
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                uuid: {
                    type: DataTypes.STRING//UUID
                }
            }, 
            { 
                sequelize 
            }
        );
    }
}
