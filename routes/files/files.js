const express = require('express');
const { getFiles, getFilesCount } = require('../../db/file');

const Router = express.Router();

Router.get('/count', async (req, res) => {
    const { user_id } = req.user;
    try {
        const files = await getFilesCount(user_id);

        res.send(files);        
    } catch (error) {
        res.status(500).json({error: 'Server error'})
    }    
})

Router.get('/', async (req, res) => {
    const { user_id } = req.user;
    const { limit, offset } = req.query;
    
    try {
        const files = await getFiles(user_id, limit, offset);

        res.send(files);        
    } catch (error) {
        res.status(500).json({error: 'Server error'})
    }    
})

module.exports = Router;