const calcVal = {
	first: "",
	op: null,
	opAssigned: false,
	floatBool: false,
	oneOpCompleted: false,
	second: "",
	result: 0,
}

const opFunc = {
	sum: function(a,b){
		return a + b;
	},

	substract: function(a,b){
		if(a > b){
			return a - b;
		} return b - a;
	},

	multiply: function(a,b){
		return a * b;
	},

	divide: function(a,b){
		if(b !== 0){
			return a / b;
		} return 'You cannot divide a number by zero.';
	},

  operator: function(op, a, b){
    a = Number(a);
    b = Number(b);

    if(op == '+'){
      return this.sum(a,b);
    }
    if(op == '-'){
      return this.substract(a,b);
    }
    if(op == '*'){
      return this.multiply(a,b);
    }
    if(op == '/'){
      return this.divide(a,b);
    }
  },
}

let displayVal = '';

const eTarget = {
	//number buttons
	assignVal: (e) => {
		if(e.target.id == 'float'){
			return;
		}
		if(calcVal.first.length == 0 && calcVal.op !== null){
			displayVal = 'Must enter a number first';
			screen.textContent = displayVal;
		}

		if(calcVal.second.length == 0 && calcVal.op == null){
			calcVal.first += e.target.id;
			displayVal = calcVal.first;
			screen.textContent = displayVal;
		}

		if(calcVal.first.length !== 0 && calcVal.op !== null){
			calcVal.second += e.target.id;
			displayVal = calcVal.second;
			screen.textContent = displayVal;
		}
	},
	//float
	float: (e) => {
		if(calcVal.oneOpCompleted == false && calcVal.second.length == 0 && calcVal.op == null){
			if(!calcVal.floatBool){
				calcVal.floatBool = true;
				calcVal.first += '.';
				screen.textContent = calcVal.first;
			}
		}

		if(calcVal.first.length !== 0 && calcVal.op !== null){
			if(calcVal.floatBool){
				calcVal.floatBool = false;
				calcVal.second += '.';
				screen.textContent = calcVal.second;
			}
		}


	},
	//operators buttons
	assignOp: (e) => {
		calcVal.op = e.target.textContent;
		if(calcVal.op !== null){
			displayVal = calcVal.op;
			screen.textContent = displayVal;
			calcVal.opAssigned = true;
		}
	},
	//negative/positive button
	negpos: (e) => {
		if(calcVal.first.length !== 0 && calcVal.op == null && calcVal.second.length == 0){
			calcVal.first = -(calcVal.first);
			displayVal = calcVal.first;
			screen.textContent = displayVal;
		}

		if(calcVal.second.length !== 0 && calcVal.op !== null && calcVal.first.length !== 0){
			calcVal.second = -(calcVal.second);
			displayVal = calcVal.second;
			screen.textContent = displayVal;
		}
	},
	//equal button
	equal: (e) => {
		if(calcVal.first.length !== 0 & calcVal.op !== null && calcVal.second.length !== 0){
			calcVal.result = opFunc.operator(calcVal.op, calcVal.first, calcVal.second);
			//In case our result has more than 4 decimals we cut it.
			if(!Number.isInteger(calcVal.result)){
				calcVal.oneOpCompleted = true;
				calcVal.floatBool = true;
				const lengthCut = String(calcVal.result).indexOf('.') + 5;
				if(lengthCut < String(calcVal.result).length){
					calcVal.result = Number(String(calcVal.result).slice(0, lengthCut))
				}
			}
			if(Number.isInteger(calcVal.result)){
				calcVal.oneOpCompleted = false;
				calcVal.floatBool = true;
			}
			displayVal = calcVal.result;
			screen.textContent = displayVal;
			//in case our text/result is bigger than our screen;
			if(screen.clientHeight > screen.parentElement.clientHeight){
				screen.style.fontSize = '25px';
			}
			if(screen.clientWidth > screen.parentElement.clientWidth){
				screen.style.fontSize = '15px';
			}
			calcVal.first = calcVal.result;
			calcVal.second = '';
			calcVal.op = null;
			calcVal.opAssigned = false;
		}
	},
	//display buttons
	checkId: (e) => {
		const id = e.target.id;
		if(id == 'CE'){
			let length;
			if(calcVal.first.length !== 0 && calcVal.op == null && calcVal.second.length == 0){
				length = calcVal.first.length;
				calcVal.first = calcVal.first.slice(0, length-1);
				displayVal = calcVal.first;
				screen.textContent = displayVal;
			}

			if(calcVal.second.length !== 0 && calcVal.op !== null && calcVal.first.length !== 0){
				length = calcVal.second.length;
				calcVal.second = calcVal.second.slice(0, length-1);
				displayVal = calcVal.second;
				screen.textContent = displayVal;
			}
		}

		if(id == 'C'){
			screen.style.fontSize = '40px'
			displayVal = '';
			screen.textContent = displayVal;
			calcVal.first = '';
			calcVal.second = '';
			calcVal.op = null;
			calcVal.opAssigned = false;
			calcVal.floatBool = false;
		}

		if(id == 'DEL'){
			screen.style.fontSize = '40px'
			if(calcVal.first.length !== 0 && calcVal.op == null && calcVal.second.length == 0){
				calcVal.first = '';
				displayVal = calcVal.first;
				screen.textContent = displayVal;
			}

			if(calcVal.second.length !== 0 && calcVal.op !== null && calcVal.first.length !== 0){
				calcVal.second = '';
				displayVal = calcVal.second;
				screen.textContent = displayVal;
			}
		}

	}
}
/*Screen*/
const screen = document.querySelector('#display-message');
screen.textContent = displayVal;

