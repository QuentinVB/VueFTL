'use strict';
import { v4 as uuidv4 } from 'uuid';
import { Model, DataTypes } from "sequelize";

export default class User extends Model{
    static STARTCREDITS = 500;
    constructor(username, uuid)
    {
      super({
        username: username,
        uuid: uuid
      });

    }
    //TODO : getter/setter from SEQUELIZE
    get credits()
    {
      return this._credits;
    }
    set credits(value)
    {
      this._credits=value;
      if(this._credits <= 0) this._credits = 0;
    }

    static EmptyUser() {
      const User = new User("John Doe",uuidv4());
      return User;
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
              password: {
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
            },
          }, 
          { 
              sequelize 
          }
      );
  }
}
