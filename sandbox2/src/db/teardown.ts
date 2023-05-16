require('dotenv').config()

import { Ship, User } from './models'

const isTest = process.env.NODE_ENV === 'test'

const dbTeardown = async () => {
  if(isTest)
  {
    return Promise.all([
      User.destroy(),
      Ship.destroy(),
    ]);
  }
  throw new Error("Can only teardown the base in test !")

};

export default dbTeardown 
