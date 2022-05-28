const pool = require('./index');
const validator = require('validator').default;

const getContacts = async (user_id, offset, limit) => {
    const query = `SELECT * FROM contacts where user_id = $1 LIMIT $2 OFFSET $3`;
    const params = [user_id, limit, offset];

    const contacts = await pool.query(query, params);

    return contacts.rows;
}

const createFileStructure = async (fileStructure) => {
    const found = await getFileStructure(fileStructure.user_id);

    let query = '';

    if (found) {
        query = `UPDATE file_structure SET (user_id, name_column, birth_date_column, phone_column, 
            address_column, credit_card_column, email_column) = ($1, $2, $3, $4, $5, $6, $7)`;
    } else {
        query = 'INSERT INTO file_structure VALUES($1, $2, $3, $4, $5, $6, $7)';
    }

    const params = [fileStructure.user_id, fileStructure.name, fileStructure.birth_date,
    fileStructure.phone, fileStructure.address, fileStructure.credit_card, fileStructure.email];

    try {
        const result = await pool.query(query, params)

        return true;
    } catch (error) {
        console.error(`Error, file_structure creation \n${error}`);

        return false;
    }
}

const getFileStructure = async (userId) => {
    try {
        const query = 'SELECT * FROM file_structure WHERE user_id = $1'
        const params = [userId]

        const file_structure = await pool.query(query, params);

        return file_structure.rows[0];
    } catch (error) {
        return false;
    }
}


const createContact = async (contact) => {
    try {

        const valid = await validateContact(contact);

        const validations = await validateContact(contact);

        const isValid = Object.values(validations).every(validation => validation == true);

        if (isValid) {
            const query = `INSERT INTO contacts(user_id, name, birth_date, phone, 
                address, credit_card, credit_card_network, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`
            const params = [contact.user_id, contact.name, contact.birth_date, contact.phone,
                'llls', contact.credit_card, contact.credit_card_network, contact.email]

            const result = await pool.query(query, params);

            return {
                contact,
                created: true,
                error: null
            }
        } else {
            return {
                contact,
                created: false,
                error: true,
                validations: validations
            }
        }
    } catch (error) {
        console.log(error);
        return {
            contact,
            created: false,
            error,
            validations: null
        }
    }
}

const createContacts = (contacts, acum) => {
    const results = contacts.map(contact => (
        createContact(contact)
    ))

    return results;
}

const getContactByEmail = async (email, user_id) => {
    try {
        const query = 'SELECT * FROM contacts WHERE email = $1 and user_id = $2';
        const params = [email, user_id];
    
        const found = await pool.query(query, params);
        
        return found.rows[0];
    } catch (error) {
        throw new Error(`Error fetching contact by email and user_id ${error}`)
    }
}

const validateContact = async (contact) => {
    let validName = true;
    let validDate = true;
    let validPhone = true;
    let validAddress = true;
    let validEmail = true;
    let validCreditCard = true;

    // validate name don't contains special characters
    const nameFormat = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    if (nameFormat.test(contact.name)) validName = false;

    if (!validator.isDate(contact.birth_date) && !validator.isDate(contact.birth_date, { format: '%F' })) validDate = false;

    const phoneFormat = /\(\+\d{2}\) \d{3} \d{3} \d{2} \d{2}/ //(+57) 320 432 05 09
    const phoneFormat2 = /\(\+\d{2}\) \d{3}-\d{3}-\d{2}-\d{2}/ //(+57) 320-432-05-09
    if (!phoneFormat.test(contact.phone) && !phoneFormat2.test(contact.phone)) validPhone = false;

    if (!contact.address.trim()) validAddress = false;

    if (!validator.isEmail(contact.email)) validEmail = false;
    const contactFound = await getContactByEmail(contact.email, contact.user_id);
    if (contactFound) validEmail = false;

    if (!validator.isCreditCard(contact.credit_card)) validCreditCard = false;

    return {
        validName,
        validDate,
        validPhone,
        validAddress,
        validEmail,
        validCreditCard
    }
}


module.exports = {
    createFileStructure,
    getFileStructure,
    createContact,
    createContacts,
    getContactByEmail,
    getContacts
}