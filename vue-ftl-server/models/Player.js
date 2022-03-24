'use strict';
import User from "./User.js";
import { v4 as uuidv4 } from 'uuid';

export default class Player extends User{
    static STARTCREDITS = 500;
    constructor(username,uuid) {
      super(username,uuid);

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
      const player = new Player("John Doe",uuidv4());
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
