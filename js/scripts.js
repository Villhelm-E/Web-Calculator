//Variables
const display = document.querySelector("#displayText");
const OpDisText = document.querySelector("#OpDisText");
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
    let len = 10 ** (DISPLAY_LENGTH - 2);
    
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

//removes the last character from the display and updates globals accordingly
function backspace() {
    //normal backspace when user is typing a number
    if (operationMode == "entry") {
        //save display value to variable
        let str = display.textContent.trim();
        
        //if there's only one digit on display
        if (str.substring(0,str.length - 1) == "") {
            display.textContent = 0;
        }
        //truncate last digit on display
        else {
            display.textContent = str.substring(0,str.length - 1);
        }
    }
    //clear display and memory after user has evaluated a calculation
    else if (operationMode == "equals") {
        //clear every variable and reset the display
        operandA = 0;
        operandB = 0;
        operationMode = "entry";
        operatorMem = "";
        displayValue = 0;

        clearDisplay();
    }
    //Handle behavior where the user has pressed an operation button but hasn't chosen a second number
    else {
        //Forget the operation the user entered and go back to entry mode
        OpDisText.textContent = "";
        operationMode = "entry";
        operationMem = "";
    }
}

//This function takes the item id of an operator button and
//sets the operator display to the appropriate html entity
function OperatorMarker(str) {
    switch (str) {
        case "multiply":
            OpDisText.innerHTML = '&times;';
            break;
        case "divide":
            OpDisText.innerHTML = '&div;';
            break;
        case "addition":
            OpDisText.innerHTML = '&plus;';
            break;
        case "subtraction":
            OpDisText.innerHTML = '&minus;';
            break;
    }
}

function DisablePeriod(){
    //this will disable the period button... somehow...
    
    if (display.textContent.includes(".")) {
        document.getElementById('period').style.pointerEvents = 'none';
        console.log("disabling");
    }
    else {
        document.getElementById('period').style.pointerEvents = 'auto';
        console.log("enabling");
    }
}

const period = document.querySelector("#period");
period.addEventListener("click", DisablePeriod);

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
        OpDisText.textContent = "";
    }
});

const operators = document.querySelectorAll(".operation");
operators.forEach(item => {
    item.addEventListener('click', () => {
        //forwards the user's input to the appropriate operator function
        chooseOperator(item.id);
        displayValue = display.textContent.trim();
        OperatorMarker(item.id.trim());
    });
});

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', () => {
    //clear every variable and reset the display
    operandA = 0;
    operandB = 0;
    operationMode = "entry";
    operatorMem = "";
    displayValue = 0;

    OpDisText.textContent = "";

    clearDisplay();
});

const backBtn = document.querySelector("#backspace");
backBtn.addEventListener('click', () => {
    //backspace a character
    backspace();
});