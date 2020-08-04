'use strict';
const Uuid = require('uuid');


class Player {
    constructor(username,uuid,) {
      this.username = username;
      this.uuid =  uuid
      this.credits = 0;
      this.ship="";

      this.activeEvent;
    }
    static EmptyPlayer() {
      const player = new Player("John Doe",Uuid.v4());
      player.credits = 0;
      return player;
    }
  }
module.exports = Player;
