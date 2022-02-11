/**
 * Main constants such as buttons, input fields and labels
 */
const
    digitButtons = document.querySelectorAll(".number"),
    inputField = document.getElementById("input_field"),
    textArea = document.getElementById("textarea"),
    operationButtons = document.querySelectorAll(".operation"),
    equationButton = document.getElementById("="),
    reverseButton = document.getElementById("+/-"),
    fractionButton = document.getElementById("1/x"),
    factorialButton = document.getElementById("!"),
    powerButton = document.getElementById("x^2"),
    rootButton = document.getElementById("root"),
    image = document.getElementById("tokyo"),
    deleteButton = document.getElementById("delete"),
    clearButton = document.getElementById("clear");

let tempValue;
let operation;
let result;
/**
 * Event listeners
 */
deleteButton.addEventListener("click", deleteText);
clearButton.addEventListener("click", clear);

digitButtons.forEach(element => {
    element.addEventListener("click", () => {
        modifyText(element.value);
    });
});
operationButtons.forEach(element => {
    element.addEventListener("click", () => {
        clear();
        tempValue = inputField.value;
        operation = element.value;
        modifyArea(tempValue, operation);
        deleteText();
    });
});
equationButton.addEventListener("click", () => {
    modifyArea(inputField.value, equationButton.value);
    equation(inputField.value);
    deleteText();
});
fractionButton.addEventListener("click", () => {
    fraction(inputField.value);
    deleteText();
});
powerButton.addEventListener("click", () => {
    power(inputField.value);
    deleteText();
});
rootButton.addEventListener("click", () => {
    squareRoot(inputField.value);
    deleteText();
});
factorialButton.addEventListener("click", () => {
    textArea.value = factorial(inputField.value);
    deleteText();
});
reverseButton.addEventListener("click", () => {
    reverse(inputField.value);
});

/**
 * Helping functions
 */
function modifyText(text) {
    inputField.value += `${text}`;
}

function modifyArea(text, operation) {
    textArea.value += `${text} \n${operation}\n`;
}

function deleteText() {
    inputField.value = "";
}

function clear() {
    textArea.value = '';
    tempValue = null;
    operation = null;
}

function equation(secondValue) {
    if (operation == '+') {
        summ(tempValue, secondValue);
    }
    if (operation == '-') {
        substract(tempValue, secondValue);
    }
    if (operation == 'x') {
        multiply(tempValue, secondValue);
    }
    if (operation == '/') {
        divide(tempValue, secondValue);
    }
    if (operation == '%') {
        percent(tempValue, secondValue);
    }
    tempValue = null;
    operation = null;
}
/**
 *Math functions
 */
function summ(a, b) {
    result = parseFloat(a) + parseFloat(b);
    textArea.value += `${result}`;
}

function substract(a, b) {
    if (a == 1000 && b == 7) {
        showGhoul();
    }
    result = parseFloat(a) - parseFloat(b);
    textArea.value += `${result}`;
}

function multiply(a, b) {
    result = parseFloat(a) * parseFloat(b);
    textArea.value += `${result}`;
}

function divide(a, b) {
    result = parseFloat(a) / parseFloat(b);
    textArea.value += `${result}`;
}

function percent(a, b) {
    if (a > 0 && b > 0) {
        result = parseFloat(a) * (parseFloat(b) / 100);
        textArea.value += `${result}`;
    }
}

function squareRoot(a) {
    if (a > 0) {
        textArea.value = Math.sqrt(a);
    }
}

function power(a) {
    textArea.value = a * a;
}

function fraction(a) {
    if (a != null) {
        textArea.value = 1 / a;
    } 
}

function factorial(a) {
    if (a != null) {
        if (a === 0) {
            return 1;
        } else {
            return a * factorial(a - 1);
        }
    }
}

function reverse(input) {
    input[0] == '-' ? input = input.substring(1) : input = '-' + input;
    inputField.value = input;
}

function showGhoul() {
    image.removeAttribute("hidden");
    setTimeout(() => {
        hide();
    }, 40);
}
function hide() {
    image.setAttribute("hidden", true);
}
