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

npx sequelize-cli seed:generate --name test-products

### tests commands
    "pretest": "cross-env NODE_ENV=test npm run db:reset",
    "db:reset": "resetTestdb.bat && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all --seeders-path ./seeders/test",
    "db:create:test": "cross-env NODE_ENV=test npx sequelize-cli db:create"
### Sequelize test connection 
static async TestConnection()
  {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
## Tutorials

https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

https://medium.com/serverlessguru/how-to-unit-test-with-nodejs-76967019ba56

https://github.com/microsoft/vscode-recipes/tree/master/vuejs-cli

https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/

stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes

https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set

https://www.toptal.com/javascript/es6-class-chaos-keeps-js-developer-up

https://github.com/axios/axios

https://www.npmjs.com/package/bcrypt

https://www.npmjs.com/package/color

https://medium.com/nowports-tech/expressjs-and-sequelize-application-tested-with-mocha-chai-supertest-migrations-and-seeds-d306a8ee4add

https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-seed

https://blog.logrocket.com/using-sequelize-with-typescript/

https://medium.com/building-ibotta/testing-arrays-and-objects-with-chai-js-4b372310fe6d

https://github.com/sequelize/sequelize-typescript

https://github.com/lotivo/sequelize-guard

https://github.com/hbenl/vscode-mocha-test-adapter

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

development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    encrypt: process.env.DB_ENCRYPT,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE),
      idle: parseInt(process.env.DB_POOL_IDLE),
    },


https://www.npmjs.com/package/sequelize-test-helpers