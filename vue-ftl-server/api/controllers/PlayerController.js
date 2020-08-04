'use strict';
//var Game = require('../models/Game'); //created model loading here
//var Player = require('../models/PLayer'); //created model loading here
var Player = require('../../models/Player'); 
const dao = require('../../dal/dao');

//calle should be async !!!

//GET
exports.getPlayer = function(req, res) {
  res.json({player : dao.ActivePlayer, methode : req.method});
};

//PUT
exports.updatePlayer= function(req, res) {
  const player = req.body.player;

  dao.ActivePlayer = player;

  res.json({player : player, methode : req.method});
};

