'use strict';

const express = require('express')
require('dotenv').config()
const app = express()
require('ejs')
const superagent = require('superagent')
const client = require('./lib/client')
var methodOverride = require('method-override')

const PORT = process.env.PORT || 3001;
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true, }));
app.use(methodOverride('_method'));

app.get('/', renderHome);
app.get('/search', searchCocktails);
// app.post('/searches', getBookInfo);
app.post('/search/cocktails', getCocktailsByBase);
app.post('/view', getCocktailsByName);
// app.post('/', insertIntoDatabase);
// app.get('/books/:book_isbn', getOneBook);
// app.put('/books/updatebook', updateBook);
// app.delete('/delete/deletebook', deleteBook);

// function getForm(request, response){
//   response.render('pages/searches/new');
// }
function renderHome(request, response){
  response.render('index');
}

function searchCocktails(request, response){
  response.render('search/search');
}

function getCocktailsByBase(request, response){
  superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${request.body.search}`).then(responseFromSuper => {
      let arr = responseFromSuper.body.drinks.map(cocktail => {
        return new SearchCocktail(cocktail);
      });
    response.render('search/search-results-base', {arr: arr});
  })
}

function getCocktailsByName(request, response){
  superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${request.body.search}`).then(responseFromSuper => {
    let filteredResult = responseFromSuper.body.drinks;
    console.log(filteredResult[0]);
      let ingredientArray = [];
      let measureArray = [];
      for (let [K, V] of Object.entries(filteredResult[0])) {
        if (K.includes('Ingredient')) {
          ingredientArray.push(V);
        }
        if (K.includes('Measure')) {
          measureArray.push(V);
        }
      }
      let cocktail = new Cocktail(filteredResult[0], ingredientArray, measureArray);
        response.render('view', {cocktail: cocktail});
})
}

<<<<<<< HEAD
function Cocktails(obj) {
  this.name = obj.strDrink;
  this.image_url = obj.strDrinkThumb;
  this.id = obj.idDrink;
  this.alcoholic = obj.strAlcoholic;
  this.category = obj.strCategory;
  this.instructions = obj.strInstructions;
  // for (let i = 0; i < 15; i++){
  //     if(obj.strIngredient`${i+1}` !== null){
  //         this.ingredient`${i+1}` = obj.strIngredient`${i+1}`;
  //     }
  // }
  // for (let i = 0; i < 15; i++){
  //     if(obj.strMeasure`${i+1}` !== null){
  //         this.measure.push(obj.strMeasure`${i+1}`);
  //     }
  // }
=======
function Cocktail(obj, ingredientArray, measureArray){
    this.name = obj.strDrink; 
    this.image_url = obj.strDrinkThumb;
    this.id = obj.idDrink;
    this.alcoholic = obj.strAlcoholic;
    this.category = obj.strCategory;
    this.instructions = obj.strInstructions;
    this.ingredients = ingredientArray[0] + " " +  measureArray[0];
    for(let i = 1; i < ingredientArray.length; i++){
      ingredientArray[i] !== null ? this.ingredients = this.ingredients + ', ' + ingredientArray[i] : this.ingredients;
      
      measureArray[i] !== null ? this.ingredients = this.ingredients + " " +  measureArray[i] : this.ingredients;
    }
>>>>>>> 8d69433a9295740e563ca91da8b2c86b328e314b
}

function SearchCocktail(obj) {
  this.name = obj.strDrink;
  this.image_url = obj.strDrinkThumb;
  this.id = obj.idDrink;
}


client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
  })
  .catch(err => console.error(err));
