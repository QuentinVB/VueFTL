require('dotenv').config()

import { Ship, User } from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

const dbInit = () => Promise.all([
    User.sync({ alter: isDev || isTest }),
    Ship.sync({ alter: isDev || isTest }),
  ])

export default dbInit 
