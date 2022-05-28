const express = require('express');
const fileUpload = require('express-fileupload');
const auth = require('./routes/auth/auth');
const contacts = require('./routes/contacts/contacts');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/auth', auth);
app.use('/contacts', contacts)

app.listen(PORT, () => {
    console.log(`Server it's listenning on port ${PORT}`);
})

module.exports = app;