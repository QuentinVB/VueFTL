import {AllowNull, Column,  HasOne, IsUUID, Model, Table} from 'sequelize-typescript';
import { DataTypes,Optional } from 'sequelize';
import { Ship } from './Ship.model';

export interface IUser {
	id: number;
	username: string;
	email: string;
	uuid: string;
	credits:number;
	passwordHash: string;
  }

export interface IUserView extends Optional<IUser, 'id' > {}

@Table
export class User extends Model<IUser,IUserView> implements IUser{
	static STARTCREDITS = 500;

	declare id:number;
	
	declare createdAt: Date;
	
	declare updatedAt: Date;

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