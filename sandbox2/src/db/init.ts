require('dotenv').config()

import { Model } from 'sequelize';
import * as models from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

let param={};
switch (true) {
  case isDev:
    param = { alter:true }
    break;
  case isTest:
      param = { force:true }
      break;
  default:
    break;
}

const dbInit = async() => {
  return Promise.all(Object.values(models).map(m=>{
    m.associate(models);
    return m.sync(param);
  }))
}
export default dbInit 
