import {IUser} from '../../interfaces'
import {UserOutput} from '../../../db/interfaces/User.interfaces'

export const toUser = (user: UserOutput): IUser => {
    return {
        id: user.id,
        name: user.name,
        description: user.description,
        credit: user.credits,
        ships:user.ships,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    }
}