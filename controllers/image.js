const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f33286c4252c4be2831316717977a9c1'
});

const handlerApiCall = (req, res) => {
  app.models.initModel({id:'c0c0ac362b03416da06ab3fa36fb58e3', version: "aa7f35c01e0642fda5cf400f543e7c40"})
    .then(faceDerectlModel => faceDerectlModel.predict(req.body.input))
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with api'));
}

const handlerImageUpdate = (req, res, db) => {
  const { id } = req.body;

  db.from('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('unable to get entries'))
}

module.exports = {
  handlerImageUpdate,
  handlerApiCall
}