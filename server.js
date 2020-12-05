const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'smart-brain'
  }
})

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {res.send('it is working!') });

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(res, req, db, bcrypt) );

app.get('/profile/:id', (req, res) => profile.handleProfileGet(res, req, db) );

app.put('/image', (req, res) =>  image.handlerImageUpdate(res, req, db) );

app.post('/imageurl', image.handlerApiCall);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`) );

