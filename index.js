
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
require('dotenv').config()// loads data from .env file for login functionality

//will enable parsing of the jwt token in a cookie to be sent with requests
const cookieParser = require('cookie-parser')
app.use(cookieParser())


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

//commented out as required for heroku deployment but causes issues when running code locally
/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
*/   