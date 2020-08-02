'use strict';

const Uuid = require('uuid');

const StarSystem = require("../models/StarSystem");
const Galaxy = require("../models/Galaxy");
const Ship = require("../models/Ship");

//should be a way to the database & session

var activeGalaxy = Galaxy.EmptyGalaxy();
var activeShip = Ship.EmptyShip();

exports.ActiveShip = activeShip;
exports.ActiveGalaxy = activeGalaxy;

exports.getEvent = function (eventuuid)
{
    //filter more efficient => NOPE
    for(const starSystemuuid in activeGalaxy.galaxyMap)
    {
        const starSystem = activeGalaxy.galaxyMap[starSystemuuid];
        if(starSystem.event && starSystem.event.uuid === eventuuid ) return starSystem.event;
    }
};