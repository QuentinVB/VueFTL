import { getAsync,putAsync} from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = 'User'//message

class UserApiServices extends Services{
  EmptyUser= {
      name:"",
      position: {x:0,y:0},
      fuel:0
    }
  
  getUserAsync () {
    return getAsync(this.forgeUrl(`${endpoint}`));
  }
  putMoveShipAsync (User) {
    return putAsync(this.forgeUrl(`${endpoint}`), {User : User});
  }
  
}

export default new UserApiServices()
