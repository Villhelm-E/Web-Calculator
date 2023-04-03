//...............................
//Variables
//...............................

const display = document.querySelector("#displayText");
const OpDisText = document.querySelector("#OpDisText");
const DISPLAY_LENGTH = 15;
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
    return fullDisplay(Math.round(+a * +b,DISPLAY_LENGTH-2)); //round to handle floating point rounding issues
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
    if (display.textContent.length > DISPLAY_LENGTH){
        console.log("too long");
        display.textContent = "OVERFLOW";
    }
    else {
        if (display.textContent == "0" | state == "operating") {
            display.textContent = str;
            //handle numbers less than 1
            if (display.textContent == ".") {
                display.textContent = "0.";
            }
        }
        else{
            display.textContent += str;
        }
    }

}

//resets the display to blank
function clearDisplay(){
    display.textContent = "";
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
    //handle different behaviors
    switch (state){
        case "entry":
            let oldText = display.textContent.trim();
            let newText = oldText.substring(0, oldText.length -1);
            if (newText.length >= 0) {
                display.textContent = newText;
            }

            break;

        case "operating":
            //reset operator variables
            OpDisText.textContent = "";
            operator = "";
            state = "entry";
            operandA = "";
        
            break;
        
        default:
            //behave like the clear button when finalized
            //clear every variable and reset the display
            operandA = 0;
            operandB = 0;
            operator = "";
            prevOperator = "";
            OpDisText.textContent = "";

            clearDisplay();
            console.clear();

            break;
    }
}

function DisablePeriod(){
    //this will disable or enable the period button to avoid decimal issues
    
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

                //clear operands
                operandA = "";
                operandB = "";

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

        //disable period if user typed a period
        DisablePeriod();

        //Debugging
        vars = [
            ["prevOperator", prevOperator],
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
                operator = item.id;
                OpDisText.textContent = item.textContent.trim();
                state = "operating";
                break;
            default:
                //do nothing
                console.log("do nothing");
                break;
        }

         //re-enable the decimal point
        document.getElementById('period').style.pointerEvents = 'auto';
        console.log("enabling");

        //Debugging
        vars = [
            ["prevOperator", prevOperator],
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
            //handle pressing enter without operator
            console.log("entry");
            if (operandA == ""){
                console.log("no math");
                state = "finalized";
            }
            else{
                console.log("math");
                clearDisplay();
                prevOperator = "";
                typeToDisplay(operate(operator, operandA, operandB));
                OpDisText.textContent = "";
                operator = "";
                state = "finalized";
                console.log("display says " + display.textContent.trim());
                operandA = display.textContent.trim();
                console.log("operandA is " + operandA);
            }
            break;

        case "finalized":
            //do nothing
            console.log("do nothing");
            
            break;

        default:
            //
            
            break;
    }
    
    //re-enable the decimal point
    document.getElementById('period').style.pointerEvents = 'auto';
    console.log("enabling");
});

const period = document.querySelector("#period");
period.addEventListener("click", DisablePeriod());

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', () => {
    //clear every variable and reset the display
    operandA = 0;
    operandB = 0;
    operator = "";
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