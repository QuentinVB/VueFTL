import { IShip } from "./ship.interface"

export interface IUser {
  id: number
  name: string
  description?: string
  credit?: number
  shipId?:number
  ship?:IShip
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date 
}