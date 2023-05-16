require('dotenv').config()

import { Ship, User } from './models'

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

const dbInit = () => Promise.all([
    Ship.sync(param),
    User.sync(param)
    /*
    Ship.sync({ alter: isDev , force: isTest }),
    User.sync({ alter: isDev , force: isTest })
    */
  ])

export default dbInit 
