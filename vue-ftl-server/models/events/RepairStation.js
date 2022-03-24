//'use strict';


const Event = require("./Event");
import {REPAIRSHIP,LOSECREDITS,SETEVENTSTATE,CLOSEEVENT} from "./EventActions";


export default class RepairStation extends Event{
  constructor(name,player,statesData) {
    
    super(name, player)
    this.repairPoints= 20;
    this.cost = 100;
    this.hasEnoughCredits = statesData.hasEnoughCredits;
    this.hasADamagedShip = statesData.hasADamagedShip;

    this.mainMessage ="A space station made of scraps orbit the system. It's filled with mechanical arms and sensors... It looks like a giant metal space spider. As you approach your computer recieve a transmission \""+this.cost+" credits to us, ship repaired for you.\""
    if(!this.hasEnoughCredits)
    {
      this.currentStateIdx = 3;
    }
    if(!this.hasADamagedShip)
    {
      this.currentStateIdx = 4;
    }

    this.states= [
        {
          message:this.mainMessage,
          options:[
            {
              message:"Give the credit chip to one of those arms...",
              effects:[
                {action:REPAIRSHIP,payload:{repairPoints:this.repairPoints} },
                {action:LOSECREDITS,payload:{amount:this.cost} },
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
          message:"Automated arm welder and wrench began their work on your ship's hull. It regained "+Math.round(this.repairPoints)+" points !",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:"You left the station...",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:this.mainMessage,
          options:[{message:"You have not enough credits...",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:this.mainMessage,
          options:[{message:"You have no use of the station and left the dock...",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        }
      ]
    }
  }

