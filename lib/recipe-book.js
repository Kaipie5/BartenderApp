'use strict';

const client = require('./client');

function renderRecipeBookPage(request, response) {
    let sql = "SELECT * FROM cocktail_lists WHERE user_id=$1 AND list_name=$2;"
    console.log("recipe book", request.params.id)
    let safeValues = [global.username, request.params.id]
    client.query(sql, safeValues)
      .then(results => {
        if (results.rows.length > 0) {
          let sql2 = "SELECT * FROM cocktails WHERE cocktail_list=$1;";
          let safeValues2 = [results.rows[0].cocktail_list_id]
          
          let list = results.rows[0]
          console.log("LIST", list)

          client.query(sql2, safeValues2)
            .then(results => {
              let cocktails = results.rows;
              
              
                for (let j = 0; j < cocktails.length; j++){
                  let ingredientsList = cocktails[j].ingredients.split(',')
                  // for (let i = 0; i < ingredientsList.length - 1; i++) {
                  //   ingredientsList[i] = ingredientsList[i].slice(0, ingredientsList[i].length-1)
                  // }
                  cocktails[j].ingredients = ingredientsList
                }
                console.log(cocktails)
                response.render('database/recipe-book', { cocktailArray: cocktails, username: global.username, list: list})
            })
        } else {
          response.render('error')
        }
      })
    
  }

  module.exports = renderRecipeBookPage;