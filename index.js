const express = require('express');
const auth = require('./routes/auth');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', auth);

app.listen(PORT, () => {
    console.log(`Server it's listenning on port ${PORT}`);
})

module.exports = app;