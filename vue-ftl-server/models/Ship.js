'use strict';

const StarSystem = require("./StarSystem");
const dao = require('../dal/dao');
const Uuid = require('uuid');
const Cargo = require("./Cargo");


class Ship {
    HULLMAX = 100;
    FUELMAX = 100;
    FUELCONSUMPTION = 5;

    constructor(name,uuid) {
      this.uuid = uuid;
      this.name=name;
      this.position = {x:0,y:0} ;
      this.location ={starsystem:"",planet:"",situation:"orbiting"};//uuid of starsystem

      this.fuel = this.FUELMAX;
      this.fuelEfficiency = 0.2;//20%

      this.hull = this.HULLMAX;
      this.hullFactor = 0.9;

      this.cargoBay=[];
    }

    static EmptyShip() {
      const ship = new Ship("Von Braun",Uuid.v4());
      ship.loadCargo(new Cargo("Iron",80));
      return ship;
    }
    /**
     * Try to load cargo into the cargo bay
     * @param {Cargo} cargo cargo to load 
     * @return {boolean} true if the loading succeded, else false
     */
    loadCargo(cargo)
    {
      //TODO : check if same cargo already exist, if so stack it correctly
      this.cargoBay.push(cargo);
    }
    consumeFuel()
    {
      //TODO : the more cargo aboard, the more the fuel consumption !
      if(this.fuel<=0) return false;
      this.fuel= (this.fuel - this.FUELCONSUMPTION*(1-this.fuelEfficiency)).toFixed(1);
    }
    /**
     * Refuel the ship with the specified amount of fuel
     * @param {Number} amount amount of fuel to load into the ship
     */
    refuel(amount)
    {
      this.fuel = Math.min(this.fuel + amount,this.FUELMAX);
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

    wrapToSystem(uuid)
    {
      this.consumeFuel();
      
      this.location.starsystem = uuid;
      this.location.planet = "";
      this.location.situation = "orbiting";

      this.position = dao.ActiveGalaxy.galaxyMap[uuid].position;


      return true;
    }
    moveToPlanet(planetUUID)
    {
      this.consumeFuel();
      this.location.planet = planetUUID;
      this.location.situation = "orbiting";
      return true;
    }
    landOnPlanet()
    {
      if(this.location.situation="orbiting" && this.location.planet)
      {
        //take damage ?
        this.location.situation = "landed";
        return true;
      }
      return false;
    }
    takeOffFromPlanet()
    {
      if(this.location.situation="landed" && this.location.planet)
      {
        this.consumeFuel();
        this.location.situation = "orbiting";
        return true;
      }
      return false;
    }

    setLocationTo(uuid)
    {
      this.location.starsystem = uuid;
      this.location.planet = "";
      this.location.situation = "orbiting";

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
        hullFactor:this.hullFactor,
        cargoBay:this.cargoBay //should call a building function ?
      }
    }
    canMove(starsystemUUID,planetUUID)
    {
      //TODO : BEWAAARG, clean up cascading condition ?
      if(this.fuel<=0) return false;
      /*
      if(destination.position)
      {
        if(destination.x == this.position.x)
        {
          if(destination.y == this.position.y) return false;
        }
      }*/

      if(starsystemUUID && !planetUUID)
      {
        if(starsystemUUID == this.location.starsystem) return false;
      }
      if(starsystemUUID && planetUUID)
      {
        if(planetUUID == this.location.planet) return false;
      }
      
      return true;
    }
  }
module.exports = Ship;
