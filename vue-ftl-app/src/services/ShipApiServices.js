import { getAsync,putAsync} from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = 'ship'//message

class ShipApiServices extends Services{
  EmptyShip= {
      name:"",
      position: {x:0,y:0},
      location:{starsystem:"",planet:"",situation:"orbiting"},
      fuel:0
    }
  
  getShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}`));
  }
  getMoveShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}/moverandom`));
  }
  putWarpShipToAsync (starSystemUUID) {
    return putAsync(this.forgeUrl(`${endpoint}/wrapto`),{starsystem : starSystemUUID });
  }
  putMoveShipToPlanetAsync (starSystemUUID,planetUUID) {
    return putAsync(this.forgeUrl(`${endpoint}/movetoplanet`),{starsystem : starSystemUUID, planetdestination:planetUUID });
  }
  putChangeShipSituationAsync (situation) {
    //TODO : UNSAFE !
    //orbit
    //land
    return putAsync(this.forgeUrl(`${endpoint}/situation/${situation}`),{ });
  }
}

export default new ShipApiServices()
