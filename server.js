const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db) });
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db) });
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res) });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`) );