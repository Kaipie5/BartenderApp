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

// let base = ["Light rum", "Applejack", "Gin", "Dark rum", "Sweet Vermouth", "Strawberry schnapps", "Scotch", "Apricot brandy", "Triple sec", "Southern Comfort", "Orange bitters", "Brandy", "Lemon vodka", "Blended whiskey", "Dry Vermouth", "Amaretto", "Champagne", "Coffee liqueur", "Bourbon", "Tequila", "Vodka", "Añejo rum", "Bitters", "Kahlua", "Dubonnet Rouge", "Irish whiskey", "Apple brandy", "Cherry brandy", "Creme de Cacao", "Port", "Coffee brandy", "Red wine", "Rum", "Ricard", "Sherry", "Cognac", "Sloe gin", "Galliano", "Peach Vodka", "Ouzo", "Spiced rum", "Angelica root", "Johnnie Walker", "Everclear", "Firewater", "Lager", "Whiskey", "Absolut Citron", "Pisco", "Irish cream", "Ale", "Chocolate liqueur", "Midori melon liqueur", "Sambuca", "Blackberry brandy", "Peppermint schnapps", "Creme de Cassis", "Jack Daniels"];

// let ingredients = ["Lime juice", "demerara Sugar", "Sugar", "Tea", "Grenadine", "Grapefruit juice", "Carbonated water", "Apple juice", "Pineapple juice", "Lemon juice", "Sugar syrup", "Milk", "Strawberries", "Chocolate syrup", "Yoghurt", "Mango", "Ginger", "Lime", "Cantaloupe", "Berries", "Grapes", "Kiwi", "Tomato juice", "Cocoa powder", "Chocolate", "Heavy cream", "Coffee", "Water", "Espresso", "Orange", "Cranberries", "Apple cider", "Cranberry juice", "Egg yolk", "Egg", "Grape juice", "Peach nectar", "Lemon", "Lemonade", "Cider", "Sprite", "7-Up"]

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
  })
  .catch(err => console.error(err));
