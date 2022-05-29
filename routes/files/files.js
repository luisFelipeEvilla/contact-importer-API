const express = require('express');
const { getFiles } = require('../../db/file');

const Router = express.Router();

Router.get('/', async (req, res) => {
    const { user_id } = req.user;
    const { limit, offset } = req.params;
    try {
        const files = await getFiles(user_id, limit, offset);

        res.send(files);        
    } catch (error) {
        res.status(500).json({error: 'Server error'})
    }    
})

module.exports = Router;