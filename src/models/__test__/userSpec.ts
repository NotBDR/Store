import UserModel from '../user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('User Model', () => {
    describe(`Test methods exists`, () => {
        it(`should have an get many method`, () => {
            expect(userModel.getMany).toBeDefined();
        });
        it(`should have an get one user method`, () => {
            expect(userModel.getOne).toBeDefined();
        });
        it(`should have create user method`, () => {
            expect(userModel.create).toBeDefined();
        });
        it(`should have update user method`, () => {
            expect(userModel.updateOne).toBeDefined();
        });
        it(`should have delete user method`, () => {
            expect(userModel.deleteOne).toBeDefined();
        });
        it(`aith user method`, () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe(`Test user model logic`, () => {
        const user = {
            email: 'Badr@gmail.com',
            user_name: 'BDR',
            first_name: 'Bader',
            last_name: 'Rashed',
            password: '123',
        } as User;

        beforeAll(async () => {
            const createdUser = await userModel.create(user);
            user.id = createdUser.id;
        });

        afterAll(async () => {
            const connection = await db.connect();
            const sql = ' DELETE FROM users;';
            await connection.query(sql);
            connection.release;
        });

        it(`create metode should retrn a new user`, async () => {
            const createUser = await userModel.create({
                email: 'BadrRashed@gmail.com',
                user_name: 'BDR',
                first_name: 'Bader',
                last_name: 'Rashed',
                password: '123',
            } as User);
            expect(createUser).toEqual({
                id: createUser.id,
                email: 'BadrRashed@gmail.com',
                user_name: 'BDR',
                first_name: 'Bader',
                last_name: 'Rashed',
            } as User);
        });

        it(`get many return all users in DB`, async () => {
            const users = await userModel.getMany();
            expect(users.length).toBe(2);
        });

        it(`get one by id`, async () => {
            const returnedUser = await userModel.getOne(user.id as number);
            expect(returnedUser.email).toBe(user.email);
            expect(returnedUser.user_name).toBe(user.user_name);
            expect(returnedUser.first_name).toBe(user.first_name);
            expect(returnedUser.last_name).toBe(user.last_name);
        });

        it(`update one should return user with updated info`, async () => {
            const updatedUser = await userModel.updateOne({
                ...user,
                first_name: 'Badr',
                last_name: 'Rashid',
            });
            expect(updatedUser.id).toBe(user.id);
            expect(updatedUser.email).toBe(user.email);
            expect(updatedUser.user_name).toBe(user.user_name);
            expect(updatedUser.first_name).toBe(`Badr`);
            expect(updatedUser.last_name).toBe(`Rashid`);
        });

        it(`Delete one`, async () => {
            const DeletedUser = await userModel.deleteOne(user.id as number);
            expect(DeletedUser.id).toBe(user.id);
        });
    });
});
