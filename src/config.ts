import dotenv from 'dotenv';

dotenv.config();

const {
    PORT,
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORDD,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env;

export default {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES,
    password: POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORDD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
};
