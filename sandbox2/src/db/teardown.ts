require('dotenv').config()

import { User } from './models'

const isTest = process.env.NODE_ENV === 'test'

const dbTeardown = () => {
  if(isTest)
  {
    return Promise.all([
      User.truncate({force: true}),
    ]);
  }
  throw new Error("Can only teardown the base in test !")

};

export default dbTeardown 
