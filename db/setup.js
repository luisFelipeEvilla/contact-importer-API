const { DB_CONFIG } = require('../config');
const pool = require('./index');

pool.query(`CREATE TABLE IF NOT EXISTS users (
        user_id serial PRIMARY KEY,
        username VARCHAR ( 50 ) UNIQUE NOT NULL,
        password VARCHAR NOT NULL
     );`).then(() => {
    console.log("Tabla de usuarios creada satisfactoriamente");
    process.exit();
}).catch((err) => {
    console.log(`Error creando la tabla de usuarios \n${err}`);
    process.exit(1);
})