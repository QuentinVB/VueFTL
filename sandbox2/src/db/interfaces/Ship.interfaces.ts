import { Optional } from 'sequelize'
import { User } from '../models';

export interface ShipAttributes {
    id: number;
    name: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ShipInput extends Optional<ShipAttributes, 'id' > {}

export interface ShipOutput extends Required<ShipAttributes> {
    userId?:number
    owner?:User
}
