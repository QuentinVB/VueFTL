import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {User} from '../models'
import {GetAllUsersFilters} from './types'
import {UserInput, UserOuput} from '../models/User'


export const create = async (payload: UserInput): Promise<UserOuput> => {

    const user = await User.create(payload)

    return user
}

export const findOrCreate = async (payload: UserInput): Promise<UserOuput> => {
    const [user] = await User.findOrCreate({
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return user
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOuput> => {
    const user = await User.findByPk(id)

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedUser = await user.update(payload)
    return updatedUser
}

export const getById = async (id: number): Promise<UserOuput> => {
    const user = await User.findByPk(id)

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return user
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    })

    return !!deletedUserCount
}

export const getAll = async (filters?: GetAllUsersFilters): Promise<UserOuput[]> => {
    return User.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}
