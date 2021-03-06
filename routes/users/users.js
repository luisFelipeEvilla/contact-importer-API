const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUser } = require('../../db/users');
const { jwtSecret } = require('../../config');

const Router = express.Router();

Router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        const user = {
            username,
            password
        }

        try {
            const found = await getUser(user);
            if (found) {
                return res.status(400).json({ error: `user already exists` })
            }

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            const result = await createUser(user)

            const token = jwt.sign(
                { user_id: result.user_id, username: result.username },
                jwtSecret,
                {
                    expiresIn: '3d'
                }
            )

            result.token = token;

            res.status(201).json(result)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' })
        }
    } else {
        res.status(400).json('You need to pass a username and password')
    }
})

Router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        const user = {
            username,
            password
        }

        try {
            const userDB = await getUser(user)
            
            if (userDB) {
                const authenticate = bcrypt.compareSync(user.password, userDB.password);

                const token = jwt.sign(
                    { user_id: userDB.user_id, username: userDB.username },
                    jwtSecret,
                    {
                        expiresIn: '3d'
                    }
                )

                userDB.token = token;
                delete userDB.password;
                
                authenticate ? res.send(userDB) : res.status(400).json({error: "Error, wrong password"});
            } else {
                res.status(404).json(`User doesn't exists`);
            }
        } catch (error) {
            res.status(500).json({error});
        }
    } else {
        res.status(400).json({error:'you need to pass a username and password'})
    }
})

module.exports = Router;