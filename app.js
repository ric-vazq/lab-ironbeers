const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const port = 3000;

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, '/views/partials'))

app.get('/', (req, res) => {
  res.render('index', {title: "Home"});
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromAPI => {
      console.log('Beers from the database: ', beersFromAPI);
      res.render('beers', {beersFromAPI});
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log('Random Beer from the database: ', responseFromAPI);
      res.render('random-beer', responseFromAPI[0]);
    })
    .catch(error => console.log(error));
});

app.listen(port, () => console.log(`🏃‍ on port ${port}`));
