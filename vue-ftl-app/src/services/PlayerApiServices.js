import { getAsync,putAsync} from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = 'player'//message

class PlayerApiServices extends Services{
  EmptyPlayer= {
      name:"",
      position: {x:0,y:0},
      fuel:0
    }
  
  getPlayerAsync () {
    return getAsync(this.forgeUrl(`${endpoint}`));
  }
  putMoveShipAsync (player) {
    return putAsync(this.forgeUrl(`${endpoint}`), {player : player});
  }
  
}

export default new PlayerApiServices()
