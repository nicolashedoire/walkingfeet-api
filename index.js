require('dotenv').config();
const mongoose = require('mongoose');
const { Hiking } = require('./models/hiking');
const { User } = require('./models/user');
const { City } = require('./models/city');
const https = require('https');
const fs = require('fs');
const express = require("express");
const pretty = require('express-prettify');
const cors = require('cors');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { generateJwt } = require('./services/jwt');

mongoose.connect("mongodb://mongo:mongo@localhost/walkingfeet", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => console.log(`Erreur de connexion à la base : ${err}`))
mongoose.connection.on('open', () => console.log('Connexion à la base de données réussie...'));

const app = express();
app.use(helmet());
app.use(pretty({ query: 'pretty' }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

console.log(`Mongoose version ${mongoose.version} installée`);

app.get('/', (req, res) => {
  res.send('API running...');
})

app.post('/oauth/google', async (req, res) => {
  const user = await User.findOne({email: req.body.email}, (err, user) => user);
  if (user === null) {
    const user = new User({
      email: req.body.email,
      googleId: req.body.googleId,
      picture: req.body.picture,
      pseudo: req.body.pseudo,
    });
    user.save(async (err, result) => {
      if(err) {
        res.status(500).send({error :{message: 'Request failed with status code 500'}})
      }
      console.log(`User ${req.body.email} saved`);
      const jwt = await generateJwt(result);
      return res.status(200).send({token: jwt});
    })
  }else{
    const jwt = await generateJwt(user);
    return res.status(200).send({token: jwt});
  }
});


app.post('/signin', async (req, res) => {
  const user = await User.findOne({email: req.body.email}, (err, user) => user);
  if (user === null) {
    return res.status(404).send();
  }
  const isSamePassword = await bcrypt.compare(req.body.password, user.password);
  if(!isSamePassword) {
    return res.status(401).send();
  }else{
    const jwt = await generateJwt(user);
    return res.status(200).send({token: jwt});
  }
});

app.post('/signup', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email}, (err, user) => user);
    if (user !== null) {
      res.status(403).send();
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        password: hashedPassword
      });
      user.save(() => {
        console.log(`User ${req.body.email} saved`);
        res.status(200).send({message: 'account created', translation: ''});
      })
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/hikings', async (req, res) => {
  Hiking.find((err, hikings) => {
    if (err) return console.err(err);
    return res.send(hikings);
  });
});

app.get('/hikings/:id', async (req, res) => {
  console.log(req.params.id);
  Hiking.findById(req.params.id, (err, hiking) => {
    if (err) return console.err(err);
    return res.send(hiking);
  });
});

app.get('/cities', async (req, res) => {
  const city = req.query.name;
  if(city.length < 3) {
    return res.send([]);
  }
  City.find({name: new RegExp(city, 'i')}, (err, cities) => {
    console.log(cities);
    if (err) return console.err(err);
    return res.send(cities);
  })
});

app.post('/hikings', async (req, res) => {
  const hiking = new Hiking({
    name: req.body.name,
    note: req.body.note,
    difficulty: req.body.difficulty,
    distance: req.body.distance,
    city: req.body.city,
    country: req.body.country,
    startDate: req.body.startDate,
    elevation: req.body.elevation,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  });
  hiking.save(() => {
    console.log(`Hiking ${req.body.name} saved`);
    res.status(200).send();
  });
});

app.put('/hikings/:id', async (req, res) => {
  Hiking.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    note: req.body.note,
    difficulty: req.body.difficulty,
    distance: req.body.distance,
    city: req.body.city,
    country: req.body.country,
    startDate: req.body.startDate,
    elevation: req.body.elevation,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  }, null, () => {
    console.log(`Hiking ${req.params.id} updated`);
    res.status(200).send();
  });
});

app.delete('/hikings/:id', async (req, res) => {
  Hiking.findByIdAndDelete(req.params.id, () => {
    console.log(`Hiking ${req.params.id} deleted`);
    res.status(200).send();
  });
});

https.createServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert')
}, app).listen(5004, () => {
  console.log('Mongodb API listen on port 5004');
});