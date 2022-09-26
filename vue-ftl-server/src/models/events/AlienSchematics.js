'use strict';
import Event from "./Event.js";
import {INCREASEREACTOR,GAINCREDITS,SETEVENTSTATE,CLOSEEVENT} from "./EventActions.js";

export default class AlienSchematics extends Event{
  //TODO : inject fuel amount gained in state data
  constructor(name,User,statesData) {
    
    super(name, User)
    this.worth= 500+Math.floor(1000*Math.random());


    this.states= [
        {
          message:"As you arrive, your sensors picks a signal thats led to a strange alien \"chip\" made of precious metals.",
          options:[
            {
              message:"Plug the chip into the system...",
              effects:[
                {action:INCREASEREACTOR,payload:{factor:0.1} },

                {action:SETEVENTSTATE,payload:{eventuuid:this.uuid,state:1} }
              ]
            },
            {
              message:"Recycle the chip into valuable elements.",
              effects:[
                {action:GAINCREDITS,payload:{eventuuid:this.uuid,amount:this.worth} },
                {action:SETEVENTSTATE,payload:{eventuuid:this.uuid,state:2} }
              ]
            },
            {
              message:"Leave it.",
              effects:[
                {action:SETEVENTSTATE,payload:{eventuuid:this.uuid,state:3} }
              ]
            }
          ]
        },
        {
          message:"You plug the chip into your computer system. It contains simple instructions in your language to increase the ship main reactor power ! You quickly and easily make the change. The reactor gained 10% of efficiency !",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:"You recycle the chip and extract rare elements from it. Total worth is "+this.worth+" credits",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:"You left the chip, you don't trust those filthy xenos tech...",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        }
      ]
    }
  }

  