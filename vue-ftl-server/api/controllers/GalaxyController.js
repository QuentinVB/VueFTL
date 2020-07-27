'use strict';
//var Game = require('../models/Game'); //created model loading here
//var Player = require('../models/PLayer'); //created model loading here
var Galaxy = require('../../models/Galaxy'); 

const dao = require('../../dal/dao');

/*
exports.getstate = function(req, res) {
  res.json({message : message, methode : req.method});
};


exports.updateMessage = function(req, res) {
  console.log(req.body);
  message = req.body.message;
  
  res.json({message : message, methode : req.method});
};*/

exports.getGalaxy = function(req, res) {
  res.json({galaxy : dao.ActiveGalaxy, methode : req.method});
};

exports.getStarSystem = function(req, res) {

  const uuid = req.params.starsystemuuid;
  const starSystem = dao.ActiveGalaxy.galaxyMap[uuid];

  if(!starSystem)
  {
    res.status(404).send('not found');
  }
  else
  {
    res.json({starSystem : starSystem, methode : req.method});
  }
};

exports.mineStarSystem = function(req, res) {

  const uuid = req.params.starsystemuuid;
  const starSystem = dao.ActiveGalaxy.galaxyMap[uuid];

  if(!starSystem)
  {
    res.status(404).send('not found');
  }
  else
  {
    var minedfuel = starSystem.mineSystem();
    dao.ActiveShip.fuel+=minedfuel;

    res.json({starSystem : starSystem, fuelmined: minedfuel,  methode : req.method});
  }
};

/*
exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
*/