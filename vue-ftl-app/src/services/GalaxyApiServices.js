import { getAsync,postAsync} from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = 'galaxy'//message

class GalaxyApiServices extends Services{
  EmptyGalaxy = {
      starCount:0,
      radius:20,
      galaxyMap:{}
    }
  
  EmptyStarSystem={
      name:"",
      type:"",
      position:{x:0,y:0},
      minerals:0,
      uuid:"",
      planets:[]
    }
  

  getGalaxyAsync() {
    return getAsync(this.forgeUrl(`${endpoint}`));
  }
  /*
  getMineStarSystemAsync(starSystemuuid) {
    return getAsync(this.forgeUrl(`${endpoint}/${starSystemuuid}/mine`));
  }*/
  postMinePlanetAsync(planet) {
    return postAsync(this.forgeUrl(`${endpoint}/${planet.starSystem}/${planet.uuid}/mine`));
  }
  getStarSystemEventAsync(starSystemuuid) {
    return getAsync(this.forgeUrl(`${endpoint}/${starSystemuuid}/event`));
  }
  /*
  getMoveShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}/moverandom`));
  }
  */
}

export default new GalaxyApiServices()
