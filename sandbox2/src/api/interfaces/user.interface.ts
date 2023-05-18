import { IShip } from "./ship.interface"

export interface IUser {
  id: number
  name: string
  description?: string
  credit?: number
  ships?:IShip[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date 
}