const express = require('express');
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
const users = require('./routes/users/users');
const contacts = require('./routes/contacts/contacts');
const files = require('./routes/files/files');
const auth = require('./middlewares/auth');

const swaggerFile = require('./swagger-output.json')

const PORT = 3000;

const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// routes
app.use('/', users);
app.use('/files', auth, files)
app.use('/contacts', auth, contacts)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server it's listenning on port ${PORT}`);
    })
}

module.exports = app;