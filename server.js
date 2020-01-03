'use strict';

const express = require('express')
require('dotenv').config()
const app = express()
require('ejs')

const client = require('./lib/client')
const methodOverride = require('method-override')

const PORT = process.env.PORT || 3001;
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true, }));
app.use(methodOverride('_method'));


const renderHome = require('./lib/home');
const searchCocktails  = require('./lib/search')
const cocktailHandler = require('./lib/cocktailHandler.js')
const recipeBook = require('./lib/recipe-book')
const loginHandler = require('./lib/loginHandler.js')
const viewAllRecipeBooks = require('./lib/all-recipe-books.js')
const createNewCocktailList = require('./lib/create-new-cocktail-list.js')


// ROUTES
app.get('/', (request, response) => {response.render('index')});
app.post('/login', loginHandler)
app.get('/home', renderHome);
app.get('/search', searchCocktails);
app.post('/search/cocktails', cocktailHandler.getCocktailsByBase);
app.post('/view', cocktailHandler.getCocktailsByName);
app.get('/recipe-book/:id', recipeBook);
app.get('/all-recipe-books', viewAllRecipeBooks)
app.post('/insertcocktail', cocktailHandler.insertIntoDatabase);
app.delete('/delete/deletecocktail', cocktailHandler.deleteCocktail);
app.put('/update', cocktailHandler.updateCocktail)
app.get('/about-devs', (request, response) => {response.render('about-devs')})
app.post('/newCocktailList', createNewCocktailList);
app.post('/search/cocktails/extra', cocktailHandler.filterExtraIngredients);
app.get('*', (request, response) => {
  response.render('error');
});

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
  })
  .catch(err => {console.error(err); response.render('error')});
