'use strict';

const client = require('./client');

function createNewCocktailList(request, response) {
    let sql2 = "INSERT INTO cocktail_lists (list_name, summary, user_id) VALUES ($1, $2, $3)"
    let safeValues2 = [request.body.listName, "TEST", global.username]
    client.query(sql2, safeValues2);

    response.redirect('/all-recipe-books');
}

module.exports = createNewCocktailList;
