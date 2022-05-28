const pool = require('./index');

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
        console.error(`Error, user creation \n${error}`);

        return false;
    }
}

const getFileStructure = async (userId) => {
    try {
        const query = 'SELECT * FROM file_structure WHERE user_id = $1'
        const params = [userId]
    
        const file_structure = await pool.query(query, params);
    
        return  file_structure.rows[0];
    } catch (error) {
        return false;
    }
}


const createContact = async (contact) => {
    try {
        const query = `INSERT INTO contacts(user_id, name, birth_date, phone, 
            address, credit_card, credit_card_network, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`
        const params = [contact.user_id, contact.name, contact.birth_date, contact.phone,
        'llls', contact.credit_card, contact.credit_card_network,contact.email]

        const result = await pool.query(query, params);
        
        return {
            contact,
            created: true,
            error: null
        }  
    } catch (error) {
        console.log(error);
        return {
            contact,
            created: false,
            error
        }
    }
}

const createContacts =  (contacts) => {
    const results =  contacts.map(contact => (
        createContact(contact)
    ))

    return results;

}
module.exports = {
    createFileStructure,
    getFileStructure,
    createContact,
    createContacts
}