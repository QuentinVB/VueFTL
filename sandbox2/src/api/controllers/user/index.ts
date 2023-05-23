import * as service from '../../../db/services/UserService'
import {CreateUserDTO, UpdateUserDTO, FilterUsersDTO} from '../../dto/user.dto'
import {IUser} from '../../interfaces'
import * as mapper from './mapper'

export const create = async(payload: CreateUserDTO): Promise<IUser> => {
    return mapper.toUser(await service.create(payload))
}

export const update = async (id: number, payload: UpdateUserDTO): Promise<IUser> => {
    return mapper.toUser(await service.update(id, payload))
}

export const getById = async (id: number,deep?:boolean): Promise<IUser> => {
    return mapper.toUser(await service.getById(id,deep))
}

export const deleteById = async(id: number): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)

    return isDeleted
}

export const getAll = async(filters: FilterUsersDTO): Promise<IUser[]> => {
    return (await service.getAll(filters)).map(mapper.toUser)
}