/*Numbers buttons*/
const numButtons = document.querySelectorAll('.number');
numButtons.forEach(btn => btn.addEventListener('click', eTarget.assignVal))

const floatButton = document.querySelector('#float');
floatButton.addEventListener('click', eTarget.float);

/*Operators buttons*/
const opButtons = document.querySelectorAll('.operator');
opButtons.forEach(btn => btn.addEventListener('click', eTarget.assignOp))

/*Display buttons*/
const disButtons = document.querySelectorAll('.setting');
disButtons.forEach(btn => addEventListener('click', eTarget.checkId))

const posinega = document.querySelector('#posinega');
posinega.addEventListener('click', eTarget.negpos);

const equal = document.querySelector('#equal');
equal.addEventListener('click', eTarget.equal)
opButtons.forEach(btn => btn.addEventListener('click', eTarget.equal));

//keyboard support

window.onkeydown = (e) => {
    let x = e.key;
    let choice
    switch(x){
    	case '0':
    		choice = document.querySelector(`div[data-key="${'0'}"]`);
    		choice.click();
    		break;

        case '1':
            choice = document.querySelector(`div[data-key="${'1'}"]`);
            choice.click();
            break;

    	case '2':
    		choice = document.querySelector(`div[data-key="${'2'}"]`);
    		choice.click();
    		break;

    	case '3':
    		choice = document.querySelector(`div[data-key="${'3'}"]`);
    		choice.click();
    		break;

    	case '4':
    		choice = document.querySelector(`div[data-key="${'4'}"]`);
    		choice.click();
    		break;

    	case '5':
    		choice = document.querySelector(`div[data-key="${'5'}"]`);
    		choice.click();
    		break;

    	case '6':
    		choice = document.querySelector(`div[data-key="${'6'}"]`);
    		choice.click();
    		break;

    	case '7':
    		choice = document.querySelector(`div[data-key="${'7'}"]`);
    		choice.click();
    		break;

    	case '8':
    		choice = document.querySelector(`div[data-key="${'8'}"]`);
    		choice.click();
    		break;

    	case '9':
    		choice = document.querySelector(`div[data-key="${'9'}"]`);
    		choice.click();
    		break;

    	case 'Enter':
    		choice = document.querySelector(`div[data-key="${'='}"]`);
    		choice.click();
    		break;

    	case 'Backspace':
    		choice = document.querySelector(`div[data-key="${'Backspace'}"]`);
    		choice.click();
    		break;

    	case 'Escape':
    		choice = document.querySelector(`div[data-key="${'Escape'}"]`);
    		choice.click();
    		break;

    	case '.':
    		choice = document.querySelector(`div[data-key="${'.'}"]`);
    		choice.click();
    		break;

    	case '|':
    		choice = document.querySelector(`div[data-key="${'|'}"]`);
    		choice.click();
    		break;

    	case '+':
    		choice = document.querySelector(`div[data-key="${'+'}"]`);
    		choice.click();
    		break;

    	case '-':
    		choice = document.querySelector(`div[data-key="${'-'}"]`);
    		choice.click();
    		break;

    	case '*':
    		choice = document.querySelector(`div[data-key="${'*'}"]`);
    		choice.click();
    		break;

    	case '/':
    		choice = document.querySelector(`div[data-key="${'/'}"]`);
    		choice.click();
    		break;
    }
}