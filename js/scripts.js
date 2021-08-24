//Variables
const display = document.querySelector("#displayText");
const DISPLAY_LENGTH = 14;
let operandA = 0;
let operandB = 0;
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

//Updates the display text
function typeToDisplay(str) {
    //use case where user is entering brand new data
    if (display.textContent == "0" && operationMode == "entry") {
        display.textContent = str;
    }
    //use case where user is continuing to enter data
    else {
        display.textContent += str;
    }
}

//resets the display to 0
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

//Saves the chosen operator and the current value on display to memory
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
        //if user presses an operator, save the current value to memory and clear the display
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
        //feeds the saved values in memory to the appropriate function user pressed
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
});

const operators = document.querySelectorAll(".operation");
operators.forEach(item => {
    item.addEventListener('click', () => {
        //forwards the user's input to the appropriate operator function
        chooseOperator(item.id);
        displayValue = display.textContent.trim();
    });
});

const clearBtn = document.querySelector("#clear");
clear.addEventListener('click', () => {
    //clear every variable and reset the display
    operandA = 0;
    operandB = 0;
    operationMode = "entry";
    operatorMem = "";
    displayValue = 0;

    clearDisplay();
});