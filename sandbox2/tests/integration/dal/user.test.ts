import {User} from '../../../src/db/models'
import * as userDal from '../../../src/db/dal/user'
import bcrypt from "bcrypt";


describe('User DAL', () => {
    let userId: number
    beforeAll(async () => {
        ({id: userId} = await User.create({
            name: 'John',
            password:'gazou',
            passwordHash: 'zoMeu'
        }))
    })

    describe('Get method', () => {
        it('should get object of user details', async () => {
           
            const user = await User.findByPk(userId)

            expect(user).not.toBeNull()
        })
    })


    describe('Create method', () => {
        it('should create and return an object of user details', async () => {
            const payload = {
                name: 'Jane',
                password: 'test',
                description: 'i\'m jane'
            }
            
            const user = await userDal.create(payload)

            expect(user).not.toBeNull()
        })
    })

    describe('findOrCreate method', () => {
        beforeAll(async () => {
            await User.create({
                name: 'Jack',
                password: 'harper',
                passwordHash: 'zoMeu'
            })
        })
/*
        it('should create a new entry when none with matching name exists', async () => {
            const payload = {
                name: 'DocBrown',
                password: '88miles'
            }

            await userDal.findOrCreate(payload)

            const usersFound = await User.findAll({where: {name: 'DocBrown'}})

            expect(usersFound.length).toEqual(1)
        })
*/
        it('should return an existing entry where one with same name exists without updating it', async () => {
            const password = '2.21Gigogwatt';
            const payload = {
                name: 'Marty',
                password: password,
                description: 'Mom ?'
            }

            await userDal.findOrCreate(payload)

            const usersFound = await User.findAll({where: {name: 'Marty'}})
            
            expect(usersFound.length).toEqual(1)
            expect(await bcrypt.compare(password, usersFound[0].passwordHash)).toBeTruthy();
            expect(usersFound[0].description).not.toBeNull()
        })
    })

    describe('Update method', () => {
        it('should update a specific existing User entry', async () => {
            await userDal.update(userId, {
                description: 'doctor'
            })

            const user = await User.findByPk(userId)

            expect(user?.description).toEqual('doctor')
        })
    })
})