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
            console.log(multiply(num1, num2));
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

    //handle number longer than display length
    if (str.toString().length > DISPLAY_LENGTH){
        console.log("too long");
        
        //handle math with decimals
        if (str.toString().includes(".")) {
            console.log("decimal");
            display.textContent = str.toString().slice(0,DISPLAY_LENGTH);
        }
        else {
            display.textContent = "OVERFLOW";
        
            //disable operators so user can't do math on overflow
            disableOperators();
        }
    }
    //entry and operating modes ends up over here one characer at a time
    else {
        if (display.textContent == "0" | state == "operating") {
            display.textContent = str;
            //handle numbers less than 1
            if (display.textContent == ".") {
                display.textContent = "0.";
            }
        }
        //
        else{
            let oldDisplay = display.textContent.trim()
            let newDisplay = oldDisplay += str;
            if (newDisplay.length > DISPLAY_LENGTH){
                //disable numbers
                console.log("disabling numbers");
    
                const nums = document.querySelectorAll(".number");
                nums.forEach(nums => {nums.disabled = true});
            }
            else {
                display.textContent += str;
            }
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

//Clears variables and disables operators, used when overflow
function disableOperators(){
    console.log("running disableOperators function");
    
    //buttons
    const ops = document.querySelectorAll(".operation");
    ops.forEach(ops => {ops.disabled = true});
    
    //variables
    OpDisText.textContent = "";
    state = "finalized";
    operandA = "";
    operandB = "";
    operator = "";
    prevOperator = "";
    
    console.log("Disabling operators");
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

        //Enable numbers
        console.log("enabling numbers");
    
        const nums = document.querySelectorAll(".number");
        nums.forEach(nums => {nums.disabled = false});

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
                operandA = display.textContent.trim();
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

    //Enable operators
    console.log("enabling operators");
    
    const ops = document.querySelectorAll(".operation");
    ops.forEach(ops => {ops.disabled = false});
});

const backBtn = document.querySelector("#backspace");
backBtn.addEventListener('click', () => {
    //backspace a character
    backspace();
});

//Keyboard math
document.addEventListener('keyup', (event) => {
        var name = event.key;
        var code = event.code;
        // Alert the key name and key code on keydown
        //alert(`Key pressed ${name} \r\n Key code value: ${code}`);

        if (event.defaultPrevented){
            return;
        }
        else if ((name === "+" && code === "Equal") || code === "NumpadAdd"){
            //handle addition
            document.getElementById("add").click();
        }
        else if (name === "*" || name === "x" || name === "X"){
            //handle multiplication
            document.getElementById("multiply").click();
        }
        else if (code === "Minus" || code === "NumpadSubtract") {
            //handle subtraction
            document.getElementById("subtract").click();
        }
        else if (code === "Slash" || code === "NumpadDivide" || code === "Backslash" || code === "IntlBackslash") {
            //handle division
            document.getElementById("divide").click();
        }
        else if (code === "Equal" || code === "Enter" || code === "NumpadEnter" | code === "NumpadEqual") {
            //handle equal
            document.getElementById("equals").click();
        }
        else if (code === "Period" || code === "NumpadDecimal") {
            //handle period
            document.getElementById("period").click();
        }
        else if (code === "Backspace" || code === "Delete" || code === "NumpadBackspace") {
            //handle backspace
            document.getElementById("backspace").click();
        }
        else if (code === "KeyC") {
            //handle clear
            document.getElementById("clear").click();
        }
        else if (code === "Digit0" || code === "Numpad0") {
            //handle zero
            document.getElementById("zero").click();
        }
        else if (code === "Digit1" || code === "Numpad1") {
            //handle one
            document.getElementById("one").click();
        }
        else if (code === "Digit2" || code === "Numpad2") {
            //handle two
            document.getElementById("two").click();
        }
        else if (code === "Digit3" || code === "Numpad3") {
            //handle three
            document.getElementById("three").click();
        }
        else if (code === "Digit4" || code === "Numpad4") {
            //handle four
            document.getElementById("four").click();
        }
        else if (code === "Digit5" || code === "Numpad5") {
            //handle five
            document.getElementById("five").click();
        }
        else if (code === "Digit6" || code === "Numpad6") {
            //handle six
            document.getElementById("six").click();
        }
        else if (code === "Digit7" || code === "Numpad7") {
            //handle seven
            document.getElementById("seven").click();
        }
        else if (code === "Digit8" || code === "Numpad8") {
            //handle eight
            document.getElementById("eight").click();
        }
        else if (code === "Digit9" || code === "Numpad9") {
            //handle nine
            document.getElementById("nine").click();
        }

    }, false);

    //numbers: "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Numpad0", "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5", "Numpad6", "Numpad7", "Numpad8", "Numpad9"
    //operators: "Minus", "Equal", "Period", "Slash", "Enter", "NumpadAdd", "NumpadDecimal", "NumpadDivide", "NumpadEnter", "NumpadEqual", "NumpadStar", "NumpadSubtract"
    //other: "Backspace", "Backslash", "IntlBackslash", "Delete", "NumpadBackspace"
