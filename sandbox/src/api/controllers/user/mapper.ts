import {IUser} from '../../interfaces'
import {UserOuput} from '../../../db/models/User'

export const toUser = (user: UserOuput): IUser => {
    return {
        id: user.id,
        name: user.name,
        description: user.description,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    }
}