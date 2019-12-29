'use strict';

const client = require('../lib/client');


function renderRecipeBookPage(request, response) {
    let sql = "SELECT * FROM cocktails;";
    client.query(sql)
      .then(results => {
        let cocktails = results.rows;
        response.render('database/recipe-book', { cocktailArray: cocktails })
      })
  }

  module.exports = renderRecipeBookPage;