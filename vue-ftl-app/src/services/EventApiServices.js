//import { getAsync,postAsync} from '../helpers/apiHelpers'
import Services from './Services'

//const endpoint = 'ship'//message

class EventApiServices extends Services{
  EmptyEvent= {
    name: "",
    isActive: false,
    uuid: "",
    starSystemUUID: "",
    state: {
        "message": "",
        "options": [
        ]
    }
    }
  /*
  getShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}`));
  }
  getMoveShipAsync () {
    return getAsync(this.forgeUrl(`${endpoint}/moverandom`));
  }
  postMoveShipToAsync (uuid) {
    return postAsync(this.forgeUrl(`${endpoint}/wrapto`),{destination : {uuid:uuid} });
  }*/
}

export default new EventApiServices()
