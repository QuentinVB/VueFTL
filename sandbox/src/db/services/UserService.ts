import {kebabCase} from 'lodash'
import bcrypt from 'bcrypt'
import * as UserDal from '../dal/user'
import {GetAllUsersFilters} from '../dal/types'
import {UserInput, UserOuput} from '../models/User'
const saltRounds = 2;


export const create = async (payload: UserInput): Promise<UserOuput> => {
    
    payload.passwordHash = await bcrypt.hash(payload.password, saltRounds);
    
    return UserDal.create(payload)
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOuput> => {
    return UserDal.update(id, payload)
}

export const getById = (id: number): Promise<UserOuput> => {
    return UserDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return UserDal.deleteById(id)
}

export const getAll = (filters: GetAllUsersFilters): Promise<UserOuput[]> => {
    return UserDal.getAll(filters)
}