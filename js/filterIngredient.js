'use strict';

const superagent = require('superagent')
const cocktailConstructor = require('./cocktailConstructor.js');
const client = require('../lib/client');

function filterExtraIngredients(request, response) {
    // console.log(request.body);
    let oldArr = request.body.cocktail;
    let ingredients = ["Light rum", "Applejack", "Gin", "Dark rum", "Sweet Vermouth", "Strawberry schnapps", "Scotch", "Apricot brandy", "Triple sec", "Southern Comfort", "Orange bitters", "Brandy", "Lemon vodka", "Blended whiskey", "Dry Vermouth", "Amaretto", "Champagne", "Coffee liqueur", "Bourbon", "Tequila", "Vodka", "Añejo rum", "Bitters", "Kahlua", "Dubonnet Rouge", "Irish whiskey", "Apple brandy", "Cherry brandy", "Creme de Cacao", "Port", "Coffee brandy", "Red wine", "Rum", "Ricard", "Sherry", "Cognac", "Sloe gin", "Galliano", "Peach Vodka", "Ouzo", "Spiced rum", "Angelica root", "Johnnie Walker", "Everclear", "Firewater", "Lager", "Whiskey", "Absolut Citron", "Pisco", "Irish cream", "Ale", "Chocolate liqueur", "Midori melon liqueur", "Sambuca", "Blackberry brandy", "Peppermint schnapps", "Creme de Cassis", "Jack Daniels", "Lime juice", "demerara Sugar", "Sugar", "Tea", "Grenadine", "Grapefruit juice", "Carbonated water", "Apple juice", "Pineapple juice", "Lemon juice", "Sugar syrup", "Milk", "Strawberries", "Chocolate syrup", "Yoghurt", "Mango", "Ginger", "Lime", "Cantaloupe", "Berries", "Grapes", "Kiwi", "Tomato juice", "Cocoa powder", "Chocolate", "Heavy cream", "Coffee", "Water", "Espresso", "Orange", "Cranberries", "Apple cider", "Cranberry juice", "Egg yolk", "Egg", "Grape juice", "Peach nectar", "Lemon", "Lemonade", "Cider", "Sprite", "7-Up"]

    superagent.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${request.body.ingredients}`).then(responseFromSuper => {
      // console.log(responseFromSuper.body)
      let arr = responseFromSuper.body.drinks.map(cocktail => {
        return new cocktailConstructor.SearchCocktail(cocktail);
      });
      let newArr = [];
    //   console.log(arr);
      oldArr.forEach(name => {
            arr.forEach(cocktail2 =>{
                name === cocktail2.name ? newArr.push(cocktail2) : newArr;
                // console.log(name);
                // console.log(cocktail2.name);
            })
      })
      // console.log(newArr);
      response.render('search/search-results-base', { arr: newArr, arr2: ingredients });
    })
}

module.exports = filterExtraIngredients;