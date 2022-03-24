'use strict';
import { ActivePlayer } from '../../dal/dao.js';

//caller should be async !!!

//GET
export function getPlayer(req, res) {
  res.json({player : ActivePlayer.ToObject(), methode : req.method});
}

//PUT
export function updatePlayer(req, res) {
  const player = req.body.player;

  ActivePlayer = player;

  res.json({player : player.ToObject(), methode : req.method});
}

