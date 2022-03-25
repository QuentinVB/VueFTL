'use strict';
import * as Random from "../../helpers/Random.js";
import Event from "./Event.js";
import {CLOSEEVENT,DAMAGESHIP} from "./EventActions.js";

//ABSTRACT !!
export default class AsteroidField extends Event{
  
  constructor(name,starSystem,statesData) {
    //procecss state data before injection
    super(name, starSystem)

    const damages = Random.getRandomInt(10)+1;
    this.states= [
      {
        message:"Your emerge from FTL right into an asteroid field and takes "+damages+" damages to your hull !",
        options:[
          {message:"Continue.",
          effects:[
            {action:DAMAGESHIP,payload:{damages:damages} },
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]
        }]
      }
    ];
    }
  }
//add random "nothing to see" text generator ?
  