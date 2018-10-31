
const form  = document.querySelector('.form'),
input = document.querySelector('.input'),
response = document.querySelector('.response'),
regSelector = document.querySelector('#match'),
flagSelector = [...document.querySelectorAll('.flag')]

//Create generator class to hold values as parent, and pass values to children
class Generator {
	constructor(input, selector, flags){
		this.input = input;
		this.selector = selector;
		this.flags = flags;
	}

	checkFlags (){
		let newFlag = this.flags.filter(flag  => flag.checked);
		if (newFlag.length > 0){
			this.flags = newFlag;
			return newFlag;
		}
		return false;
	}


	parseFlag (){
		let flagValue = [];
		if(this.flag.length > 0){
			this.flag.forEach(f => {
				flagValue.push(i.value)
			})
		}
	}
	

}

//Class to delegate Selectors
class Selectors extends Generator {
	constructor(input) {
		super(input)
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

//Class to delegate flags
class Flags extends Selectors {
	constructor(flag){
		super(flag)
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


function composeExpression(components, flagBuilder,
			selector){
	
	let flagGen = [];
	//Use flag class to retrieve values for flags
	flagBuilder.forEach(flag =>{
		let f = new Flags(flag);
		let fType = f[flag.value]();
		flagGen.push(fType)
	})
	
	//Genetor template string to return to DOM
	generator = `/${selector}/${flagGen.join("")}`
	response.textContent = `${generator}`
}

function buildExpression(e){
	
	let text = input.value;
	let expression = regSelector.value;
	let flags = flagSelector;

	let components = new Generator(text, expression, flags) 
	
	//Parse and Build Components
	let flagBuilder = components.checkFlags();

	//Build Selector
	let selectorBuilder = new Selectors(text);
	let selector = selectorBuilder[expression]();

	if (flagBuilder.length > 0){

		composeExpression(components, flagBuilder,
			selector)

	}


	


	input.value = "";
	e.preventDefault();

}


