const express = require('express');
const { createFileStructure,
    getFileStructure,
    getContacts, getContactsCount } = require('../../db/contacts');
const { createFile } = require('../../db/file');
const { decrypt } = require('../../utils/encryption');
const {copyFile} = require('fs');
const { FILES_SAVED_PATH } = require('../../config');
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const Router = express.Router();

Router.get('/count', async (req, res) => {
    try {
        const { user_id } = req.user;

        const count = await getContactsCount(user_id);

        res.send(count);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

Router.get('/', async (req, res) => {
    try {
        const { user_id } = req.user;
        const { offset, limit } = req.query;

        const contacts = await getContacts(user_id, offset, limit);

        const contactsDecrypted =  contacts.map(contact => {
            contact.credit_card = decrypt(contact.credit_card).slice(-5,-1);

            return contact
        })

        res.send(contactsDecrypted);
    } catch (error) {
        res.status(500).json(error)
    }
})

Router.post('/config', async (req, res) => {
    if (!req.is('application/json')) {
        res.status(400).json({ error: 'Error, the content-type header should be application/json' })
    } else {
        try {
            const { ...config } = req.body;

            config.user_id = req.user.user_id;

            const result = await createFileStructure(config);

            res.send(result)
        } catch (error) {
            res.status(500).send(error)
        }

    }
})

Router.post('/', async (req, res) => {
    if (!req.is('multipart/form-data')) {
        return res.status(400).json({
            message: 'Error, the content-type header should be multipart/form-data'
        })
    }
    const { contacts } = req.files;

    const file_structure = await getFileStructure(req.user.user_id);

    if (!file_structure) {
        return res.status(500).json({ error: `User should set a file columns configurations` })
    }

    try {
        const newFileName =  uuidv4() + '.csv'
        copyFile(contacts.tempFilePath, path.join(FILES_SAVED_PATH, newFileName), async (error) => {
            if (error) { 
                return res.status(500).send({error: `Error saving csv file \n ${error}`})
            }
            const file = { name: contacts.name, saved_name: newFileName, createdAt: new Date(), user_id: req.user.user_id }

            const fileSaved = await createFile(file); 
    
            res.status(200).json(fileSaved);
        })
 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = Router;