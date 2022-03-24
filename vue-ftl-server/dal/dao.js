'use strict';

import Uuid from 'uuid';
import StarSystem from "../models/StarSystem.js";
import { EmptyGalaxy } from "../models/Galaxy.js";
import { EmptyShip } from "../models/Ship.js";
import { EmptyPlayer } from '../models/Player.js';

//should be a way to the database & session

var activeGalaxy = EmptyGalaxy();
var activeShip = EmptyShip();
var activePlayer = EmptyPlayer();

activePlayer.ship = activeShip.uuid

export const ActiveShip = activeShip;
export const ActiveGalaxy = activeGalaxy;
export const ActivePlayer = activePlayer;

export function getEvent (eventuuid)
{
    for(const starSystemuuid in activeGalaxy.galaxyMap)
    {
        const starSystem = activeGalaxy.galaxyMap[starSystemuuid];
        if(starSystem.event && starSystem.event.uuid === eventuuid ) return starSystem.event;
    }
}

export function getCurrentStarSystem(playeruuid)
{
    //get player then active ship

    for(const starSystemuuid in activeGalaxy.galaxyMap)
    {
        if(starSystemuuid == activeShip.location.starsystem) return activeGalaxy.galaxyMap[starSystemuuid];
    }
}

export function getCurrentPlanet(playeruuid)
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