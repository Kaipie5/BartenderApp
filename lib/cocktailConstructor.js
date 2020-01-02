'use strict';

module.exports = {
  Cocktail: function(obj, ingredientArray, measureArray) {
    this.title = obj.strDrink;
    this.image_url = obj.strDrinkThumb;
    this.id = obj.idDrink;

    //obj.strInstructions is a string coming in
    //The below code is to remove numbers before instructions 
    //and format the instructions so they start with a capital letter word
    this.instructions = obj.strInstructions;
    let instructionRegex = /\.\w/g;
    let capLetterRegex = /\.\s[a-z]/g;
    if (instructionRegex.test(this.instructions)) {
      this.instructions = this.instructions.replace(/\./g, '. ');
      let fLeterArr = this.instructions.match(capLetterRegex);
      for (let i = 0; i < fLeterArr.length; i++) {
        this.instructions = this.instructions.replace(/\.\s[a-z]/, fLeterArr[i].toUpperCase())
      }
    }
    
    this.ingredients = measureArray[0] + ' ' + ingredientArray[0];
    for (let i = 1; i < ingredientArray.length; i++) {
      measureArray[i] !== null ? this.ingredients = this.ingredients + ', ' + measureArray[i] : this.ingredients;
  
      ingredientArray[i] !== null ? this.ingredients = this.ingredients + ' ' + ingredientArray[i] : this.ingredients;
    }
  },
  SearchCocktail: function(obj) {
    this.name = obj.strDrink;
    this.image_url = obj.strDrinkThumb;
    this.id = obj.idDrink;
  }
};
