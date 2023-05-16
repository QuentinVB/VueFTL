require('dotenv').config()
import getApp from './app'
import dbInit from './db/init'

const port = process.env.DEV_PORT

export const start = () => {
    const app = getApp()
    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
        })
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`)
    }
}

dbInit()
.then((models)=>
{
    console.log(models);
    start();
})

