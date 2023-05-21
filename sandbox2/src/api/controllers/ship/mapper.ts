import {IShip} from '../../interfaces'
import {ShipOutput} from '../../../db/interfaces/Ship.interfaces'

export const toShip = (ship: ShipOutput): IShip => {
    return {
        id: ship.id,
        name: ship.name,
        owner:ship.owner,
        createdAt: ship.createdAt,
        updatedAt: ship.updatedAt,
        deletedAt: ship.deletedAt,
    }
}