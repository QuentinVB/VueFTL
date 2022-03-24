//'use strict';


const Event = require("./Event");
import {INCREASEREACTOR,UNLOADCARGO,SETEVENTSTATE,CLOSEEVENT} from "./EventActions";


export default class AlienAutomate extends Event{
  constructor(name,player,statesData) {
    
    super(name, player)
    this.iron= 10;
    this.gain= 0.2;
    this.hasEnoughIron = statesData.hasEnoughIron;

    this.mainMessage ="A strange sphere orbit the system. On his side are engraved some instruction \"Put "+this.iron+" iron in it and you will get faster !\""
    if(!this.hasEnoughIron)
    {
      this.currentStateIdx = 3;
    }

    this.states= [
        {
          message:this.mainMessage,
          options:[
            {
              message:"Put some iron in the sphere...",
              effects:[
                {action:UNLOADCARGO,payload:{type:"Iron",quantity:this.iron} },
                {action:INCREASEREACTOR,payload:{factor:this.gain} },
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
          message:"Just after you gave the iron, small nanobots swarms your ship. The reactor gained "+Math.round(100*this.gain)+" of efficiency !",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:"You left the sphere...",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:this.mainMessage,
          options:[{message:"You have no iron onboard...",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        }
      ]
    }
  }

