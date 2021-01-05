// need to make it so that if an operator button is hit, and the previous button
// was an operator, then the previous operator is removed and the new one inserted


// need to make sure that this still makes sure the function won't fire if 
// the last number in the equation is a decimal


let newNum = true; // so the display gets wiped by the first number
let currentNum = "0";
let currentOp;
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
    currentNum = "";
    if (currentOp) {
        currentOp.classList.remove('selected');
    }
    currentOp = "";
    clearBtn.textContent = "C";
    updateDisplay("0")
});

const plusMin = document.querySelector("button[data-val='+/'");
plusMin.addEventListener('click', () => {
    currentNum = Number(currentNum) * -1;
    updateDisplay(currentNum);
});

const percent = document.querySelector("button[data-val='%'");
percent.addEventListener('click', () => {
    console.log("hahahas")
    currentNum = Number(currentNum) / 100;
    updateDisplay(currentNum);
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
        b.addEventListener('click', () => {
            calculate();
            numbers = [];
        });
    }
    else {
        b.addEventListener('click', multiplyDivide);
    }
});

function numberInput(e){
    if (currentOp){
        currentOp.classList.remove('selected');
        currentOp = "";
        updateDisplay(e.target.dataset.val);
        return;
    }
    else if (currentNum === "0"){
        updateDisplay(e.target.dataset.val);
        clearBtn.textContent = "AC";
        return;
    }
    currentNum = currentNum + e.target.dataset.val;
    updateDisplay(currentNum);

}

function addSubtract(e){
    // newNum false means the last thing entered was a number
    if (currentOp){
        console.log("freak out!!!!")
        return;
    }
    calculate();
    currentOp = e.target;
    currentOp.classList.add('selected');
    operators.push(currentOp.dataset.val);
}

// if previous elements were about to be added, then add them now
function multiplyDivide(e){
    if (currentOp){
        console.log("PROBLEM PROBLEM PROBLEM")
        return;
    }
    numbers.push(currentNum);
    if (operators[operators.length - 1] === "x" 
        || operators[operators.length - 1] ==="/"){
            mdLastTwo();
    }
    currentOp = e.target;
    currentOp.classList.add('selected');
    operators.push(currentOp.dataset.val);
}

function calculate(){
    numbers.push(currentNum);
    console.log(numbers)
    console.log(operators)
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
    operators = [];
}

function updateDisplay(str){
    currentNum = str;
    display.textContent = currentNum;
}

function mdLastTwo(){
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
    numbers.push(sum);
    console.log(numbers);
    console.log(operators);
    updateDisplay(numbers[numbers.length -1]);
}



