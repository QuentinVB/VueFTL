import User, { UserOutput } from "../../../src/db/models/User.model"
import { request } from "../../helpers"


describe('User routes', () => {
    let userId: number
    let user: UserOutput

    beforeAll(async () => {
        [user] = await Promise.all([
            User.create({name: 'Adam', password: 'pesto-pasta',passwordHash:"666"}),
            User.create({name: 'Lilith', password: 'caesar-salad',passwordHash:"zobuga"}),
        ])

        ;({id: userId} = user)
    })

    describe('Get All', () => {
        it('should return an array of existing users', async () => {
            const {body: data} = await request.get('/api/v1/user').expect(200)

            expect(data?.length).toBeGreaterThanOrEqual(2)
        })
    })

    describe('Get single user', () => {
        it('should return a single user with specified id', async () => {
            const {body: data} = await request.get(`/api/v1/user/${userId}`).expect(200)
                
            expect(data.id).toEqual(userId)
            expect(data.name).toEqual(user.name)
        })
    })
})