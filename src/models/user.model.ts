import User from '../types/user.type';
import db from '../database';
import config from '../config';
import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
    const salt = parseInt(config.salt as string, 10);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
    //create
    async create(u: User): Promise<User> {
        try {
            //open connection with database
            const connection = await db.connect();

            const sql = `INSERT INTO users (email,user_name,first_name,last_name,password) 
                values($1, $2, $3, $4, $5) returning id,email,user_name,first_name,last_name ;`;

            //run query
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password),
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
    async getMany(): Promise<User[]> {
        try {
            const connection = await db.connect();

            const sql = `SELECT id,email,user_name,first_name,last_name from users`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`cant retrive users! ${(error as Error).message}`);
        }
    }
    //get specific user
    async getOne(id: number): Promise<User> {
        try {
            const connection = await db.connect();
            const sql = `SELECT email,user_name,first_name,last_name from users where id=$1`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `cant retrive this user ${id}! ${(error as Error).message}`
            );
        }
    }

    //update user
    async updateOne(u: User): Promise<User> {
        try {
            const connection = await db.connect();
            const sql = `UPDATE users set email=$1,user_name=$2,first_name=$3,last_name=$4 ,password=$5 where id=$6
            returning id,email ,user_name , first_name , last_name`;
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password),
                u.id,
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `cant update this user ${u.user_name}! ${
                    (error as Error).message
                }`
            );
        }
    }
    //delete user
    async deleteOne(id: number): Promise<User> {
        try {
            const connection = await db.connect();
            const sql = `DELETE from users where id= $1
            returning id,email ,user_name , first_name , last_name`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `cant delete this user ${id}! ${(error as Error).message}`
            );
        }
    }
    //auth user
    async authenticate(email: string, password: string): Promise<User | null> {
        try {
            const connection = await db.connect();
            const sql = `Select password FROM users WHERE email = $1`;
            const result = await connection.query(sql, [email]);
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                const isPasswordValid = bcrypt.compareSync(
                    `${password}${config.pepper}`,
                    hashPassword
                );
                if (isPasswordValid) {
                    const userInfo = await connection.query(
                        `Select id , email , user_name , first_name,  last_name FROM users WHERE email =($1)`,
                        [email]
                    );
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (error) {
            throw new Error(`Enable to login: ${(error as Error).message}`);
        }
    }
}
export default UserModel;
