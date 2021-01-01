let newNum = true; // so the display gets wiped by the first number

const display = document.querySelector('#display');

const numBtns = document.querySelectorAll('.number');

const clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('click', () => display.textContent = "0");

// probably should make this an independent function
// if the AC button was hit, delete the zero from the display content
numBtns.forEach(b => b.addEventListener('click', (e) => {
    if (newNum){
        display.textContent = e.target.dataset.num;
        newNum = false;
    } else {
        display.textContent = display.textContent + e.target.dataset.num;   
    }
}));

const opBtns = document.querySelectorAll('.operator');
opBtns.forEach(b => b.addEventListener('click', (e) => {
    if (!newNum){
        display.textContent = e.target.dataset.num;
    } 
}));
