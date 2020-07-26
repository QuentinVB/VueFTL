import { getAsync} from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = 'ship'//message

class ShipApiServices extends Services{
  EmptyShip()
  {
    return {
      name:"",
      coordinate: {x:0,y:0},
      fuel:0
    }
  }
  getShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}`));
  }
  getMoveShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}/moverandom`));
  }
}

export default new ShipApiServices()
