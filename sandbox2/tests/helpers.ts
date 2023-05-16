require('dotenv').config()

import app from '../src/app'
const port = process.env.TEST_PORT

export const appTest = app().listen(port)