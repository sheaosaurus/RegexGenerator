// const form  = document.querySelector('.form'),
// input = document.querySelector('.input'),
// response = document.querySelector('.response'),
// regSelector = document.querySelector('#match'),
// flagSelector = [...document.querySelectorAll('.flag')]

//*******************//
//  componentCtrl    //
//*******************//

const componentCtrl = (function(){

	const form  = document.querySelector('.form'),
	input = document.querySelector('.input'),
	regSelector = document.querySelector('#match'),
	flagSelector = [...document.querySelectorAll('.flag')]
	
	class CharacterSet {
		constructor(input){
			this.input = input;
		}
		default (){
			return `${this.input}`;
		}
		matchAnyChar (){
			return `[${this.input}]`;
		}
		matchAnyCharExcept (){
			return `[^${this.input}]`;
		}
		beginsWithExcept (){
			return `[^${this.input}]`;
		}
		anythingBut (){
			return `(?:[^${this.input}]*)`
		}
		matchSomething (){
			return `(?:.+)`;
		}
		somethingBut (){
			return `(?:[^${this.input}]+)`;
		}
		find (){
			return `(?:${this.input})`;
		}
	}

	class Flags {
		constructor(flag){
			this.flag = flag;
		}
		ignoreCase (){
			return `i`;
		}
		globalSearch (){
			return `g`;
		}
		multiline (){
			return `m`;
		}
		unicode (){
			return `u`;
		}
		sticky (){
			return `y`;
		}
	}

	return {
		//Return values from submit request
		getBuilderValues: function(){
			let text = input.value;
			let expression = regSelector.value;
			let flags = flagSelector;
			return {text, expression, flags}
		},
		//Gets components to build expression
		getComponents: function(parsedValues){
			let { text, expression, flags } = {...parsedValues}
			expression = componentCtrl.expressionComponent(expression, text)
			flags = componentCtrl.flagComponent(flags);
			return { expression, flags }
		},
		//Builds components
		expressionComponent: function(expression, text){
			let selectGen =  new CharacterSet(text);
			let selector = selectGen[expression]();
			return selector;
		},
		flagComponent: function(flags){
			let flagGen = [];
			flags.forEach(flag =>{
				let f = new Flags(flag);
				let fType = f[flag.value]();
				flagGen.push(fType)
			})
			return flagGen;
		}

	}



})()

//*******************//
//      UICtrl       //
//*******************//
const UICtrl = (function(){
	
	let input = document.querySelector('.input'),
	response = document.querySelector('.response');

	return {
		clearInput: function(){
			input.value = "";
		},
		//Generate regex expression using template strings
		composeExpression: function(generatedValues){
			let { expression, flags } = {...generatedValues}
			let composed = `/${expression}/${flags.join("")}`
			return composed;
		},
		updateDisplay: function(composed){
			response.textContent = `${composed}`
		}
	}
})()

//*******************//
//      parseCtrl    //
//*******************//
const parseCtrl = (function(){

	
	function parseFlags(flags){
		return flags.filter(flag  => flag.checked);
	}

	return {
		parseDelegator(builderValues){
			let { text, expression, flags } = { ...builderValues}
			
			//If instance of object exist, run parser functions to get value of key object
			if(flags){
				flags = parseFlags(flags)
			}

			return { text, expression, flags }
		}
	}
	

})()


//*******************//
//       App         //
//*******************//
const App = (function(componentCtrl, UICtrl, parseCtrl,
	){

	const form = document.querySelector('.form')

	function loadEventListener(){
		form.addEventListener('submit', startGenerator)
	}
	//This component uses the ES6 object destructor methods to pass multiple parameters as one variable.
	function startGenerator(e){
		//Get values of expression to the generated.
		let builderValues = componentCtrl.getBuilderValues();
		//Parse Components
		let parsedValues = parseCtrl.parseDelegator(builderValues);
		//Run Generator 
		runGenerator(parsedValues);
		UICtrl.clearInput();
		e.preventDefault();
	}

	function runGenerator(parsedValues){
		//Get build components
		let generatedValues = componentCtrl.getComponents(parsedValues)
		//Run Display
		displayGenerator(generatedValues);
	}

	function displayGenerator(generatedValues){
		let composed = UICtrl.composeExpression(generatedValues);
		UICtrl.updateDisplay(composed)
	}

	
	return {
		init: function(){
			loadEventListener();
		}
	}
	

})(componentCtrl, UICtrl, parseCtrl)

App.init()