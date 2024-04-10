const express = require('express');
const app = express();
const { getOwners, createOwner } = require('./db/owners.js');

const client = require('./db/client.js');
client.connect();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  console.log('gotcha');
  next();
});

app.get('/owners', async(req, res, next) => {
  try {
    const owners = await getOwners();
    res.status(200).send(owners);
  } catch(error) {
    next({
      name: 'Unfound Owners',
      message: 'We lost all of the owners'
    });
  }
});

app.post('/owners', async(req, res) => {
  const { name } = req.body;
  const createdOwner = await createOwner(name)
  res.status(201).send(createdOwner);
});

app.use((req, res) => {
  res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested endpoint'});
  // res.send('<h1>Not Found</h1>');
})

app.use((error, req, res, next) => {
  console.log(`SERVER ERROR`, error);
  res.status(500).send({name: error.name, message: error.message})
});

app.listen(3000, () => console.log(`listening on port 3000`));