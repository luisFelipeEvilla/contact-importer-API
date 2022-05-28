const pool = require('./index');

const getFiles = async (user_id, limit, offset) => {
    try {
        const query = `SELECT * FROM files WHERE user_id = $1 LIMIT $2 OFFSET $3`;
        const params = [user_id, limit, offset];
    
        const files = await pool.query(query,  params);
    
        return files.rows;
    } catch (error) {
        throw new Error(`Error fetching files ${error}`);
    }
}

const createFile = async (file) => {
    try {
        const query = `INSERT INTO files (user_id, name, status) VALUES($1, $2, $3) RETURNING *`
        const params = [file.user_id, file.name, 'Processing']
    
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
    getFiles
}