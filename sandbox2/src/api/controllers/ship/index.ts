import * as service from '../../../db/services/ShipService'
import {CreateShipDTO, UpdateShipDTO, FilterShipsDTO} from '../../dto/ship.dto'
import {IShip} from '../../interfaces'
import * as mapper from './mapper'

export const create = async(payload: CreateShipDTO): Promise<IShip> => {
    return mapper.toShip(await service.create(payload))
}

export const update = async (id: number, payload: UpdateShipDTO): Promise<IShip> => {
    return mapper.toShip(await service.update(id, payload))
}

export const getById = async (id: number): Promise<IShip> => {
    return mapper.toShip(await service.getById(id))
}

export const deleteById = async(id: number): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)

    return isDeleted
}

export const getAll = async(filters: FilterShipsDTO): Promise<IShip[]> => {
    return (await service.getAll(filters)).map(mapper.toShip)
}