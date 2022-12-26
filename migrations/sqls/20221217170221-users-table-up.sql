-- create table user 

CREATE TABLE users(
    id SERIAL PRIMARY KEY , 
    email VARCHAR(50) UNIQUE,
    user_name VARCHAR(50) not null ,
    first_name VARCHAR(50) not null ,
    last_name VARCHAR(50) not null ,
    password VARCHAR(255) not null
);