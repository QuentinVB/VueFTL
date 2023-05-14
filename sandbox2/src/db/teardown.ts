require('dotenv').config()

import { Ship, User } from './models'

const isTest = process.env.NODE_ENV === 'test'

const dbTeardown = async () => {
  if(isTest)
  {
    return Promise.all([
      User.truncate({force: true}),
      Ship.truncate({force: true}),
    ]);
  }
  throw new Error("Can only teardown the base in test !")

};

export default dbTeardown 
