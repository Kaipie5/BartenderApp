'use strict';

const superagent = require('superagent')
const cocktailConstructor = require('./cocktailConstructor.js');
const client = require('../lib/client');

module.exports = {
  getCocktailsByBase: function(request, response) {
    superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${request.body.search}`).then(responseFromSuper => {
      let arr = responseFromSuper.body.drinks.map(cocktail => {
        return new cocktailConstructor.SearchCocktail(cocktail);
      });
      response.render('search/search-results-base', { arr: arr });
    })
  },
   getCocktailsByName: function(request, response) {
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
      let cocktail = new cocktailConstructor.Cocktail(filteredResult[0], ingredientArray, measureArray);
      response.render('view', { cocktail: cocktail });
    })
  },
   insertIntoDatabase: function(request, response) {
    console.log(request.body.id);
    console.log(request.body.title);
    console.log(request.body.image_url);
    console.log(request.body.instructions);
    console.log(request.body.ingredients);
  
    let sql = 'INSERT INTO cocktails (cocktail_id, title, image_url, instructions, ingredients) VALUES ($1, $2, $3, $4, $5);';
    let safeValues = [request.body.id, request.body.title, request.body.image_url, request.body.instructions, request.body.ingredients];
  
    client.query(sql, safeValues);
  
    response.redirect('/recipe-book');
  },
  deleteCocktail: function(request, response) {
    let sql = `DELETE FROM cocktails WHERE cocktail_id = $1;`;
    let id = request.body.cocktail_id;
    let safeValues = [id];
  
    client.query(sql, safeValues)
      .then(() => {
        response.redirect('/recipe-book');
      })
      .catch(error => {
        handleError(error, response);
      });
  }
};