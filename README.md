Charge utile du vaisseau
{
    name:"",//le nom du vaisseau
    coordinates: 
    {
        y:0,
        y:0,
        //secteur ?
    },
    fuel: 5//le carburant
}

building an universal "message" payload system ?

https://github.com/microsoft/vscode-recipes/tree/master/vuejs-cli
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

    https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/

    Feature VS Event VS Anomaly

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
 public readonly int FUELCONSUMPTION = 5;
        public readonly int FUELMAX = 100;

        double _money = 100;

        bool _isAlive = true;
        double _fuel = 100;
        double _fuelEfficiency = 0.8;
        double _hullFactor = 0.9;
        int _hull = 100;
        int _oxygenSupply = 100;
        readonly Atom _fuelType = Atom.Hydrogen;
        double _lifeSupportFactor = 0.4;
        int _crew = 10;

        Cargo[] _cargoBay;
        int _cargoIdx=0;

damage : hull = damage*hullfactor
warp : fuel -= fuel consumption * fuel efficiency
oxygen : oxygen -= life support * crew

BrownDwarf,
        WhiteDwarf,
        RedDwarf,
        YellowDwarf,
        RedGiant,
        RedSuperGiant,
        BlueSuperGiant,
        BinaryStar,
        NeutronStar,
        BlackHole,
        RoguePlanet,