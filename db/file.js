const pool = require('./index');

/**
 * get users contact csv files information number 
 * @param {int} user_id 
 * @returns {[files]} returns an files array
 */
 const getFilesCount = async (user_id) => {
    try {
        const query = `SELECT COUNT(*) FROM files WHERE user_id = $1`;
        const params = [user_id];
    
        const files = await pool.query(query,  params);
    
        return files.rows[0].count;
    } catch (error) {
        throw new Error(`Error fetching files ${error}`);
    }
}

/**
 * get users contact csv files information 
 * @param {int} user_id 
 * @param {int} limit 
 * @param {int} offset 
 * @returns {[files]} returns an files array
 */
const getFiles = async (user_id, limit, offset) => {
    try {
        const query = `SELECT * FROM files WHERE user_id = $1 ORDER BY createdAt DESC LIMIT $2 OFFSET $3`;
        const params = [user_id, limit, offset];
    
        const files = await pool.query(query,  params);
    
        return files.rows;
    } catch (error) {
        throw new Error(`Error fetching files ${error}`);
    }
}

/**
 * get users contact csv files information 
 * @param {int} file_id 
 * @param {int} limit 
 * @param {int} offset 
 * @returns {[files]} returns an files array
 */
 const getFileCount = async (file_id, created) => {
    try {
        let query = `SELECT COUNT(*) FROM contacts WHERE file_id = $1`;
        
        if (!created) {
            query = `SELECT COUNT(*) FROM contacts_fail WHERE file_id = $1`;
        }  

        const params = [file_id];
    
        const results = await pool.query(query,  params);
        
        return results.rows[0].count
    } catch (error) {
        throw new Error(`Error fetching file ${error}`);
    }
}

/**
 * get users contact csv files upload information 
 * @param {int} file_id 
 * @param {int} limit 
 * @param {int} offset 
 * @returns {[files]} returns an files array
 */
 const getFile = async (file_id, created, limit, offset) => {
    try {
        
        let query = `SELECT * FROM contacts WHERE file_id = $1 LIMIT $2 OFFSET $3`;

        if (!created) {
            query = `SELECT * FROM contacts_fail WHERE file_id = $1 LIMIT $2 OFFSET $3`;
        }

        const params = [file_id, limit, offset];
    
        const results = await pool.query(query,  params);
        
        return results.rows
    } catch (error) {
        throw new Error(`Error fetching file ${error}`);
    }
}

/**
 * Create a file
 * @param {{user_id, name}} file 
 * @returns {{file_id, user_id, name, createdAt, status}} file saved 
 */
const createFile = async (file) => {
    try {
        const query = `INSERT INTO files (user_id, saved_name, createdAt, name, status) VALUES($1, $2, $3, $4, $5) RETURNING *`
        const params = [file.user_id, file.saved_name, file.createdAt, file.name, 'On Hold']
    
        const fileSaved = await pool.query(query, params)
    
        return fileSaved.rows[0]
    } catch (error) {
        throw new Error(`File creation error ${error}`);
    }
}


const updateFileStatus = async (file) => {
    try {
        const query = `UPDATE files SET status = $1 WHERE file_id = $2`
        const params = [file.status, file.file_id];
    
        const fileUpdated = await pool.query(query, params)

        return {
            error: null,
            fileUpdated
        };
    } catch (error) {
        throw new Error(`Error updatig file status ${error}`)
    }
}

module.exports = {
    createFile,
    updateFileStatus,
    getFiles,
    getFilesCount,
    getFile,
    getFileCount
}