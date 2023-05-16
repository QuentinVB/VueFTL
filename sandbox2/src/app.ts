import express, { Application, Request, Response } from 'express'
import routes from './api/routes'

const getApp = () => {
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

export default getApp