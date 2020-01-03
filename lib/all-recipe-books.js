'use strict';

const client = require('./client');

function viewAllRecipeBooks(request, response) {
    let sql = "SELECT * FROM cocktail_lists WHERE user_id=$1;"
    let safeValues = [global.username]
    client.query(sql, safeValues)
        .then(results => {
            let lists = results.rows
            response.render('all-recipe-books', {cocktailLists: lists, username: global.username})
  
      })
}

module.exports = viewAllRecipeBooks;