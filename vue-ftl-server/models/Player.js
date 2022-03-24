'use strict';
const Uuid = require('uuid');


class Player {
    static STARTCREDITS = 500;
    constructor(username,uuid) {
      this.username = username;
      this.uuid =  uuid
      this._credits = 0;
      this.ship="";

      this.activeEvent;
    }
    get credits()
    {
      return this._credits;
    }
    set credits(value)
    {
      this._credits=value;
      if(this._credits <= 0) this._credits = 0;
    }
    static EmptyPlayer() {
      const player = new Player("John Doe",Uuid.v4());
      player.credits = Player.STARTCREDITS;
      return player;
    }
    ToObject()
    {
      return{
        username:this.username,
        uuid:this.uuid,
        credits:this._credits,
        ship:this.ship
      }
    }
  }
module.exports = Player;
