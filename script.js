// should the function work if the last button input was a decimal?

// should it keep doing the last operation after the equals sign is hit??
// remove .selected and replace it with .operator:focus

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
    currentNum = Number(currentNum) / 100;
    updateDisplay(currentNum);
});

const decimal = document.querySelector("button[data-val='.");
decimal.addEventListener('click', (e) => {
    if (currentOp){
        currentOp.classList.remove('selected');
        currentOp = "";
        updateDisplay(e.target.dataset.val);
        return;
    } 
    else if (currentNum === "0"){
        updateDisplay("0.");
        clearBtn.textContent = "AC";
        return;
    }
    else if (!currentNum.includes(".") && currentNum.toString().length < 13){
        currentNum = currentNum + e.target.dataset.val;
        updateDisplay(currentNum);
    }
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
    else if (currentNum.toString().length < 14)
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
        sum = formatNumbers(sum);
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
    // if too small or too big convert to scientific notation
    // ugh then I need to be able to deal with this
    // else if too many decimal points do something fancy
    // limit input size to 14 digits 
    numbers.push(sum);
    updateDisplay(numbers[numbers.length -1]);
}

function formatNumbers(num){
    // over 1000000 with no comma 
    // over 10000 and with a comma
    // longer than 14 characters 

    if (Number(num) > 100000000000){
        return num.toExponential(3);
    }
    else if (num.toString().length > 14) { // potential error here if its a 
                                           // long number with like one decimal it will round wrong
        return num.toPrecision(12);
    }
    else return num;      
}


