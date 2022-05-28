const express = require('express');
const fileUpload = require('express-fileupload');
const users = require('./routes/users/users');
const contacts = require('./routes/contacts/contacts');
const auth = require('./middlewares/auth');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/', users);
app.use('/contacts', auth, contacts)

app.listen(PORT, () => {
    console.log(`Server it's listenning on port ${PORT}`);
})

module.exports = app;