const express = require('express');
const { getFiles, getFilesCount, getFile, getFileCount } = require('../../db/file');

const Router = express.Router();

Router.get('/count', async (req, res) => {
    const { user_id } = req.user;
    try {
        const files = await getFilesCount(user_id);

        res.send(files);
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

Router.get('/count/:id', async (req, res) => {
    const { id } = req.params;
    const { created } = req.query;

    try {
        const files = await getFileCount(id, created);

        res.send(files);
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

Router.get('/', async (req, res) => {
    const { user_id } = req.user;
    const { limit, offset } = req.query;

    try {
        const files = await getFiles(user_id, limit, offset);

        res.send(files);
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

Router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { created } = req.query;

    try {
        const files = await getFile(id, created);

        res.send(files);
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = Router;