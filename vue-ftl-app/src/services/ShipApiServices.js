import { getAsync,postAsync} from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = 'ship'//message

class ShipApiServices extends Services{
  EmptyShip= {
      name:"",
      position: {x:0,y:0},
      fuel:0
    }
  
  getShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}`));
  }
  getMoveShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}/moverandom`));
  }
  postMoveShipToAsync (uuid) {
    return postAsync(this.forgeUrl(`${endpoint}/wrapto`),{destination : {uuid:uuid} });
  }
}

export default new ShipApiServices()
