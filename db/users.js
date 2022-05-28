const pool = require('./index');

const createUser = async (user) => {
    const query = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING user_id, username' ;
    const params = [user.username, user.password];

    try {
        const result = await pool.query(query, params)

        return result.rows[0];
    } catch (error) {
        throw new Error(`Error, user creation \n${error}`)
    }
}

const getUsers = async () => {
    const query = 'SELECT * FROM users';

    try {
        const result = await pool.query(query)

        return result;
    } catch (error) {
        throw new Error(`Error getting users \n ${error}`)
    }
}
const getUser = async (user) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const params = [user.username];

    try {
        const result = await pool.query(query, params)

        return result.rows[0];
    } catch (error) {
        throw new Error(`Error getting user \n ${error}`)
    }
}

const deleteUsers = async () => {
    const query = 'DELETE FROM users';

    try {
        const result = await pool.query(query)

        return true
    } catch (error) {
        throw new Error(`Error deleting users \n${error}`)
    }
}

module.exports = {
    getUser,
    createUser,
    deleteUsers
}