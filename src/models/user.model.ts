import User from '../types/user.type';
import db from '../database';
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
    async getOne(id: string): Promise<User> {
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
                u.password,
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
    async deleteOne(id: string): Promise<User> {
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
}
export default UserModel;
