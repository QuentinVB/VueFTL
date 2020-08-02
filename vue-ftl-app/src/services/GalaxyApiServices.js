import { getAsync} from '../helpers/apiHelpers'
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
      uuid:""
    }
  

  getGalaxyAsync() {
    return getAsync(this.forgeUrl(`${endpoint}`));
  }
  getMineStarSystemAsync(starSystem) {
    return getAsync(this.forgeUrl(`${endpoint}/${starSystem}/mine`));
  }
  getStarSystemEventAsync(starSystem) {
    return getAsync(this.forgeUrl(`${endpoint}/${starSystem}/event`));
  }
  /*
  getMoveShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}/moverandom`));
  }
  */
}

export default new GalaxyApiServices()