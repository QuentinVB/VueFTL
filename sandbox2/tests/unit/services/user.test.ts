import {cash} from '../../../src/db/services/UserService'
import {cashIn as userDalUpdate} from '../../../src/db/dal/user.dal'
import { User } from '../../../src/db/models'

/*
const dbTeardown = async () => {
    //await User.sequelize?.query("SET FOREIGN_KEY_CHECKS = 0")
    await User.truncate({force: true})
    //await User.sequelize?.query("SET FOREIGN_KEY_CHECKS = 1")
}
*/
jest.mock('../../../src/db/dal/user.dal', () => ({
    cashIn: jest.fn(),
}))

/*

const mockDate = new Date('10 Oct 2021').toISOString()
const dateSpy = jest.spyOn(global, 'Date')
    .mockImplementation(() => mockDate)
*/

describe('User Service', () => {
    /*
    afterAll(() => {
        dateSpy.mockRestore()
    })*/
    let userId: number = 10;
    /*
    beforeAll(async () => {
        await dbTeardown();

        ({id: userId} = await User.create({
            name: 'John',
            password:'gazou',
            passwordHash: 'zoMeu'
        }))
    })

    afterAll(async () => {
        await dbTeardown()
    })*/

    describe('Publish', () => {
        it('should accept a payload and call the review dal with it', async () => {
            await cash(userId,10)

            expect(userDalUpdate).toBeCalledTimes(1)
            expect(userDalUpdate).toHaveBeenCalledWith(userId, 10)
        })
    })
})