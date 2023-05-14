import { Optional } from "sequelize/types"

export type CreateUserDTO = {
    name: string;
    password:string;
    description?: string;
}

export type UpdateUserDTO = Optional<CreateUserDTO, 'name'|'password'>

export type FilterUsersDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}