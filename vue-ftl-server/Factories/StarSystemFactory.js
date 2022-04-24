const { getRandomIntInclusive } =require( "../helpers/Random.js");
function generateRandomStarSystem(galaxyRadius)
{
  let angular = Math.random()*Math.PI*2;
  let radius = Math.random() * galaxyRadius;
  
  let x = Math.round(radius * Math.cos(angular));//Random.getRandomIntInclusive(-this.radius,this.radius);
  let y = Math.round(radius * Math.sin(angular));

  let starSystem = new StarSystem(this.getRandomName(),x,y);

  let type = this.getRandomType();

  starSystem.type= type.name;
  starSystem.color= type.color;

  const planetCount = starSystem.planetesCount;
  const a = StarSystem.MINPLANETORBIT;
  const b = Math.pow(StarSystem.MAXPLANETORBIT/StarSystem.MINPLANETORBIT, 1/planetCount);

  for (let i = 0; i < planetCount; i++) {
    const planet = Planet.generateRandomPlanet(starSystem,i);
    let orbit = a * Math.pow(b,i);
    orbit += orbit*(Math.random()*0.5);
    planet.orbit = orbit;


    //compute planetposition
    
    starSystem.planets.push(planet)
  }
  

  //x= r Cos i
  //y= r Sin i
  //r=sqrt(x²+y²)
  //i = atan (y/x)
  return starSystem;
}
function EmptyStarSystem() {
    let emptySystem= new StarSystem(this.getRandomName(),0,0);

    return emptySystem;
  }

  function getRandomName()
  {
    //TODO : name from same sector have the same "constellation name" then different greek alphabet, and number
    return GREEKALPHABET[getRandomInt(0,GREEKALPHABET.length)]+" "+NAMESOURCE[getRandomInt(0,NAMESOURCE.length)]+"-"+getRandomIntInclusive(1,9);
  }

  function getRandomType()
  {
    return STELLARTYPES[getRandomInt(STELLARTYPES.length)];
  }

planetesCount = getRandomIntInclusive(1,10);