// need to make it so that if an operator button is hit, and the previous button
// was an operator, then the previous operator is removed and the new one inserted


// need to make sure that this still makes sure the function won't fire if 
// the last number in the equation is a decimal


let newNum = true; // so the display gets wiped by the first number
let currentDisplay = "0";
let numbers = []; // stack of buttons
let operators = [];
const listOfOperators = "+-/x"
const listOfNumbers = "1234567890";
const display = document.querySelector('#display');
const numBtns = document.querySelectorAll('.number');
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    numbers = [];
    operators = [];
    clearBtn.textContent = "C";
    updateDisplay("0")
});

// probably should make this an independent function
// if the AC button was hit, delete the zero from the display content
numBtns.forEach(b => b.addEventListener('click', numberInput));

const opBtns = document.querySelectorAll('.operator');
opBtns.forEach(b => {
    if (b.dataset.val === '+' || b.dataset.val === '-'){
        b.addEventListener('click', addSubtract);
    }
    else if (b.dataset.val === '='){
        b.addEventListener('click', calculate);
    }
    else {
        b.addEventListener('click', multiplyDivide);
    }
});

function numberInput(e){
    if (listOfOperators.includes(currentDisplay)){
        operators.push(currentDisplay);
        updateDisplay(e.target.dataset.val);
        return;
    }
    else if (currentDisplay === "0"){
        updateDisplay(e.target.dataset.val);
        clearBtn.textContent = "AC";
        return;
    }
    let str = currentDisplay + e.target.dataset.val;
    updateDisplay(str);

}

function addSubtract(e){
    // newNum false means the last thing entered was a number
    if (listOfOperators.includes(currentDisplay)){
        updateDisplay(e.target.dataset.val);
        return;
    }
    numbers.push(currentDisplay);
    updateDisplay(e.target.dataset.val);
    if (operators[operators.length - 1] === "x" 
        || operators[operators.length - 1] ==="/"){
            mdLastTwo();
            operators.push(e.target.dataset.val);
        }
}

// if previous elements were about to be added, then add them now
function multiplyDivide(e){
    if (listOfOperators.includes(currentDisplay)){
        currentDisplay = e.target.dataset.val;
        updateDisplay();
        return;
    }
    numbers.push(currentDisplay);
    updateDisplay(e.target.dataset.val);
    if (operators[operators.length - 1] === "x" 
        || operators[operators.length - 1] ==="/"){
            mdLastTwo();
            operators.push(e.target.dataset.val);
        }
}

function calculate(){
    if (!listOfOperators.includes(currentDisplay)){ // the current display is a number
        numbers.push(currentDisplay);
    }
    while(numbers.length > 1) {
        let sum = "";
        let num2 = Number(numbers.pop());
        let num1 = Number(numbers.pop());
        let op = operators.pop();

        switch(op) {
            case '+': 
                sum = (num1 + num2);
                break;
            case '-':
                sum = (num1 - num2);
                break;
            case 'x':
                sum = (num1 * num2);
                break;
            case '/':
                sum = (num1/num2);
                break;
        }
        numbers.push(sum);
    }
    updateDisplay(numbers[0]);
    numbers = [];
    operators = [];
  
}

function updateDisplay(str){
    currentDisplay = str;
    display.textContent = currentDisplay;
}

function mdLastTwo(){
    console.log(numbers)
    console.log(operators)
    console.log("asdfasdfasdf")
    let sum = 0;
    let num2 = Number(numbers.pop());
    let num1 = Number(numbers.pop());
    let op = operators.pop();
    
    switch(op) {
        case '+': 
            sum = (num1 + num2);
            break;
        case '-':
            sum = (num1 - num2);
            break;
        case 'x':
            sum = (num1 * num2);
            break;
        case '/':
            sum = (num1/num2);
            break;
    }
    console.log(sum);
    numbers.push(sum);
    console.log(numbers);
    operators.push(currentDisplay);
    updateDisplay(numbers[0]);
}



