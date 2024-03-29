# Vue FTL Server

Expose REST API for SPA Client

## Commands

### run
```
npm run start
```

### global install
npm install mocha -g
### project install
npm install mocha --save-dev
### chai install
npm install --save-dev chai

## Tutorials

https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

https://medium.com/serverlessguru/how-to-unit-test-with-nodejs-76967019ba56

https://github.com/microsoft/vscode-recipes/tree/master/vuejs-cli

https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/

https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set

https://www.toptal.com/javascript/es6-class-chaos-keeps-js-developer-up

https://github.com/axios/axios

{
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${webRoot}/*",
        "webpack:///src/*": "${webRoot}/*",
        "webpack:///*": "*",
        "webpack:///./~/*": "${webRoot}/node_modules/*"
      }
    }


## Structure

building an universal "message" payload system ?

Feature VS Event VS Anomaly

## Scenarios

event : alien space station : trade iron for technology !:

Alien Tech : increase motor
Alien Temple : 
- stuff (unvisited)
- sector map ?
- schematics ?
- lore ?
Asteroid field ; deal damages
gas giant : gain random gas
Mercenary guild : crew for credits
Metalic asteroid : gain random metal
Reffinery : gas for fuel
Repair station : hull for credits
Shop : sell or buy cargo
Gift : abandonned cargo

Ship :

        bool _isAlive = true;
        
        int _oxygenSupply = 100;
        readonly Atom _fuelType = Atom.Hydrogen;
        double _lifeSupportFactor = 0.4;
        int _crew = 10;

oxygen : oxygen -= life support * crew

https://out-there.fandom.com/wiki/Random_Encounters

Gray moon-like asteroid (Gathered 5 Oxygen)
Leak in the liquid nitrogen line (Lose 15 Hull)
Space Folder malfunctioned, went far away, used again and came back (Lose 10 Fuel)
White elongated cloud (Gathered 15 Fuel)
Path crossed a very dense asteroid field (Lose 20 Hull)
Reactor shaking, something stuck in it, fuel filled ship (Lose 20 Fuel)
Cosmic rays hit strong magnetic field creating a huge aurora, but the disturbance had erased entries in database (Forget 1 Technology)
Small spot shining far away, comet coming fast straight at him. Size of a planet, used full power to escape. (Lose 20 Fuel)
Cut off a bit of his finger, tried to cauterize the wound with a soldering iron, dropped iron onto device (Broke 1 Ship Module)
Appears in a giant 3D spider web, flying between ropes next to frozen giant spiders, escaped with dents (Lose 15 Hull)
Malfunction in oxygen line, saw everything red ten black (Lose 20 Oxygen)
Noticed a weakness in the hull with a bizarre reflection of the hull, fixed it (Lose 5 Oxygen)
Came across a huge energy ball, seemed alive, grabbed ship and teleported him outside of ship and examined. (Lose 20 Oxygen)
Power surge occurred during the last jump, Space Folder is out of order (Broke Space Folder Ship Module)
Opened a big gash into a large white space whale, internal fluids repaired the hull (Gain 20 Hull)
Comet crashed on ship, was soft and filled with water and ice (Gathered 15 oxygen)
Found a forgotten construction site deep inside the core of an iron moon, tried to enter but defended itself (Lose 20 Hull)
Hit by cosmic rays, melted some of my devices. (Damage 1 Ship Module)
Encountered small automated station. (Gain 30 Fuel)
Found a hydrogen cloud which could have been born a star. (Gain 75 Fuel)
Fuel tank bumped into the ship. (Gain 50 Fuel)
Found a dead alien astronaut floating in space. (Gain 10 Oxygen)
Flew through a moon made of liquid helium, went back to collect fuel. (Gain 100 Fuel)

//civilisation level

orbital event VS ground event

