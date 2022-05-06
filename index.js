
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));

const path = require('path');
const public = path.join(__dirname,'Public');
app.use(express.static(public));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/menuroutes');
app.use('/', router); 

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})