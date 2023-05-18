import Supertest from "supertest";
import User from "../../../src/db/models/User.model"
import { appTest } from "../../helpers";
import supertest from "supertest";
import { Ship } from "../../../src/db/models";
import { UserOutput } from "../../../src/db/interfaces/User.interfaces";

let request= supertest(appTest);

describe('User routes', () => {
    let userId: number
    let user: UserOutput
    let ship:Ship;

    beforeAll(async () => {
        [user] = await Promise.all([
            User.create({name: 'Adam', password: 'pesto-pasta',passwordHash:"666"}),//shipId:ship.id
            User.create({name: 'Lilith', password: 'caesar-salad',passwordHash:"zobuga"}),
        ])

        ;({id: userId} = user)

        ship = await Ship.create({name:"Vostok"});
        ship.userId = userId;
        await ship.save()
    })
    
    afterAll(function (done) {
        appTest.close(done)
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

    describe('Get single user deep', () => {

        it('should return a single user with specified id and ship data', async () => {
            const {body: data} = await request.get(`/api/v1/user/${userId}/deep`).expect(200)
                
            expect(data.ships).toHaveLength(1);
        })
    })
})