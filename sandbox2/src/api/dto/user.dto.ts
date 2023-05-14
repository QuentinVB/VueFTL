import { Optional } from "sequelize/types"

export type CreateUserDTO = {
    name: string;
    password:string;
    description?: string;
}

export type LogUserDTO = Optional<CreateUserDTO, 'description'>

export type UpdateUserDTO = Optional<CreateUserDTO, 'name'|'password'>

export type GetUserDTO = Optional<CreateUserDTO, 'password'>

export type FilterUsersDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}