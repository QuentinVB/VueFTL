import {Op} from 'sequelize'
import {Ship} from '../models'
import {ShipInput, ShipOutput} from '../interfaces/Ship.interfaces'
import { GetAllShipsFilters } from './types'

export const create = async (payload: ShipInput): Promise<ShipOutput> => {


    const user = await Ship.create(payload)

    return user
}

export const findOrCreate = async (payload: ShipInput): Promise<ShipOutput> => {
    
    const [user] = await Ship.findOrCreate({
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return user
}

export const update = async (id: number, payload: Partial<ShipInput>): Promise<ShipOutput> => {
    const user = await Ship.findByPk(id)

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedShip = await user.update(payload)
    return updatedShip
}

export const getById = async (id: number): Promise<ShipOutput> => {
    const user = await Ship.findByPk(id)

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return user
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedShipCount = await Ship.destroy({
        where: {id}
    })

    return !!deletedShipCount
}

export const getAll = async (filters?: GetAllShipsFilters): Promise<ShipOutput[]> => {
    return Ship.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}
