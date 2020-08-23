'use strict';
const Uuid = require('uuid');
const { getRandomInt } = require('../helpers/Random');

//TODO : constraint cargo to a list of elements
/*
Hydrogen
Helium
Iron
Silicon
Thorium
Hafnium
Platinum
Tungsten
Carbon
Oxygen
Cobalt
Copper
Gold
Ezo ? DarkMatter ? Anti-matter ?
*/
const CARGOTYPES = ["Hydrogen","Helium","Iron","Silicon","Thorium","Hafnium","Platinum","Tungsten","Carbon","Oxygen","Cobalt","Copper","Gold"]
/** Class representing a cargo container, with its content*/
class Cargo {

    MAXCARGOCAPACITY = 25;
    // ?
    content= "";
    quantity=0;

    /**
     * Create a cargo container.
     * @param {string} content - The type of cargo.
     * @param {number} quantity - The quantity of cargo.
     */
    constructor(content,quantity) {
      this.content = content;
      if(quantity<0) throw "cant fill a negative quantity"
      this.quantity = Math.min(quantity,this.MAXCARGOCAPACITY);
      this.uuid =  Uuid.v4()
    }
    /**
     * the content type of the cargo
     * @returns {string} the content type
     */
    get content()
    {
      return this.content;
    }
    /**
     * set the quantity stored in the cargo
     * @param {number} value the quantity to set
     */
    set quantity(value)
    {
      if(value<0) throw "cant fill a negative quantity"
      //TODO : throw if quantity above ?
      this.quantity = Math.min(value,this.MAXCARGOCAPACITY);
    }
    /**
     * Generate a random cargo container
     * @static
     * @returns {Cargo} a cargo object
     */
    static GetRandomCargo()
    {
      return new Cargo( CARGOTYPES[getRandomInt(CARGOTYPES.length)] ,getRandomInt(25)+1)
    }
    


    static EmptyCargo() {
      return new Cargo("Vaccum",0);
    }
  }
module.exports = Cargo;
