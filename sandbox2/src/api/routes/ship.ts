import { Router, Request, Response} from 'express'

import * as shipController from '../controllers/ship'
import {CreateShipDTO, FilterShipsDTO, UpdateShipDTO} from '../dto/ship.dto'

const shipsRouter = Router()

shipsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const isDeep = !!req.query["deep"];

    const result = await shipController.getById(id,isDeep)
    return res.status(200).send(result)
})


shipsRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const payload:UpdateShipDTO = req.body
    
    const result = await shipController.update(id, payload)
    return res.status(201).send(result)
})

shipsRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const result = await shipController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})

shipsRouter.post('/', async (req: Request, res: Response) => {
    const payload:CreateShipDTO = req.body
    try {
        const result = await shipController.create(payload)
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).end()
    }
})

shipsRouter.get('/', async (req: Request, res: Response) => {
    const filters:FilterShipsDTO = req.query

    const results = await shipController.getAll(filters)
    return res.status(200).send(results)
})

export default shipsRouter