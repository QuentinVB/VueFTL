'use strict';
import * as Uuid from 'uuid' ;
import { getRandomInt } from '../helpers/Random.js';

//stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes

/** Class representing a cargo container, with its content*/
export default class Cargo {

    static MAXCARGOCAPACITY = 25;
    static CARGOTYPES = ["Hydrogen","Helium","Iron","Silicon","Thorium","Hafnium","Platinum","Tungsten","Carbon","Oxygen","Cobalt","Copper","Gold"]
    /*
    Ezo ? DarkMatter ? Anti-matter ?
    */

    
    /**
     * Create a cargo container.
     * @param {string} content - The type of cargo.
     * @param {number} quantity - The quantity of cargo.
     */
    constructor(content,quantity) {
      this._content = content;
      if(quantity<0) throw "cant fill a negative quantity"
      this._quantity = Math.min(quantity,Cargo.MAXCARGOCAPACITY);
      this.uuid =  Uuid.v4()
    }
    /**
     * the content type of the cargo
     * @returns {string} the content type
     */
    get content()
    {
      return this._content;
    }
    /**
     * set the type of the cargo
     * @param {string} value the content type to set
     */
    set content(value)
    {
      //todo : check if content is in type list
      this._content=value;
    }
    /**
     * get the quantity stored in the cargo
     * @returns {string} the quantity type
     */
    get quantity()
    {
      return this._quantity;
    }
    /**
     * set the quantity stored in the cargo
     * @param {number} value the quantity to set
     */
    set quantity(value)
    {
      if(this._quantity+value<0) throw new Error("can't fill to a negative quantity");
      //TODO : throw if quantity above ?
      this._quantity = Math.min(value,Cargo.MAXCARGOCAPACITY);
    }
    /**
     * Generate a random cargo container
     * @static
     * @returns {Cargo} a cargo object
     */
    static GetRandomCargo()
    {
      return new Cargo( Cargo.CARGOTYPES[getRandomInt(Cargo.CARGOTYPES.length)] ,getRandomInt(25)+1)
    }
    
    /**
     * Generate an empty cargo container
     * @static
     * @returns {Cargo} a cargo object
     */
    static EmptyCargo() {
      return new Cargo("Vaccum",0);
    }

    ToObject()
    {
      return {
        uuid:this.uuid,
        content:this._content,
        quantity:this._quantity
      }
    }
  }
//module.exports = Cargo;
