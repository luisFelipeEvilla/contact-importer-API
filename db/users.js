const pool = require('./index');

const createUser = async (user) => {
    const query = 'INSERT INTO users(username, password) VALUES($1, $2)';
    const params = [user.username, user.password];

    try {
        const result = await pool.query(query, params)
        console.log("user created succesfully");

        return true
    } catch (error) {
        console.error(`Error, user creation \n${error}`);

        return false;
    }
}

const createUsers = (users) => {
    const results = [];

    users.forEach(async (user) => {
        const result = new Promise((resolve, reject) => {
            createUser(user.eventId, user.username, user.password).
                then((created) => {
                    resolve({ id: user.eventId, created })
                })
        });

        results.push(result)
    })

    return results;
}

const getUsers = async () => {
    const query = 'SELECT * FROM users';

    try {
        const result = await pool.query(query, params)

        return result;
    } catch (error) {
        console.error(`Error getting users \n ${error}`);

        return false;
    }
}
const getUser = async (user) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const params = [user.username];

    try {
        const result = await pool.query(query, params)

        return result.rows[0];
    } catch (error) {
        console.error(`Error getting user \n ${error}`);

        return false;
    }
}

const deleteUsers = async () => {
    const query = 'DELETE FROM users';

    try {
        const result = await pool.query(query)

        return true
    } catch (error) {
        console.error(`Error deleting users \n${error}`);

        return false;
    }
}

module.exports = {
    getUser,
    createUser,
    createUsers,
    deleteUsers
}