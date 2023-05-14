import * as ShipDal from '../dal/ship.dal'
import {GetAllShipsFilters} from '../dal/types'
import {ShipInput, ShipOutput} from '../models/Ship.model'


export const create = async (payload: ShipInput): Promise<ShipOutput> => {
    return ShipDal.create(payload)
}

export const update = async (id: number, payload: Partial<ShipInput>): Promise<ShipOutput> => {
    return ShipDal.update(id, payload)
}

export const getById = (id: number): Promise<ShipOutput> => {
    return ShipDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return ShipDal.deleteById(id)
}

export const getAll = (filters: GetAllShipsFilters): Promise<ShipOutput[]> => {
    return ShipDal.getAll(filters)
}