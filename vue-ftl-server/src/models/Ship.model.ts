import {AllowNull, Column,  Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './User.model';

export interface IShip {
	id: number;
	name:string;
	user:User;
  }

export interface IShipView extends Optional<IShip, 'id' > {}

@Table
export class Ship extends Model<IShip,IShipView> implements IShip{

	declare id:number;
	
	declare createdAt: Date;
	
	declare updatedAt: Date;

	declare user:User

	@AllowNull(false)
	@Column
	name!: string;

	//TODO : TO JSON/To ViewModel
	ToObject() {
		return {
			name: this.name,
			user: this.user,
		};
	}
}