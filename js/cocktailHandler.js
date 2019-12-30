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