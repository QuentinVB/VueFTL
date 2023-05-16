import {IUser} from '../../interfaces'
import {UserOutput} from '../../../db/models/User.model'

export const toUser = (user: UserOutput): IUser => {
    return {
        id: user.id,
        name: user.name,
        description: user.description,
        credit: user.credits,
        shipId: user.shipId,
        ship:user.ship,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    }
}