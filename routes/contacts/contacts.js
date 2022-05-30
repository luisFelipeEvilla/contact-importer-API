const express = require('express');
const csv = require('csvtojson');
const creditCardType = require("credit-card-type");
const { createFileStructure,
    getFileStructure,
    createContacts,
    getContacts, getContactsCount } = require('../../db/contacts');
const { createFile, updateFileStatus } = require('../../db/file');

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

        res.send(contacts);
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
        const jsonContacts = await csv().fromFile(contacts.tempFilePath);

        const file = { name: contacts.name, createdAt: new Date(), user_id: req.user.user_id }

        const fileSaved = await createFile(file);

        const contactsToSave = jsonContacts.map((contact) => (
            {
                user_id: req.user.user_id,
                name: contact[file_structure.name_column],
                birth_date: contact[file_structure.birth_date_column],
                phone: contact[file_structure.phone_column],
                address: contact[file_structure.address_column],
                credit_card: contact[file_structure.credit_card_column],
                credit_card_network: creditCardType(contact.credit_card)[0].niceType,
                email: contact[file_structure.email_column]
            }
        ))

        const results = await createContacts(contactsToSave)

        Promise.all(results).then(async results => {
            let success = 0;
            results.forEach(result => result.created === true ? success++ : 0);

            if (success === 0 & jsonContacts.length > 0) {
                fileSaved.status = 'Failed'
            } else {
                fileSaved.status = 'Finished'
            }

            await updateFileStatus(fileSaved)
            res.send(results);
        }).catch(error => {
            res.status(500).json({ error: 'internal server error' })
        })
    } catch (error) {
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = Router;