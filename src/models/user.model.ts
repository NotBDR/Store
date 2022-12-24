import User from '../types/user.type';
import db from '../database';
class UserModel {
    //create
    async create(u: User): Promise<User> {
        try {
            //open connection with database
            const connection = await db.connect();

            const sql = `INSERT INTO users (email,user_name,first_name,last_name,password) 
                values($1, $2, $3, $4, $5) returning *;`;

            //run query
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                u.password,
            ]);
            //close connection
            connection.release();
            //return created user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to create user ${(error as Error).message}`
            );
        }
    }
    // get all users
    //get specific user
    //update user
    //delete user
    //auth user
}
export default UserModel;
