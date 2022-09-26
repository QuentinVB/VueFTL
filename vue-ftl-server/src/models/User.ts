import {AllowNull, Column, CreatedAt, HasOne, IsUUID, Model, Table, UpdatedAt} from 'sequelize-typescript';
import { DataTypes } from 'sequelize/types';
import Ship from './ship';

@Table
export default class User extends Model<User>{
	static STARTCREDITS = 500;

	@AllowNull(false)
	@Column
	username!: string;

	@AllowNull(false)
	@Column
	email!: string;
	
	@IsUUID(4)
	@AllowNull(false)
	@Column
	uuid!: string;

	@AllowNull(false)
	@Column
	passwordHash!: string;

	@Column({
		type: DataTypes.INTEGER,
		defaultValue: User.STARTCREDITS,
		set(value:number) {
			this.setDataValue("credits", value <= 0 ? 0 : value);
		}
	})
	credits:number;
	
	@HasOne(() => Ship)
	ship?: Ship;
	
	@CreatedAt
	@Column
	createdAt!: Date;
	
	@UpdatedAt
	@Column
	updatedAt!: Date;


	//TODO : TO JSON/To ViewModel
	ToObject() {
		return {
			username: this.username,
			uuid: this.uuid,
			credits: this.credits,
			ship: this.ship,
		};
	}
}