//Variables
const display = document.querySelector("#displayText");

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

function typeToDisplay(str) {
    if (display.textContent == "0") {
        display.textContent = str;
    }
    else {
        display.textContent += str;
    }
}

const num = document.querySelectorAll(".number");

num.forEach(item => {
    item.addEventListener('click', () => {
        typeToDisplay(item.textContent.trim());
    });
});