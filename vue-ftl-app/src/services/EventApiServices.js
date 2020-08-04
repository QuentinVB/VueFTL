import { postAsync, getAsync} from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = 'event'//message

class EventApiServices extends Services{
  EmptyEvent= {
    name: "",
    isActive: false,
    uuid: "",
    playerUUID: "",
    state: {
        "message": "",
        "options": [
        ]
    }
  }
    //event uuid
  postEventAnswerAsync (playeruuid,answeridx) {
    //console.log("service level, event:" + eventuuid+ " idx:"+answeridx)

    return postAsync(this.forgeUrl(`${endpoint}/${playeruuid}/answer/${answeridx}`));
  }
  getEventAsync (playeruuid) {
    //console.log("service level, event:" + eventuuid+ " idx:"+answeridx)

    return getAsync(this.forgeUrl(`${endpoint}/${playeruuid}`));
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
