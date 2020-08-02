import { getAsync} from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = 'event'//message

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
    //event uuid
  getEventAnswerAsync (eventuuid,answeridx) {
    //console.log("service level, event:" + eventuuid+ " idx:"+answeridx)

    return getAsync(this.forgeUrl(`${endpoint}/${eventuuid}/answer/${answeridx}`));
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
