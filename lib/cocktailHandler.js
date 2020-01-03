'use strict';

const superagent = require('superagent');
const cocktailConstructor = require('./cocktailConstructor.js');
const client = require('./client');


// Ingredients is the full list of all ingredients that can be properly queried by the search ingredient call to the API
let ingredients = ["Light rum", "Applejack", "Gin", "Dark rum", "Sweet Vermouth", "Strawberry schnapps", "Scotch", "Apricot brandy", "Triple sec", "Southern Comfort", "Orange bitters", "Brandy", "Lemon vodka", "Blended whiskey", "Dry Vermouth", "Amaretto", "Champagne", "Coffee liqueur", "Bourbon", "Tequila", "Vodka", "Bitters", "Kahlua", "Dubonnet Rouge", "Irish whiskey", "Apple brandy", "Cherry brandy", "Creme de Cacao", "Port", "Coffee brandy", "Red wine", "Rum", "Ricard", "Sherry", "Cognac", "Sloe gin", "Galliano", "Peach Vodka", "Ouzo", "Spiced rum", "Angelica root", "Johnnie Walker", "Everclear", "Firewater", "Lager", "Whiskey", "Absolut Citron", "Pisco", "Irish cream", "Ale", "Chocolate liqueur", "Midori melon liqueur", "Sambuca", "Blackberry brandy", "Peppermint schnapps", "Creme de Cassis", "Jack Daniels", "Lime juice", "demerara Sugar", "Sugar", "Tea", "Grenadine", "Grapefruit juice", "Carbonated water", "Apple juice", "Pineapple juice", "Lemon juice", "Sugar syrup", "Milk", "Strawberries", "Chocolate syrup", "Yoghurt", "Mango", "Ginger", "Lime", "Cantaloupe", "Berries", "Grapes", "Kiwi", "Tomato juice", "Cocoa powder", "Chocolate", "Heavy cream", "Coffee", "Water", "Espresso", "Orange", "Cranberries", "Apple cider", "Cranberry juice", "Egg yolk", "Egg", "Grape juice", "Peach nectar", "Lemon", "Lemonade", "Cider", "Sprite", "7-Up"]

// IngredientList is the list displayed on the drop-down menu and has removed elements for easier navigation by the user
let ingredientList = ["Applejack", "Gin", "Sweet Vermouth", "Strawberry schnapps", "Scotch", "Triple sec", "Southern Comfort", "Brandy", "Dry Vermouth", "Amaretto", "Champagne", "Coffee liqueur", "Bourbon", "Tequila", "Vodka", "Bitters", "Kahlua", "Dubonnet Rouge", "Creme de Cacao", "Port", "Red wine", "Rum", "Ricard", "Sherry", "Cognac", "Galliano", "Ouzo", "Angelica root", "Johnnie Walker", "Everclear", "Firewater", "Lager", "Whiskey", "Absolut Citron", "Pisco", "Irish cream", "Ale", "Midori melon liqueur", "Sambuca", "Peppermint schnapps", "Creme de Cassis", "Jack Daniels", "Sugar", "Tea", "Grenadine", "Grapefruit", "Apple", "Pineapple", "Milk", "Strawberries", "Yoghurt", "Mango", "Ginger", "Lime", "Cantaloupe", "Berries", "Grapes", "Kiwi", "Tomato", "Cocoa powder", "Chocolate", "Heavy cream", "Coffee", "Water", "Espresso", "Orange", "Cranberry", "Egg", "Grape", "Peach nectar", "Lemon", "Cider", "Sprite", "7-Up"];

