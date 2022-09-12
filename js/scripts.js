//...............................
//Variables
//...............................

const display = document.querySelector("#displayText");
const OpDisText = document.querySelector("#OpDisText");
const DISPLAY_LENGTH = 14;
let operandA = "";
let operandB = "";
let operator = "";
let state = "finalized";

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

    if (display.textContent == "0" | state == "operating") {
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
        
        switch (state){
            case "entry":
                //add number to display    
                console.log("pressed "+item.textContent.trim());
                typeToDisplay(item.textContent.trim());
                
                break;
            case "finalized":
                //change to entry mode
                clearDisplay();

                state = "entry";

                //add number to display    
                console.log("pressed "+item.textContent.trim());
                typeToDisplay(item.textContent.trim());
                break;
            default:
                //
                state = "entry";
                clearDisplay();
                typeToDisplay(item.textContent.trim());
                break;
        }

    });
});

//Operations
const operators = document.querySelectorAll(".operation");

//Operations Event Listener
operators.forEach(item => {
    item.addEventListener('click', () => {
        //Log
        console.log('%c .OPERATION', 'color:#bada55');

        switch (state){
            case "entry":
                //save operandA
                operandA = display.textContent.trim();
                console.log("operandA = "+operandA);

                //add operator to operator display
                OpDisText.textContent = item.textContent.trim();

                operator = item.id.trim();
                state = "operating";

                break;
            case "finalized":
                operandA = display.textContent.trim();
                OpDisText.textContent = item.textContent.trim();
                operator = item.id.trim();
                break;
            default:
                //do nothing
                console.log("do nothing");
                break;
        }

    });
});

//Equals
const equals = document.querySelector("#equals");

//Equals Event Listener
equals.addEventListener('click', () => {    
    //Log
    console.log('%c #EQUALS', 'color:#bada55');
    operandB = display.textContent.trim();
    switch (state){
        case "entry":
            //
            console.log("entry");
            display.textContent = operate(operator, operandA, operandB);
            OpDisText.textContent = "";
            operator = "";
            state = "finalized";
            break;
        case "finalized":
            //do nothing
            console.log("do nothing");
            break;
        default:
            //
            break;
    }

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