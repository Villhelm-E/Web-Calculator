//...............................
//Variables
//...............................

const display = document.querySelector("#displayText");
const OpDisText = document.querySelector("#OpDisText");
const DISPLAY_LENGTH = 14;
let operandA = 0;
let operandB = 0;
let operationMode = "entry";

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
    console.log("typeToDisplay(" + display.textContent + ")");

    switch (operationMode) {
        case "entry":
            if (display.textContent == "0") {
                display.textContent = str;
            }
            //use case where user is continuing to enter data
            else {
                display.textContent += str;
            }
            
            break;
        case "operation":
            break;
        case "finalized":
            break;
    }

    console.log("typeToDisplay(" + display.textContent + ")");
}

//resets the display to 0
function clearDisplay(){
    display.textContent = "0";
    console.clear();
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
    else if (operationMode == "entry") {
        //clear every variable and reset the display
        operandA = 0;
        operandB = 0;
        operationMode = "entry";

        clearDisplay();
    }
    //Handle behavior where the user has pressed an operation button but
    //hasn't chosen a second number
    else {
        //Forget the operation the user entered and go back to entry mode
        OpDisText.textContent = "";
        operationMode = "entry";
        // operationMem = "";
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
        console.log("operationMode = " + operationMode);
        
        //Modes
        switch(operationMode) {
            //Entry mode
            case "entry":   
                console.log('%c Entry Case', 'color:#EF1012');
                console.log(item.textContent.trim());
                typeToDisplay(item.textContent.trim());
                break;
            //Finalized mode
            case "finalized":
                console.log('%c Finalized Case', 'color:#EF1012');
                
                //reset display and variables
                //then just like entry mode
                
                break;
            //Operation mode
            default:
                console.log('%c Operation Case', 'color:#EF1012');
                operandB = item.textContent.trim();
                console.log("text content is " + item.textContent.trim());
                console.log("operandA was " + operandA);
                operandA = display.textContent.trim();
                console.log("now it's " + operandA);
                display.textContent = operandB;
//                operationMode = 'entry';
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
        console.log("item.id = " + item.id);
        console.log("operationMode = " + operationMode)
        
        //Operation Mode
        switch (operationMode) {
            //Entry mode
            case "entry":
                console.log('%c Entry Case', 'color:#EF1012');
                
                console.log("operandA was " + operandA)
                operandA = display.textContent.trim();
                console.log("now it's " + operandA)
                operationMode = item.id.trim();
                console.log("operationMode = " + operationMode)
                OpDisText.innerHTML = item.textContent.trim();
            
                break;
            //Operation mode
            case "operation":
                console.log('%c Operation Case', 'color:#EF1012');
                
                break;
            //Finalized mode
            case "finalized":
                console.log('%c Finalized Case', 'color:#EF1012');
                
                operandA = display.textContent.trim();
                operationMode = item.id.trim();
                OpDisText.innerHTML = item.textContent.trim();
        }
    });
});

//Equals
const equals = document.querySelector("#equals");

//Equals Event Listener
equals.addEventListener('click', () => {    
    //Log
    console.log('%c #EQUALS', 'color:#bada55');
    console.log("operationMode = " + operationMode);
    
    //Operation mode
    switch (operationMode) {
        //Entry mode
        case "entry":
            console.log('%c Entry Case', 'color:#EF1012');
            
            operandB = display.textContent.trim();
            display.textContent = operate(operationMode, operandA, operandB);
            OpDisText.textContent = "";
            operationMode = "entry";
            break;
        //Finalized mode
        case "finalized":
            console.log('%c Finalized Case', 'color:#EF1012');

            break;
        default:
            console.log('%c Operation Case', 'color:#EF1012');

            operandB = display.textContent.trim();
            display.textContent = operate(operationMode, operandA, operandB);
            OpDisText.textContent = "";
            operationMode = "finalized";
    }
});

const period = document.querySelector("#period");
period.addEventListener("click", DisablePeriod());

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', () => {
    //clear every variable and reset the display
    operandA = 0;
    operandB = 0;
    operationMode = "entry";

    OpDisText.textContent = "";

    clearDisplay();
});

const backBtn = document.querySelector("#backspace");
backBtn.addEventListener('click', () => {
    //backspace a character
    backspace();
});