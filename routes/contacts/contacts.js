const express = require('express');
const csv = require('csvtojson');
const creditCardType = require("credit-card-type");
const { createFileStructure, 
    getFileStructure, 
    createContacts,
    getContacts } = require('../../db/contacts');

const Router = express.Router();

Router.get('/', async (req, res) => {
    const { user_id } = req.user;
    const { offset, limit } = req.query;

    const contacts = await getContacts(user_id, offset, limit);

    res.send(contacts);
})

Router.post('/config', async (req, res) => {
    const { ...config } = req.body;

    config.user_id = req.user.user_id;

    const result = await createFileStructure(config);

    res.send(result)
})

Router.post('/', async (req, res) => {
    if (!req.is('multipart/form-data')) {
        res.status(400).json({
            message: 'Eror, the content-type header should be multipart/form-data'
        })
    } else {
        const { contacts } = req.files;

        const file_structure = await getFileStructure(req.user.user_id);

        const jsonContacts = await csv().fromFile(contacts.tempFilePath);

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

        Promise.all(results).then(results => {
            res.send(results);
        }).catch(error => {
            res.send(error)
        })
    }
})

module.exports = Router;