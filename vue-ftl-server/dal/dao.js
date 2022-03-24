'use strict';

const Uuid = require('uuid');

const StarSystem = require("../models/StarSystem");
const Galaxy = require("../models/Galaxy");
const Ship = require("../models/Ship");
const Player = require('../models/Player');

//should be a way to the database & session

var activeGalaxy = Galaxy.EmptyGalaxy();
var activeShip = Ship.EmptyShip();
var activePlayer = Player.EmptyPlayer();

activePlayer.ship = activeShip.uuid

exports.ActiveShip = activeShip;
exports.ActiveGalaxy = activeGalaxy;
exports.ActivePlayer = activePlayer;

exports.getEvent = function (eventuuid)
{
    for(const starSystemuuid in activeGalaxy.galaxyMap)
    {
        const starSystem = activeGalaxy.galaxyMap[starSystemuuid];
        if(starSystem.event && starSystem.event.uuid === eventuuid ) return starSystem.event;
    }
};

exports.getCurrentStarSystem= function(playeruuid)
{
    //get player then active ship

    for(const starSystemuuid in activeGalaxy.galaxyMap)
    {
        if(starSystemuuid == activeShip.location.starsystem) return activeGalaxy.galaxyMap[starSystemuuid];
    }
}

exports.getCurrentPlanet= function(playeruuid)
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