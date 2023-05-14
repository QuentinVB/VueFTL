export interface IUser {
  id: number
  name: string
  description?: string
  credit?: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date 
}