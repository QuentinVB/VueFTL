import { Optional } from 'sequelize'
import Ship from '../models/Ship.model';

export interface UserAttributes {
    id: number;
    name: string;
    
    passwordHash: string;
    description?: string;
    credits?: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'passwordHash' > {
    password: string;
}

export interface UserOutput extends Required<UserAttributes> {
    ships?: Ship[];
}
