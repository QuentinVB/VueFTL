'use strict';

//import Galaxy from'../../models/Galaxy'; 

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
  res.json({galaxy : dao.ActiveGalaxy.ToObject(), methode : req.method});
};

exports.getStarSystem = function(req, res) {

  const uuid = req.params.starsystemuuid;
  const starSystem = dao.ActiveGalaxy.galaxyMap[uuid].ToObject();

  if(!starSystem)
  {
    res.status(404).send('not found');
  }
  else
  {
    res.json({starSystem : starSystem, methode : req.method});
  }
};

exports.getStarSystemEvent = function(req, res) {

  const uuid = req.params.starsystemuuid;
  const starSystem = dao.ActiveGalaxy.galaxyMap[uuid];
  

  if(!starSystem)
  {
    res.status(404).send('not found');
  }
  else
  {
    const starSystemEvent = starSystem.event.ToObject();
    res.json({event : starSystemEvent, methode : req.method});
  }
};

//POST
exports.minePlanet = function(req, res) {

  const planetuuid = req.params.planetuuid;
  const starsystemuuid = req.params.starsystemuuid;
  const starSystem = dao.ActiveGalaxy.galaxyMap[starsystemuuid];
  const planet = starSystem.getPlanet(planetuuid);

  if(!planet || !starSystem)
  {
    res.status(404).send('not found');
  }
  else
  {
    const fuel = dao.ActiveShip.fuel;
    var minedfuel = planet.minePlanet();

    minedfuel = Math.abs(dao.ActiveShip.FUELMAX - (dao.ActiveShip.fuel + minedfuel));
    dao.ActiveShip.fuel+=minedfuel;

    res.json({starSystem : starSystem.ToObject(), fuelmined: minedfuel,  methode : req.method});
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