'use strict';
//var Game = require('../models/Game'); //created model loading here
//var Player = require('../models/PLayer'); //created model loading here
var Ship = require('../models/Ship'); 


var activeShip = Ship.EmptyShip();


//GET
exports.getShip = function(req, res) {
  res.json({ship : activeShip.toObject(), methode : req.method});
};

//GET
exports.moveShipRandom= function(req, res) {
  //destination = req.body.destination;

  if(activeShip.canMove())
  {
    let rand=(Math.random()*2)-1;
    let range=1;
    activeShip.moveTo(
      {
        x:activeShip.x + rand*range,
        y:activeShip.y+ Math.sqrt(range*range - rand*rand)
      });
  }

  res.json({ship : activeShip.toObject(), methode : req.method});
};

//POST
exports.moveShipTo= function(req, res) {
  //destination = req.body.destination;
  //should be a star system uuid ?
  var destination = req.body.destination;

  if(activeShip.canMove(destination))
  {    
      activeShip.moveTo(
        {
          x:destination.x,
          y:destination.y
        });
  }

  res.json({ship : activeShip.toObject(), methode : req.method});
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