'use strict';

const client = require('./client');


function renderRecipeBookPage(request, response) {
    let sql = "SELECT * FROM cocktail_lists WHERE user_id=$1 AND list_name=$2;"
    console.log("recipe book", request.params.id)
    let safeValues = [global.username, request.params.id]
    client.query(sql, safeValues)
      .then(results => {
        // console.log("LIST SELECT RESULTS", results.rows)
        let sql2 = "SELECT * FROM cocktails WHERE cocktail_list=$1;";
        let safeValues2 = [results.rows[0].cocktail_list_id]
        
        let list = results.rows[0]
        console.log("LIST", list)

        client.query(sql2, safeValues2)
          .then(results => {
            let cocktails = results.rows;
            // console.log(cocktails[0])
            // console.log("username:", global.username)
            response.render('database/recipe-book', { cocktailArray: cocktails, username: global.username, list: list})
          })
      })
    
  }

  module.exports = renderRecipeBookPage;