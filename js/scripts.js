//...............................
//Variables
//...............................

const display = document.querySelector("#displayText");
const OpDisText = document.querySelector("#OpDisText");
const DISPLAY_LENGTH = 14;
let operandA = "";
let operandB = "";
let operator = "";
let prevOperator = "";
let state = "finalized";

let vars = [
    ["prevOperatr", prevOperator],
    ["operator", operator],
    ["state", state],
    ["operandA", operandA],
    ["operandB", operandB]
]

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
            console.log(num1 + "+" + num2);
            return add(num1, num2);
        case "subtract":
            console.log(num1 + "-" + num2);
            return subtract(num1, num2);
        case "multiply":
            console.log(num1 + "*" + num2);
            return multiply(num1, num2);
        case "divide":
            console.log(num1 + "/" + num2);
            return divide(num1 , num2);
    }
}

//Updates the display text
function typeToDisplay(str) {
    //use case where user is entering brand new data
    console.log('%c TypeToDisplay()', 'color:#daba55');

    if (display.textContent == "0" | state == "operating") {
        display.textContent = str;
    }
    else{
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
                //remember operator
                prevOperator = operator;
                break;
            case "finalized":
                //change to entry mode
                clearDisplay();

                state = "entry";

                //add number to display    
                console.log("pressed " + item.textContent.trim());
                typeToDisplay(item.textContent.trim());
                break;
            default:
                //
                state = "entry";
                prevOperator = operator;
                clearDisplay();
                typeToDisplay(item.textContent.trim());
                break;
        }

        //Debugging
        vars = [
            ["prevOperatr", prevOperator],
            ["operator", operator],
            ["state", state],
            ["operandA", operandA],
            ["operandB", operandB]
        ]

        console.table(vars);

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
                //alternative
                //need to keep track of operandA and operandB
                //if user enters 5 * 3 - for example, need to do the multiplication

                if (operandA != "") {
                    //updates operator
                    console.log("operator was " + operator);
                    prevOperator = operator;
                    console.log("prevOperator is now " + operator);
                    operator = item.id;
                    console.log("operator is now " + operator);

                    //operandA gets replaced by operandA operate operandB
                    console.log("operandB was " + operandB);
                    operandB = display.textContent.trim();
                    console.log("operandB is now " + operandB);

                    console.log("operandA was " + operandA);
                    operandA = operate(prevOperator, operandA, operandB);
                    console.log("operandA is now " + operandA);

                    //update display
                    console.log("clearing display");
                    clearDisplay();

                    console.log("updating Operator Display");
                    OpDisText.textContent = item.textContent.trim();

                    console.log("writing operandA to display");
                    typeToDisplay(operandA);

                    //change state
                    console.log("updating state to 'operating'");
                    state = "operating";

                }
                else {
                    console.log("state was entry");
                    //save operandA
                    operandA = display.textContent.trim();
                    operator = item.id;
                    OpDisText.textContent = item.textContent.trim();
                    state = "operating";
                }

                break;
            case "finalized":

                break;
            default:
                //do nothing
                console.log("do nothing");
                break;
        }

        //Debugging
        vars = [
            ["prevOperatr", prevOperator],
            ["operator", operator],
            ["state", state],
            ["operandA", operandA],
            ["operandB", operandB]
        ]

        console.table(vars);

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
            clearDisplay();
            prevOperator = "";
            typeToDisplay(operate(operator, operandA, operandB));
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
    prevOperator = "";
    OpDisText.textContent = "";

    clearDisplay();
    console.clear();
});

const backBtn = document.querySelector("#backspace");
backBtn.addEventListener('click', () => {
    //backspace a character
    backspace();
});