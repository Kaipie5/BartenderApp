'use strict';

const superagent = require('superagent')
const cocktailConstructor = require('./cocktailConstructor.js');
const client = require('../lib/client');

function filterExtraIngredients(request, response) {
    // console.log(request.body.search);
    let oldArr = request.body.cocktail;
    superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${request.body.search}`).then(responseFromSuper => {
      let arr = responseFromSuper.body.drinks.map(cocktail => {
        return new cocktailConstructor.SearchCocktail(cocktail);
      });
      let newArr = [];
    //   console.log(arr);
      oldArr.forEach(name => {
            arr.forEach(cocktail2 =>{
                name === cocktail2.name ? newArr.push(cocktail2) : newArr;
            })
      })
    //   console.log(newArr);
      response.render('search/search-results-base', { arr: newArr });
    })
}

module.exports = filterExtraIngredients;