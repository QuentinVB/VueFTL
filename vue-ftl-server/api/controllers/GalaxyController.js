'use strict';

//import Galaxy from'../../models/Galaxy'; 

import { ActiveGalaxy, ActiveShip } from '../../dal/dao.js';
/*
exports.getstate = function(req, res) {
  res.json({message : message, methode : req.method});
};


exports.updateMessage = function(req, res) {
  console.log(req.body);
  message = req.body.message;
  
  res.json({message : message, methode : req.method});
};*/

export function getGalaxy(req, res) {
  res.json({galaxy : ActiveGalaxy.ToObject(), methode : req.method});
}

export function getStarSystem(req, res) {

  const uuid = req.params.starsystemuuid;
  const starSystem = ActiveGalaxy.galaxyMap[uuid].ToObject();

  if(!starSystem)
  {
    res.status(404).send('not found');
  }
  else
  {
    res.json({starSystem : starSystem, methode : req.method});
  }
}

export function getStarSystemEvent(req, res) {

  const uuid = req.params.starsystemuuid;
  const starSystem = ActiveGalaxy.galaxyMap[uuid];
  

  if(!starSystem)
  {
    res.status(404).send('not found');
  }
  else
  {
    const starSystemEvent = starSystem.event.ToObject();
    res.json({event : starSystemEvent, methode : req.method});
  }
}

//POST
export function minePlanet(req, res) {

  const starSystem = ActiveGalaxy.galaxyMap[req.params.starsystemuuid];
  const planet = starSystem.getPlanet(req.params.planetuuid);

  if(!starSystem||!planet)
  {
    res.status(404).send('not found');
  }
  else
  {
    let fuelmined = planet.minePlanet();
    ActiveShip.refuel(fuelmined);

    res.json({starSystem : starSystem.ToObject(),ship : ActiveShip.toObject(),  methode : req.method});
  }
}

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