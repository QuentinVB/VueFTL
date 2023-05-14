import {IShip} from '../../interfaces'
import {ShipOutput} from '../../../db/models/Ship.model'

export const toShip = (user: ShipOutput): IShip => {
    return {
        id: user.id,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    }
}