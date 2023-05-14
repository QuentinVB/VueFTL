import {kebabCase} from 'lodash'

import * as UserDal from '../dal/user.dal'
import {GetAllUsersFilters} from '../dal/types'
import {UserInput, UserOutput} from '../models/User.model'


export const create = async (payload: UserInput): Promise<UserOutput> => {
    return UserDal.create(payload)
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    return UserDal.update(id, payload)
}

export const getById = (id: number): Promise<UserOutput> => {
    return UserDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return UserDal.deleteById(id)
}

export const getAll = (filters: GetAllUsersFilters): Promise<UserOutput[]> => {
    return UserDal.getAll(filters)
}

export const cash = (id: number, credit:number): Promise<UserOutput> => {
    return credit >= 0 
    ? UserDal.cashIn(id,credit)
    : UserDal.cashOut(id,credit);
}