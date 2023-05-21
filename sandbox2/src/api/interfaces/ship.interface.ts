import { IUser } from "./user.interface"

export interface IShip {
  id: number
  name: string
  owner?:IUser
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date 
}