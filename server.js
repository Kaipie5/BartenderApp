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
const loginHandler = require('./js/loginHandler.js')
const viewAllRecipeBooks = require('./js/all-recipe-books.js')
const createNewCocktailList = require('./js/create-new-cocktail-list.js')
const filterExtraIngredients = require('./js/filterIngredient')


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
app.get('/about-devs', (request, response) => {response.render('about-devs')})
app.post('/newCocktailList', createNewCocktailList);
app.post('/search/cocktails/extra', filterExtraIngredients);
// app.post('/searches', getBookInfo);
// app.post('/', insertIntoDatabase);
// app.get('/books/:book_isbn', getOneBook);
// app.put('/books/updatebook', updateBook);
// app.delete('/delete/deletebook', deleteBook);

let ingredients = ["Light rum", "Applejack", "Gin", "Dark rum", "Sweet Vermouth", "Strawberry schnapps", "Scotch", "Apricot brandy", "Triple sec", "Southern Comfort", "Orange bitters", "Brandy", "Lemon vodka", "Blended whiskey", "Dry Vermouth", "Amaretto", "Tea", "Champagne", "Coffee liqueur", "Bourbon", "Tequila", "Vodka", "Añejo rum", "Bitters", "Sugar", "Kahlua", "demerara Sugar", "Dubonnet Rouge", "Lime juice", "Irish whiskey", "Apple brandy", "Carbonated water", "Cherry brandy", "Creme de Cacao", "Grenadine", "Port", "Coffee brandy", "Red wine", "Rum", "Grapefruit juice", "Ricard", "Sherry", "Cognac", "Sloe gin", "Apple juice", "Pineapple juice", "Lemon juice", "Sugar syrup", "Milk", "Strawberries", "Chocolate syrup", "Yoghurt", "Mango", "Ginger", "Lime", "Cantaloupe", "Berries", "Grapes", "Kiwi", "Tomato juice", "Cocoa powder", "Chocolate", "Heavy cream", "Galliano", "Peach Vodka", "Ouzo", "Coffee", "Spiced rum", "Water", "Espresso", "Angelica root", "Orange", "Cranberries", "Johnnie Walker", "Apple cider", "Everclear", "Cranberry juice", "Egg yolk", "Egg", "Grape juice", "Peach nectar", "Lemon", "Firewater", "Lemonade", "Lager", "Whiskey", "Absolut Citron", "Pisco", "Irish cream", "Ale", "Chocolate liqueur", "Midori melon liqueur", "Sambuca", "Cider", "Sprite", "7-Up", "Blackberry brandy", "Peppermint schnapps", "Creme de Cassis", "Jack Daniels"];

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
  })
  .catch(err => console.error(err));
