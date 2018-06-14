$(function(){

  //Declare ingredient variables
  var ingredient1 = '';
  var ingredient2 = '';
  var ingredient3 = '';
  var ingredient4 = '';

  var drink = '';

  //Gets Json data from database at https://www.thecocktaildb.com
  function getCocktails(){
    $('.drinkName').text('Loading cocktail...');
    $('.drinkDeets').text('');
    $('.drinkIngr').text('');
    var url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient1;

    //create url with ingredients as filters
    if (ingredient2 != '') {
      url += '&&i=' + ingredient2;
      if (ingredient3 != '') {
        url += '&&i=' + ingredient3;
        if (ingredient4 != '') {
          url += '&&i=' + ingredient4;
        }
      }
    }
    console.log(url);
    //url of specific drink selected
    var specUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    //Get random cocktail containing ingredients
    $.getJSON( url , function(data){
        let drinknum = data.drinks.length;
        drink = Math.floor(Math.random()*drinknum);
        specUrl += encodeURIComponent(data.drinks[drink].strDrink.trim());

    //Get details of the random cocktail and display
        $.getJSON(specUrl, function(data){
          let drinkObj = data.drinks[0];
          console.log(drinkObj);
          $('.drinkName').text(drinkObj.strDrink);
          $('.drinkIngr').text(drinkObj.strIngredient1 + ', ' + drinkObj.strIngredient2 + ', ' + drinkObj.strIngredient3 + ', ' + drinkObj.strIngredient4);
          $('.drinkDeets').text(drinkObj.strInstructions);
        });

    });

    //API requests using vanilla XML JavaScript code
    /*
      var request = new XMLHttpRequest();
      var url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
      //add ingredient filters to api request
      request.open('GET', url +ingredient1 + '&&i=' + ingredient2 + '&&i=' + ingredient3 + '&&i=' + ingredient4);
      request.onload = function(){
        var Responseobject = JSON.parse(request.responseText);
        //returns a random drink from the possible results
        let drinknum = Responseobject.drinks.length;
        drink = Math.floor(Math.random()*drinknum);
        console.log(randDrink);
        $('.bodyText').text(Responseobject.drinks[randDrink].strDrink);


        //return details of drink from seperate api
        var drinkRequest = new XMLHttpRequest();
        request.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + encodeURIComponent(drink.trim()));
        request.onload = function(){
          var responseObj = JSON.parse(drinkRequest.responseText);
          $('.drinkDeets').text(responseObj.drinks.strInstructions);
        }

      }
      request.send();
      drinkRequest.send();
      */
  }

  //Update ingredient variables
  $('#cocktailButton').click(function(){
    //update ingredient variable and escape spaces for url
    ingredient1 = encodeURIComponent($('#ingr1').val().trim());
    ingredient2 = encodeURIComponent($('#ingr2').val().trim());
    ingredient3 = encodeURIComponent($('#ingr3').val().trim());
    ingredient4 = encodeURIComponent($('#ingr4').val().trim());

    getCocktails();
  });

});
