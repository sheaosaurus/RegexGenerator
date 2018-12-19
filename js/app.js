//*******************//
//  componentCtrl    //
//*******************//
const componentCtrl = (function(){

    const form  = document.querySelector('.form'),
	input = document.querySelector('.input'),
	regSelector = document.querySelector('#match'),
	flagSelector = [...document.querySelectorAll('.flag')],
    charSelector = [...document.querySelectorAll('.characterType')]
    
    return {
        //Return values from submit request
        getBuilderValues: function(){
            let text = input.value;
            let expression = regSelector.value;
	flagSelector = [...document.querySelectorAll('.flag')],
    let text = input.value;
            let text = charSelector.value;
        }
    }


})();


//*******************//
//       App         //
//*******************//
const App = (function(componentCtrl) {
  const form = document.querySelector(".form");

  function loadEventListeners() {
    form.addEventListener("submit", startGenerator);
  }
  //This component uses the ES6 object destructor methods to pass multiple parameters as one variable.
  function startGenerator(e){
      //Get values of expression to the generated.
      let builderValues = 
  }

  return {
    init: function() {
      loadEventListeners();
    }
  };
})(componentCtrl);

App.init();
