let currentNum = "0";
let currentOp;
let numbers = []; // stack of buttons
let operators = []; // stack of strings
const display = document.querySelector('#display');
const numBtns = document.querySelectorAll('.number');
const clearBtn = document.querySelector('#clear');
const infoBtn = document.querySelector('#info');
const introduction = document.querySelector('#introduction');
const plusMin = document.querySelector("button[data-key='_'");
const percent = document.querySelector("button[data-key='%'");
const decimal = document.querySelector("button[data-key='.");
const opBtns = document.querySelectorAll('.operator');
// add event listeners to each html object
numBtns.forEach(b => b.addEventListener('click', (e) => numberInput(e.target)));
clearBtn.addEventListener('click', clear);
plusMin.addEventListener('click', plusMinusFunc);
percent.addEventListener('click', percentFunc);
decimal.addEventListener('click', decInput);
opBtns.forEach(b => {
    if (b.dataset.key === '+' || b.dataset.key === '-'){
        b.addEventListener('click', (e) => addSubtract(e.target));
    }
    else if (b.dataset.key === '='){
        b.addEventListener('click', () => {
            calculate();
        });
    }
    else {
        b.addEventListener('click', () => multiplyDivide(b));
    }
});
infoBtn.addEventListener('click', (e) => {
    e.target.classList.toggle('selected');
    introduction.classList.toggle('hidden');
});
document.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === "="){
        e.preventDefault();
        calculate();
    } 
    else if (e.key === "Backspace" && !currentOp){
        if (currentNum.length === 1){
            updateDisplay("0");
        } else {
            updateDisplay(currentNum.slice(0, currentNum.length - 1));
        }
    }
    else if (e.key === "*" || e.key === "x"){
        const btn = document.querySelector(`button[data-key="x"]`);
        multiplyDivide(btn);
    } else if (e.key !== "Shift") {
        const btn = document.querySelector(`button[data-key="${e.key}"]`);
        if (/[0-9]/.test(e.key)){
            numberInput(btn);    
        }
        else if (e.key === "/"){
            multiplyDivide(btn);
        }
        else if (e.key === "Escape"){
            clear();
        }
        else if (e.key === "."){
            decInput();
        }
        else if (e.key === "-"){
            addSubtract(btn);
        }
        else if (e.key === "+"){
            addSubtract(btn);
        }
    }
});
// all the actions trigerred by the event listeners are below
function plusMinusFunc(){
    currentNum = Number(currentNum) * -1;
    updateDisplay(currentNum);
}
function percentFunc(){
    currentNum = Number(currentNum) / 100;
    updateDisplay(currentNum);
}
function decInput(){
    if (currentOp){
        currentOp.classList.remove('selected');
        currentOp = "";
        updateDisplay("0.");
        return;
    } 
    else if (currentNum === "0"){
        updateDisplay("0.");
        clearBtn.textContent = "AC";
        return;
    }
    else if (!currentNum.includes(".") && currentNum.toString().length < 13){
        currentNum = currentNum + ".";
        updateDisplay(currentNum);
    }
}
function clear(){
    numbers = [];
    operators = [];
    currentNum = "";
    if (currentOp) {
        currentOp.classList.remove('selected');
    }
    currentOp = "";
    clearBtn.textContent = "C";
    updateDisplay("0");
}
// adds number to display, also sets the currentOp to an empty string so a new
// operator can be added
function numberInput(btn){
    if (currentOp){
        currentOp.classList.remove('selected');
        currentOp = "";
        updateDisplay(btn.dataset.key);
        return;
    }
    else if (currentNum === "0"){
         updateDisplay(btn.dataset.key);
        clearBtn.textContent = "AC";
        return;
    }
    else if (currentNum.toString().length < 14)
        currentNum = currentNum + btn.dataset.key;
        updateDisplay(currentNum);
}
// this function handles when + or - are entered, but does not do the 
// calculation itself. if a number has been input, that number is pushed to the
// array of numbers. then this button's operator is added to the array of
// operators and the button is changed to show the viewer what operation they
// clicked on

function addSubtract(btn){
    if (currentNum === "0" && btn.dataset.key === "-" && numbers.length === 0){
        updateDisplay("-"); // if the user wants to start with a negative number
    }
    else if (!currentOp){ // so that multiple operators cannot be added in a row
        calculate();
        numbers.push(currentNum);
        currentOp = btn;
        currentOp.classList.add('selected');
        operators.push(currentOp.dataset.key);
    } 
}
// this function handles when + or - are entered, but does not do the 
// calculation itself. note that if the last two numbers entered were supposed
// to be multiplied or divided it will do that calculation first, so that 
// calculations are done on the go while following pemdas. it then adds the
// number and operator to the respective arrays.
function multiplyDivide(btn){
    if (!currentOp){ // so that multiple operators cannot be added in a row
        numbers.push(currentNum);
        if (operators[operators.length - 1] === "x" 
            || operators[operators.length - 1] ==="/"){
                mdLastTwo();
        }
        currentOp = btn;
        currentOp.classList.add('selected');
        operators.push(currentOp.dataset.key);
    }
}
// goes through the numbers and operators arrays and performs the corresponding
// actions, clears the number and operator arrays, while making the display
// and the currentNum variable the answer.
function calculate(){
    numbers.push(currentNum); // the last number the user input
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
                if (num2 === 0){ // handles division by 0
                    updateDisplay("Error");
                    return;
                } 
                sum = (num1/num2);
                break;
        }
        sum = formatNumbers(sum); // makes the number fit on the display
        numbers.push(sum);
    }
    updateDisplay(numbers[0]);
    numbers = [];
    operators = [];
}

function updateDisplay(str){
    currentNum = str;
    display.textContent = currentNum;
}
// multiplies/divides the last two numbers in the array. called by the 
// multiply/divide buttons event listener function. 
function mdLastTwo(){
    let sum = 0;
    let num2 = Number(numbers.pop());
    let num1 = Number(numbers.pop());
    let op = operators.pop();
    switch(op) {
        case 'x':
            sum = (num1 * num2);
            break;
        case '/':
            if (num2 === 0){ // handles division by 0
                updateDisplay("Error");
                return;
            } 
            sum = (num1/num2);
            break;
    }
    numbers.push(sum);
    updateDisplay(numbers[numbers.length -1]);
}
// makes the numbers fit on the screen
function formatNumbers(num){
    if (Number(num) > 100000000000){
        return num.toExponential(3);
    }
    else if (num.toString().length > 14) {                               
        return num.toPrecision(12); // toPrecision formats as 1.4e+02
    }
    return num; 
}