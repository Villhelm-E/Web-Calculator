//Variables
const display = document.querySelector("#displayText");
const DISPLAY_LENGTH = 14;
let operandA = 0;
let operandB = 0;
let calcValue = 0;
let operationMode = "entry";
let operatorMem = ""
let displayValue = 0;

//Takes two inputs, returns the sum
function add(a, b) {
    return fullDisplay(+a + +b);
}

//Takes two inputs, returns the difference of a - b
function subtract(a, b) {
    return fullDisplay(+a - +b);
}

//Takes two inputs, returns the product
function multiply(a, b) {
    return fullDisplay(+a * +b);
}

//Takes two inputs, returns the quotient of a / b
function divide(a, b) {
    if (+a / +b == Infinity) {
        return "Undefined";
    }
    else {
       return fullDisplay(+a / +b); 
    }
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

function clearDisplay(){
    display.textContent = "0";
}

//Rounds the output to fit within the display
function fullDisplay(num) {
    
    //Algorithm for rounding to a specific precision
    //save precision
    let len = 10 ** (DISPLAY_LENGTH -2);
    
    //Multiply by 10 raised to the precision
    let roundMult = num * len;
    
    //round to integer
    let roundInt = Math.round(roundMult);
    
    //divide integer by the precision
    let roundDivide = roundInt / len;

    return roundDivide;
}

function chooseOperator(str) {
    operationMode = str;
    operatorMem = str;
    operandA = display.textContent.trim();
}


//Event Listeners
const num = document.querySelectorAll(".number");
num.forEach(item => {
    item.addEventListener('click', () => {
        
        if (operationMode == "entry") {
            typeToDisplay(item.textContent.trim());
        }
        else {
            operandA = display.textContent.trim();
            clearDisplay()
            operationMode = "entry";
            typeToDisplay(item.textContent.trim())
        }
        
    });
});

const equals = document.querySelector("#equals");
equals.addEventListener('click', () => {
    if (operationMode == "entry") {
        operandB = display.textContent.trim();

        switch (operatorMem){
            case "addition":
                display.textContent = add(operandA, operandB);
                break;
            case "subtraction":
                display.textContent = subtract(operandA, operandB);
                break;
            case "multiply":
                display.textContent = multiply(operandA, operandB);
                break;
            case "divide":
                display.textContent = divide(operandA, operandB);
                break;
        }
    }
})

const operators = document.querySelectorAll(".operation");
operators.forEach(item => {
    item.addEventListener('click', () => {
        chooseOperator(item.id);
        displayValue = display.textContent.trim();
    });
})

const clearBtn = document.querySelector("#clear");
clear.addEventListener('click', () => {
    operandA = 0;
    operandB = 0;
    calcValue = 0;
    operationMode = "entry";
    operatorMem = "";
    displayValue = 0;

    clearDisplay();
})