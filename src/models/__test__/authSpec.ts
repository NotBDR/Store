import UserModel from '../user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe(`Auth Module`, () => {
    describe(`test methodes exists`, () => {
        it(`should have an auth user method`, () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });

    describe(`test auth logic`, () => {
        const user = {
            id: 1,
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
        it(`ath methode should return the auth user`, async () => {
            const authUser = await userModel.authenticate(
                user.email,
                user.password as string
            );
            expect(authUser?.email).toBe(user.email);
            expect(authUser?.first_name).toBe(user.first_name);
            expect(authUser?.user_name).toBe(user.user_name);
            expect(authUser?.last_name).toBe(user.last_name);
        });
        it('auth method sould return null for wrong input', async () => {
            const authUser = await userModel.authenticate(
                'Badr@gmail.com',
                'Wrong-pass'
            );
            expect(authUser).toBe(null);
        });
    });
});
