'use strict';
const Random = require("../helpers/Random");
const Event = require("./Event");
import {CLOSEEVENT,DAMAGESHIP} from "./EventActions";



//ABSTRACT !!
export default class AsteroidField extends Event{
  
  constructor(name,starSystem,statesData) {
    //procecss state data before injection
    super(name, starSystem)

    this.damages = Random.getRandomInt(10)+1;
    this.states= [
      {
        message:"Your emerge from FTL right into an asteroid field and takes "+this.damages+" damages to your hull !",
        options:[
          {message:"Continue.",
          effects:[
            {action:DAMAGESHIP,payload:{damages:this.damages} },
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]
        }]
      }
    ];
    }
  }
//add random "nothing to see" text generator ?
  