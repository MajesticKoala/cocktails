$(function(){

  //Declare ingredient variables
  var ingredient1 = '';
  var ingredient2 = '';
  var ingredient3 = '';
  var ingredient4 = '';


  function getCocktails(){
    console.log('cocktail function run');
      //Gets Json data from database at https://www.thecocktaildb.com
      var request = new XMLHttpRequest();
      //var url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient1;
      request.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+ingredient1 + '&&i=' + ingredient2 + '&&i=' + ingredient3 + '&&i=' + ingredient4);
      request.onload = function(){
        var Responseobject = JSON.parse(request.responseText);
        let drinknum = Responseobject.drinks.length;
        let randDrink = Math.floor(Math.random()*drinknum);
        console.log(randDrink);
        $('.bodyText').text(Responseobject.drinks[randDrink].strDrink);

      }
      request.send();
  }

  //Check for submitted Ingredients
  $('#cocktailButton').click(function(){
    //update ingredient variable
    ingredient1 = encodeURIComponent($('#ingr1').val().trim());
    ingredient2 = encodeURIComponent($('#ingr2').val().trim());
    ingredient3 = encodeURIComponent($('#ingr3').val().trim());
    ingredient4 = encodeURIComponent($('#ingr4').val().trim());

    getCocktails();
  });

});
