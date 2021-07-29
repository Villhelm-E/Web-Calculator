//Variables
const display = document.querySelector("#displayText");
const DISPLAY_LENGTH = 14;
let operandA = 0;
let operandB = 0;
let calcValue = 0;
let operationMode = "entry";

//Takes two inputs, returns the sum
function add(a, b) {
    return a + b;
}

//Takes two inputs, returns the difference of a - b
function subtract(a, b) {
    return a - b;
}

//Takes two inputs, returns the product
function multiply(a, b) {
    return a * b;
}

//Takes two inputs, returns the quotient of a / b
function divide(a, b) {
    return a / b;
}

//Takes three inputs, the first input choose a mathematical operation to perform on the other two inputs
function operate(operator, a, b) {
    switch(operator) {
        case "&plus;":
            add(a, b);
            break;
        case "&minus;":
            subtract(a, b);
            break;
        case "&times;":
            multiply(a, b);
            break;
        case "&divide;":
            divide(a, b);
            break;
        default:
            break;
    }
}

//Updates the display text
function typeToDisplay(str) {
    if (display.textContent == "0" && operationMode == "entry") {
        display.textContent = str;
    }
    else {
        display.textContent += str;
    }
}

//checks to see if the display is full
function fullDisplay() {
    return display.textContent.length >= DISPLAY_LENGTH;
}

function chooseOperator(str) {
    console.log(str);
    operationMode = str;
    operandA = display.textContent;
}


//Event Listeners
const num = document.querySelectorAll(".number");
num.forEach(item => {
    item.addEventListener('click', () => {
        typeToDisplay(item.textContent.trim());
        console.log(operandA);
    });
});

const equals = document.querySelector("#equals");
equals.addEventListener('click', () => {
    switch (operationMode) {
        case "addition":
            operate("addition", a, b);
    }
})

const operators = document.querySelectorAll(".operation");
operators.forEach(item => {
    item.addEventListener('click', () => {
        chooseOperator(item.id);
    });
})