'use strict';

const superagent = require('superagent')
const cocktailConstructor = require('./cocktailConstructor.js');
const client = require('../lib/client');

module.exports = {
  getCocktailsByBase: function(request, response) {

    let baseLiquer = ["Light rum", "Applejack", "Gin", "Dark rum", "Sweet Vermouth", "Strawberry schnapps", "Scotch", "Apricot brandy", "Triple sec", "Southern Comfort", "Orange bitters", "Brandy", "Lemon vodka", "Blended whiskey", "Dry Vermouth", "Amaretto", "Champagne", "Coffee liqueur", "Bourbon", "Tequila", "Vodka", "Bitters", "Kahlua", "Dubonnet Rouge", "Irish whiskey", "Apple brandy", "Cherry brandy", "Creme de Cacao", "Port", "Coffee brandy", "Red wine", "Rum", "Ricard", "Sherry", "Cognac", "Sloe gin", "Galliano", "Peach Vodka", "Ouzo", "Spiced rum", "Angelica root", "Johnnie Walker", "Everclear", "Firewater", "Lager", "Whiskey", "Absolut Citron", "Pisco", "Irish cream", "Ale", "Chocolate liqueur", "Midori melon liqueur", "Sambuca", "Blackberry brandy", "Peppermint schnapps", "Creme de Cassis", "Jack Daniels"];

    const arr = [];
    baseLiquer.forEach(base =>{
      if(base.toLowerCase().includes(request.body.search.toLowerCase())){
        arr.push(superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${base}`));
        }
      })
      Promise.all(arr).then(responseFromSuper =>{
        let arr2 = [];
        for (let i = 0; i < responseFromSuper.length; i++){
            let arr = responseFromSuper[i].body.drinks.map(cocktail => {
              return new cocktailConstructor.SearchCocktail(cocktail);
          })
        arr2 = arr2.concat(arr);

      }
      // Need to sort it, somehow
      // arr2 = arr2.sort(function(a, b) {
      //   return a.name - b.name;
      // });
      // console.log(arr2);
      response.render('search/search-results-base', { arr: arr2 });
    })
  },
   getCocktailsByName: function(request, response) {
    superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${request.body.search}`).then(responseFromSuper => {
      let filteredResult = responseFromSuper.body.drinks;
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
      let sql = "SELECT * FROM cocktail_lists WHERE user_id=$1;";
      let safeValues = [global.username]
      client.query(sql, safeValues)
        .then(results => {
          let cocktailLists = results.rows;
          // console.log('Lists:', cocktailLists)
          response.render('view', { cocktail: cocktail , cocktailLists: cocktailLists});
      })
    })
  },
   insertIntoDatabase: function(request, response) {
  
    let sql = "SELECT * FROM cocktail_lists WHERE user_id=$1 AND list_name=$2;"
    let safeValues = [global.username, request.body.cocktailList]
    client.query(sql, safeValues)
        .then(results => {
          let listID = results.rows[0].cocktail_list_id;
          let sql2 = 'INSERT INTO cocktails (title, image_url, instructions, ingredients, cocktail_list) VALUES ($1, $2, $3, $4, $5);';
          let safeValues2 = [request.body.title, request.body.image_url, request.body.instructions, request.body.ingredients, listID];
  
          client.query(sql2, safeValues2);
  
          response.redirect('/recipe-book/' + request.body.cocktailList);
      })
    
  },
  deleteCocktail: function(request, response) {
    let id = request.body.cocktail_id;
    let sql1 = "SELECT * FROM cocktails WHERE id = $1;"
    let safeValues1 = [id]
    client.query(sql1, safeValues1)
        .then(results => {
          let sql2 = `DELETE FROM cocktails WHERE id = $1;`;
    
          let safeValues2 = [id];
        
          client.query(sql2, safeValues2)
            .then(() => {
              let sql1 = "SELECT * FROM cocktail_lists WHERE cocktail_list_id=$1;"
              let safeValues1 = [results.rows[0].cocktail_list]
              client.query(sql1, safeValues1)
                .then(results => {
                  response.redirect('/recipe-book/' + results.rows[0].list_name);
              })
            })
            .catch(error => {
              handleError(error, response);
            });
      })
    
  }
};