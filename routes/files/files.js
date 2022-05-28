const express = require('express');
const { getFiles } = require('../../db/file');

const Router = express.Router();

Router.get('/', async (req, res) => {
    const { user_id } = req.user;

    const files = await getFiles(user_id);

    res.send(files);
})

module.exports = Router;