import { getAsync,putAsync } from '../helpers/apiHelpers'
import Services from './Services'

const endpoint = ''//message

class MessageApiServices extends Services{
  getSkillsListAsync () {
    /*
    if(Array.isArray(result))
    {
      return result
    }
    else
    {
      throw
    }
    */
    return getAsync(this.forgeUrl(endpoint));
  }

  getMessageAsync () {
    return getAsync(this.forgeUrl(`${endpoint}getstate`));
  }
  putMessageAsync (message) {
    return putAsync(this.forgeUrl(`${endpoint}updatemessage`),{message : message});
  }
 

  getSkillAsync (skillId) {
    return getAsync(this.forgeUrl(`${endpoint}/${skillId}`));
  }
  getProjectBySkillAsync (skillId) {
    return getAsync(this.forgeUrl(`${endpoint}/${skillId}/project`));
    }

}

export default new MessageApiServices()
