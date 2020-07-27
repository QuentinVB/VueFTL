'use strict';

const Uuid = require('uuid');

const StarSystem = require("../models/StarSystem");
const Galaxy = require("../models/Galaxy");
const Ship = require("../models/Ship");

var activeGalaxy = Galaxy.EmptyGalaxy();

var activeShip = Ship.EmptyShip();

exports.ActiveShip = activeShip;
exports.ActiveGalaxy = activeGalaxy;