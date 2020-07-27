'use strict';


class Ship {
    constructor(name) {
      this.idx = 0;
      this.name=name;
      this.position = {x:0,y:0} ;
      this.location ="";//uuid of starsystem
      this.fuel = 5;
    }

    static EmptyShip() {
      return new Ship("Von Braun");
    }

    moveTo(coordinate)
    {
      if(this.fuel<=0) return false;
      this.fuel--;

      this.position.x = coordinate.x;
      this.position.y = coordinate.y;
      return true;
    }

    wrapTo(uuid)
    {
      if(this.fuel<=0) return false;
      this.fuel--;

      this.location = uuid;
      //falsy because a ship has no
      //this.position.x = starSystem.position.x;
      //this.position.y = starSystem.position.y;

      return true;
    }
    toObject()
    {
      //TODO ADD STATE MESSAGE ?
      return {
        name:this.name,
        position: this.position,
        location:this.location,
        fuel:this.fuel
      }
    }
    canMove(destination)
    {
      //TODO : BEWAAARG, clean up cascading condition ?
      if(this.fuel<=0) return false;
      if(destination.position)
      {
        if(destination.x == this.position.x)
        {
          if(destination.y == this.position.y) return false;
        }
      }
      if(destination.uuid)
      {
        if(destination.uuid == this.location) return false;
      }
      
      return true;
    }
  }
module.exports = Ship;
