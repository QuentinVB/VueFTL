import { Optional } from "sequelize/types"

export type CreateShipDTO = {
    name: string;
}

export type LogShipDTO = Optional<CreateShipDTO,'name'>

export type UpdateShipDTO = Optional<CreateShipDTO,'name'>

export type GetShipDTO = Optional<CreateShipDTO, 'name'>

export type FilterShipsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}