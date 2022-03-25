'use strict';
import Event from "./Event.js";
import {LOADCARGO,SETEVENTSTATE,CLOSEEVENT} from "./EventActions.js";
import Cargo from "../Cargo.js";

/**
 * Class representing floating cargo event.
 * @extends Event
 */
export default class FloatingCargo extends Event{
  //TODO : inject fuel amount gained in state data
  constructor(name,player,statesData) {
    
    super(name, player)
    
    this.cargo = Cargo.GetRandomCargo();

    this.states= [
        {
          message:"A floating cargo container drifting in space...",
          options:[
            {
              message:"Pick it.",
              effects:[
                {action:LOADCARGO,payload:{cargo:this.cargo} },
                {action:SETEVENTSTATE,payload:{eventuuid:this.uuid,state:1} }
              ]
            },
            {
              message:"Leave it.",
              effects:[
                {action:SETEVENTSTATE,payload:{eventuuid:this.uuid,state:2} }
              ]
            }
          ]
        },
        {
          message:"You load the container aboard your ship cargo bay, it contains "+this.cargo.quantity+"t of "+this.cargo.content+".",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:"You left the container alone in the void of space...",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        }
      ]
    }
  }

  