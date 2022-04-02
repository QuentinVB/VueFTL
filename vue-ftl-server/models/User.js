'use strict';
import { v4 as uuidv4 } from 'uuid';
import { Model, DataTypes } from "sequelize";

export default class User extends Model{
    static STARTCREDITS = 500;

    static init(sequelize) {
      return super.init(
          {
              username: {
                  type: DataTypes.STRING,
                  allowNull: false,
              },
              email:{
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
                defaultValue:this.STARTCREDITS,
                set(value)
                {
                 this.setDataValue('credits',value <= 0 ? 0 : value)
                }
            },
          }, 
          { 
              sequelize 
          }
      );
    }

    static EmptyUser() {
      const user = User.build(
        {
          username:"John Doe",
          email:"john.doe@example.com",
          passwordHash:"",
          uuid:uuidv4()
      });
      return user;
    }
    //TODO : TO JSON/To ViewModel
    ToObject()
    {
      return{
        username:this.username,
        uuid:this.uuid,
        credits:this._credits,
        ship:this.ship,
      }
    }
}
