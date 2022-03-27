import { postAsync, getAsync} from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = 'event'//message

class EventApiServices extends Services{
  EmptyEvent= {
    name: "",
    isActive: false,
    uuid: "",
    UserUUID: "",
    state: {
        "message": "",
        "options": [
        ]
    }
  }
    //event uuid
  postEventAnswerAsync (Useruuid,answeridx) {
    //console.log("service level, event:" + eventuuid+ " idx:"+answeridx)

    return postAsync(this.forgeUrl(`${endpoint}/${Useruuid}/answer/${answeridx}`));
  }
  getEventAsync (Useruuid) {
    //console.log("service level, event:" + eventuuid+ " idx:"+answeridx)

    return getAsync(this.forgeUrl(`${endpoint}/${Useruuid}`));
  }

}

export default new EventApiServices()
