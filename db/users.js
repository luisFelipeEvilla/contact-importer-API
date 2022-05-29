const pool = require('./index');

/**
 * create a user in the database
 * @param {{username: String, password: String}} user 
 * @returns {{user_id: int, username: String}} returns used saved
 */
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

/** 
 * @param {String} user 
 * @returns {{user_id: int, username: String, password: String} | null} returns user found
 */
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

module.exports = {
    getUser,
    createUser
}