'use strict';
import Event from "./Event.js";
import {REFUELSHIP,SETEVENTSTATE,CLOSEEVENT} from "./EventActions.js";

/**
 * Class representing floating fuel event.
 * @extends Event
 */
export default class FloatingFuel extends Event{
  //TODO : inject fuel amount gained in state data
  constructor(name,User,statesData) {
    
    super(name, User)
    


    this.states= [
        {
          message:"A floating fuel tank drifting in space...",
          options:[
            {
              message:"Pick it.",
              effects:[
                {action:REFUELSHIP,payload:{amount:1} },//inject state data here
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
          message:"You pick the fuel tank, to precious to spare !",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:"You left the tank alone in the void of space...",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
  
          ]}]
        }
      ]
    }
  }

  