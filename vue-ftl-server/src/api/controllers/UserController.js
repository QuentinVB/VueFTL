'use strict';
import { ActiveUser } from '../../dal/dao.js';

//caller should be async !!!

//GET
export function getUser(req, res) {
  res.json({User : ActiveUser.ToObject(), methode : req.method});
}

//PUT
export function updateUser(req, res) {
  const User = req.body.User;

  ActiveUser = User;

  res.json({User : User.ToObject(), methode : req.method});
}

