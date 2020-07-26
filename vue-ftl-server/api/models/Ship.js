'use strict';


class Ship {
    constructor(name) {
      this.idx = 0;
      this.name=name;
      this.x=0;
      this.y=0;
      this.fuel = 5;
    }
    static EmptyShip() {
      return new Ship("Von Braun");
    }

    getCoordinate()
    {
      return {
        x:this.x,
        y:this.y
      } ;
    }

    moveTo(coordinate)
    {
      if(this.fuel<=0) return false;
      this.fuel--;
      this.x = coordinate.x;
      this.y = coordinate.y;
      return true;
    }
    toObject()
    {
      return {
        name:this.name,
        coordinate: this.getCoordinate(),
        fuel:this.fuel
      }
    }
    canMove()
    {
      return this.fuel>0
    }
  }
module.exports = Ship;
