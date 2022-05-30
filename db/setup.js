const { DB_CONFIG } = require('../config');
const pool = require('./index');

setup();

async function setup() {
    pool.query(`CREATE TABLE IF NOT EXISTS users (
        user_id serial PRIMARY KEY,
        username VARCHAR ( 50 ) UNIQUE NOT NULL,
        password VARCHAR NOT NULL
     );`).then(() => {
        console.log("Users table successfully created");
    }).catch((err) => {
        console.error(`Error, users table creation \n${err}`);
        process.exit(1);
    })

    try {
        await pool.query(`CREATE TYPE file_status AS ENUM ('On Hold', 'Processing', 'Failed', 'Finished');`)
        console.log('Enum files list status created');
    } catch (error) {
        console.error(`Error, file_status creation error ${error}`)
    }

    pool.query(`CREATE TABLE IF NOT EXISTS files (
        file_id SERIAL PRIMARY KEY,
        user_id SERIAL REFERENCES users(user_id),
        name VARCHAR NOT NULL,
        createdAt timestamp NOT NULL DEFAULT now(),
        status file_status NOT NULL);`
    ).then(() => {
        console.log("files table succesfully created");
    }).catch((err) => {
        console.error(`Error, files tables creation error \n${err}`);
        process.exit(1);
    })

    pool.query(`CREATE TABLE IF NOT EXISTS contacts (
        contact_id SERIAL PRIMARY KEY,
        user_id SERIAL REFERENCES users(user_id),
        name VARCHAR ( 80 ) NOT NULL,
        birth_date DATE NOT NULL,
        phone VARCHAR(23) NOT NULL,
        address VARCHAR(100) NOT NULL,
        credit_card VARCHAR(200) NOT NULL,
        credit_card_network VARCHAR(80) NOT NULL,
        email VARCHAR(100) NOT NULL);`
    ).then(() => {
        console.log("Contacts table succesfully created");
    }).catch((err) => {
        console.error(`Error, contacts table creation \n${err}`);
        process.exit(1);
    })

    pool.query(`CREATE TABLE IF NOT EXISTS file_structure (
        user_id serial REFERENCES users(user_id),
        name_column VARCHAR (80) NOT NULL,
        birth_date_column VARCHAR (80) NOT NULL,
        phone_column VARCHAR (80) NOT NULL,
        address_column VARCHAR (80) NOT NULL,
        credit_card_column VARCHAR (80) NOT NULL,
        email_column VARCHAR (100) NOT NULL);`
    ).then(() => {
        console.log("file_structure table succesfully created");
        process.exit()
    }).catch((err) => {
        console.error(`Error, file_structure table creation \n${err}`);
        process.exit(1);
    })
}
