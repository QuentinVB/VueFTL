require('dotenv').config()
import dbInit from './db/init'
import express, { Application, Request, Response } from 'express'
import routes from './api/routes'

const port = process.env.DEV_PORT

export const getApp = () => {
    const app: Application = express()

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.get('/', async(req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ message: `Welcome to the sandboxAPI` })
    })
    
    app.use('/api/v1', routes)

    return app
}

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

