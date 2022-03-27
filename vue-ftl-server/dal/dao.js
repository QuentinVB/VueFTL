'use strict';

import Galaxy from "../models/Galaxy.js";
import Ship from "../models/Ship.js";
import User from '../models/User.js';
import DBConnection, {sequelize} from "./DBConnection.js";
import { v4 } from "uuid";

//should be a way to the database & session
/*
var activeGalaxy = Galaxy.EmptyGalaxy();
var activeShip = Ship.EmptyShip();
var activeUser = User.EmptyUser();

activeUser.ship = activeShip.uuid
*/
export const ActiveShip = null;
export const ActiveGalaxy = null;
export const ActiveUser = null;

export function getEvent(eventuuid)
{
    for(const starSystemuuid in activeGalaxy.galaxyMap)
    {
        const starSystem = activeGalaxy.galaxyMap[starSystemuuid];
        if(starSystem.event && starSystem.event.uuid === eventuuid ) return starSystem.event;
    }
}

export function getCurrentStarSystem(Useruuid)
{
    //get User then active ship

    for(const starSystemuuid in activeGalaxy.galaxyMap)
    {
        if(starSystemuuid == activeShip.location.starsystem) return activeGalaxy.galaxyMap[starSystemuuid];
    }
}

export function getCurrentPlanet(Useruuid)
{
    if(activeShip.location.planet)
    {
        for(const starSystemuuid in activeGalaxy.galaxyMap)
        {
            if(starSystemuuid == activeShip.location.starsystem) 
            {
                return activeGalaxy.galaxyMap[starSystemuuid].planets.find(p=>p.uuid == activeShip.location.planet);
            }
        }
    }
}

export function InitModels()
{
    User.init(sequelize);
    Ship.init(sequelize);
    User.hasOne(Ship);
    Ship.belongsTo(User);
    
    DBConnection.Query(async()=>{
        await User.sync();
        await Ship.sync();
        console.log(User === sequelize.models.User);
        console.log(Ship === sequelize.models.Ship);
    })
}

export function CreateUser(){
    DBConnection.Query(async()=>{
        const jane = await User.create({ username: "jane", uuid: v4() });
       // await jane.setGroup(role);
        //await jane.save();
        console.log("Jane's auto-generated ID:", jane.id);
    });
}