import {Op} from 'sequelize'
import {Ship, User} from '../models'
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

export const getById = async (id: number,deep?:boolean): Promise<ShipOutput> => {
    const include = deep ? { include: {model:User,as: 'owner'} } : undefined;
    const ship = await Ship.findByPk(id,include)
    //console.log(ship)
    if (!ship) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return ship
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
