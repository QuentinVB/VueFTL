export interface IUser {
  id: number
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date 
}