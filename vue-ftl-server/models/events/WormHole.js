//'use strict';

import Random from "../../helpers/Random"
import Event from "./Event";
import {WARPSHIPTORANDOMDESTINATION,SETEVENTSTATE,CLOSEEVENT} from "./EventActions";


export default class WormHole extends Event{
  //TODO : inject fuel amount gained in state data
  constructor(name,player,statesData) {
    
    super(name, player)
    


    this.states= [
        {
          message:"A wormhole orbit the star, your sensor detect other star beyond",
          options:[
            {
              message:"You boldly go inside !",
              effects:[
                {action:WARPSHIPTORANDOMDESTINATION,payload:{} },
                {action:SETEVENTSTATE,payload:{eventuuid:this.uuid,state:1} }
              ]
            },
            {
              message:"Too dangerous, you left it.",
              effects:[
                {action:SETEVENTSTATE,payload:{eventuuid:this.uuid,state:2} }
              ]
            }
          ]
        },
        {
          message:"You enter the spinning convex sphere and emerge in another star system",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:"You left the wormhole, maybe someone else will use it ?",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
  
          ]}]
        }
      ]
    }
  }

  