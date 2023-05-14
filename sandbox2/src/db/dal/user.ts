import {Op} from 'sequelize'
import {isEmpty} from 'lodash'
import bcrypt from 'bcrypt'
import {User} from '../models'
import {GetAllUsersFilters} from './types'
import {UserInput, UserOutput} from '../models/User'
const saltRounds = 2;


export const create = async (payload: UserInput): Promise<UserOutput> => {

    payload.passwordHash = await bcrypt.hash(payload.password, saltRounds);

    const user = await User.create(payload)

    return user
}

export const findOrCreate = async (payload: UserInput): Promise<UserOutput> => {
    
    payload.passwordHash = await bcrypt.hash(payload.password, saltRounds);

    const [user] = await User.findOrCreate({
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return user
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id)

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedUser = await user.update(payload)
    return updatedUser
}

export const getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return user
}

export const cashIn = async (id: number, credits: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedUser = await user.increment('credits',{by:credits});
    return updatedUser
}

export const cashOut = async (id: number, credits: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedUser = await user.decrement('credits',{by:credits});
    return updatedUser
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    })

    return !!deletedUserCount
}

export const getAll = async (filters?: GetAllUsersFilters): Promise<UserOutput[]> => {
    return User.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}
