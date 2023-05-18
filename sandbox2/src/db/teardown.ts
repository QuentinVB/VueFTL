require('dotenv').config()
import { Model } from 'sequelize';
import { Ship, User } from './models'

const isTest = process.env.NODE_ENV === 'test'

const models = { Ship, User }

const dbTeardown = async () => {
  if(isTest)
  {
    return Promise.all(Object.values(models).map(m=>m.destroy()))
  }
  throw new Error("Can only teardown the base in test !")

};

export default dbTeardown 