module.exports = {
  // Search cocktail database by base liquor
  getCocktailsByBase: function(request, response) {

    const arr = [];
    // Checks ingredient list for all iterations of search result, ex: rum => light rum, dark rum, rum, spiced rum and do a multi query

    ingredients.forEach(base =>{
      if(base.toLowerCase().includes(request.body.search.toLowerCase())){
        arr.push(superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${base}`));
        }
      })

      // Save results to an array
      Promise.all(arr).then(responseFromSuper =>{
        let arr2 = [];
        for (let i = 0; i < responseFromSuper.length; i++){
            let arr = responseFromSuper[i].body.drinks.map(cocktail => {
              return new cocktailConstructor.SearchCocktail(cocktail);
          })
        
          // Checks for duplicates before adding
        arr.forEach(cocktail => {
          if (arr2.length != 0){
            arr2.some(cocktail2 => cocktail2.name === cocktail.name ? arr2 : arr2.push(cocktail));
          }
          else{
            arr2.push(cocktail);
          }
        })
      }

      // Sorts cocktails in alphabetical order
      arr2 = arr2.sort(function(a, b) {
          return ('' + a.name).localeCompare(b.name);
      });
      response.render('search/search-results-base', { arr: arr2, arr2: ingredientList });
    })
  },
  
  // Search cocktail by exact name
   getCocktailsByName: function(request, response) {
    superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${request.body.search}`).then(responseFromSuper => {
      let filteredResult = responseFromSuper.body.drinks;
      let ingredientArray = [];
      let measureArray = [];
      if (filteredResult) {
        for (let [K, V] of Object.entries(filteredResult[0])) {
          if (K.includes('Ingredient')) {
            ingredientArray.push(V);
          }
          if (K.includes('Measure')) {
            measureArray.push(V);
          }
        }
        let cocktail = new cocktailConstructor.Cocktail(filteredResult[0], ingredientArray, measureArray);
        let ingredientsList = cocktail.ingredients.split(',')
        cocktail.ingredients = ingredientsList
        let sql = "SELECT * FROM cocktail_lists WHERE user_id=$1;";
        let safeValues = [global.username]
        client.query(sql, safeValues)
          .then(results => {
            let cocktailLists = results.rows;
            response.render('view', { cocktail: cocktail , cocktailLists: cocktailLists});
        })
      } else {
        response.redirect('/search')
      }
    })
  },

  // Search cocktail database via multiple ingredients
  filterExtraIngredients: function(request, response) {
    let oldArr = request.body.cocktail;

    const arr = [];
    // Checks ingredient list for all iterations of search result, ex: rum => light rum, dark rum, rum, spiced rum and do a multi query
    ingredients.forEach(ingredient =>{
      if(ingredient.toLowerCase().includes(request.body.ingredient.toLowerCase())){
        arr.push(superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`));
        }
      })

      // Save results to array
      Promise.all(arr).then(responseFromSuper =>{
        let arr2 = [];
        for (let i = 0; i < responseFromSuper.length; i++){
            let arr = responseFromSuper[i].body.drinks.map(cocktail => {
              return new cocktailConstructor.SearchCocktail(cocktail);
          })
        

        // Checks for duplicates before adding
        arr.forEach(cocktail => {
          if (arr2.length != 0){
            arr2.some(cocktail2 => cocktail2.name === cocktail.name ? arr2 : arr2.push(cocktail));
          }
          else{
            arr2.push(cocktail);
          }
        })
      }

      // Sorts cocktails in alphabetical order
      arr2 = arr2.sort(function(a, b) {
          return ('' + a.name).localeCompare(b.name);
      });

      let newArr = [];
      oldArr.forEach(name => {
            arr2.forEach(cocktail2 =>{
                name === cocktail2.name ? newArr.push(cocktail2) : newArr;
            })
      })
      // if(newArr.length === 0){

      //   response.redirect(302, '/search');
      //   console.log(response);
      // }
      // else{
        response.render('search/search-results-base', { arr: newArr, arr2: ingredientList });
      // }
    })
  },

  // Insert selected cocktail into SQL database
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
  // Removed selected cocktail from SQL database

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
    
  },

  updateCocktail: function(request, response) {
    let id = request.body.cocktail_id;
    let sql1 = "UPDATE cocktails SET title=$1, instructions=$2, ingredients=$3 WHERE id = $4;"
    let safeValues1 = [request.body.title, request.body.instructions, request.body.ingredients, id]
    client.query(sql1, safeValues1)
        .then(results => {
          response.redirect('/recipe-book/' + request.body.currentList)
      })

  }
};