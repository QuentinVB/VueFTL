'use strict';

const StarSystem = require("./StarSystem");
const dao = require('../dal/dao');
const Uuid = require('uuid');


class Ship {
    HULLMAX = 100;
    FUELMAX = 100;
    FUELCONSUMPTION = 5;

    constructor(name,uuid) {
      this.uuid = uuid;
      this.name=name;
      this.position = {x:0,y:0} ;
      this.location ="";//uuid of starsystem

      this.fuel = this.FUELMAX;
      this.fuelEfficiency = 0.8;

      this.hull = this.HULLMAX;
      this.hullFactor = 0.9;
    }

    static EmptyShip() {
      return new Ship("Von Braun",Uuid.v4());
    }

    consumeFuel()
    {
      if(this.fuel<=0) return false;
      this.fuel -= this.FUELCONSUMPTION*this.fuelEfficiency;
    }

    takeDamage(damages)
    {
      this.hull -= Math.floor(damages*this.hullFactor);
    }

    moveTo(coordinate)
    {
      
      this.consumeFuel();

      this.position.x = coordinate.x;
      this.position.y = coordinate.y;
      return true;
    }

    wrapTo(uuid)
    {
      this.consumeFuel();
      this.location = uuid;
      //falsy because a ship has no
      this.position = dao.ActiveGalaxy.galaxyMap[uuid].position;


      return true;
    }
    setLocationTo(uuid)
    {
      this.location = uuid;
      //falsy because a ship has no
      this.position = dao.ActiveGalaxy.galaxyMap[uuid].position;
      return true;
    }
    toObject()
    {
      //TODO ADD STATE MESSAGE ?
      return {
        name:this.name,
        position: this.position,
        location:this.location,
        fuel:this.fuel,
        hull:this.hull,
        fuelEfficiency:this.fuelEfficiency,
        hullFactor:this.hullFactor
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
