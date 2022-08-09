//...............................
//Variables
//...............................

const display = document.querySelector("#displayText");
const OpDisText = document.querySelector("#OpDisText");
const DISPLAY_LENGTH = 14;
let operandA = 0;
let operandB = 0;
let displayVal = "";
let operator = "";

//...............................
//Functions
//...............................

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

//Function The Odin Project told me to make
function operate(operator, num1, num2) {
    switch (operator) {
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1 , num2);
    }
}

//Updates the display text
function typeToDisplay(str) {
    //use case where user is entering brand new data
    console.log('%c TypeToDisplay()', 'color:#daba55');
    console.log("str = " + str);
    console.log("Before: typeToDisplay(" + display.textContent + ")");

    if (display.textContent == "0") {
        display.textContent = str;
    }
    else{
        display.textContent += str;
    }
    console.log("After: typeToDisplay(" + display.textContent + ")");
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

//removes the last character from the display and updates globals accordingly
function backspace() {
    //normal backspace when user is typing a number

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


//...............................
//Event Listeners
//...............................

//Numbers
const num = document.querySelectorAll(".number");

//Number event listener
num.forEach(item => {
    item.addEventListener('click', () => {
        //Log
        console.log('%c .NUM', 'color:#bada55');
        console.log(item.textContent);
        if (operator != ""){
            clearDisplay();
        }
        
        typeToDisplay(item.textContent.trim());
    });
});

//Operations
const operators = document.querySelectorAll(".operation");

//Operations Event Listener
operators.forEach(item => {
    item.addEventListener('click', () => {
        //Log
        console.log('%c .OPERATION', 'color:#bada55');
        operandA = display.textContent.trim();
        console.log(item.id);
        operator = item.id;
        OpDisText.textContent = item.textContent.trim();
    });
});

//Equals
const equals = document.querySelector("#equals");

//Equals Event Listener
equals.addEventListener('click', () => {    
    //Log
    console.log('%c #EQUALS', 'color:#bada55');
    console.log(operandA);
    operandB = display.textContent.trim();
    OpDisText.textContent = "";
    display.textContent = "";
    console.log(operandB);
    typeToDisplay(operate(operator, operandA, operandB));
    
});

const period = document.querySelector("#period");
period.addEventListener("click", DisablePeriod());

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', () => {
    //clear every variable and reset the display
    operandA = 0;
    operandB = 0;

    OpDisText.textContent = "";

    clearDisplay();
    console.clear();
});

const backBtn = document.querySelector("#backspace");
backBtn.addEventListener('click', () => {
    //backspace a character
    backspace();
});