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


const renderHome = require('./js/home');
const searchCocktails  = require('./js/search')
const cocktailHandler = require('./js/cocktailHandler.js')
const recipeBook = require('./js/recipe-book')


// ROUTES
app.get('/', renderHome);
app.get('/search', searchCocktails);
app.post('/search/cocktails', cocktailHandler.getCocktailsByBase);
app.post('/view', cocktailHandler.getCocktailsByName);
app.get('/recipe-book', recipeBook);
app.post('/recipe-book', cocktailHandler.insertIntoDatabase);
app.delete('/delete/deletecocktail', cocktailHandler.deleteCocktail);
// app.post('/searches', getBookInfo);
// app.post('/', insertIntoDatabase);
// app.get('/books/:book_isbn', getOneBook);
// app.put('/books/updatebook', updateBook);
// app.delete('/delete/deletebook', deleteBook);


client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
  })
  .catch(err => console.error(err));
