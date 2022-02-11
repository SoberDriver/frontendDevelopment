/**
 * Main constants such as buttons, input fields and labels
 */
const
    digitButtons = document.querySelectorAll(".number"),
    inputField = document.getElementById("input_field"),
    textArea = document.getElementById("textarea"),
    operationButtons = document.querySelectorAll(".operation"),

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


function modifyText(text) {
    inputField.value += `${text}`;
}

function modifyArea(text, operation) {
    textArea.value += `${text} \n ${operation}`;
}

function deleteText() {
    inputField.value = "";
}

function clear() {
    textArea.value = '';
    tempValue = '';
    operation = '';
}

function equation( /**нужен аргумент который бюудет вторым аргументов во всех двух-аргументных функциях */ ) {

    tempValue = '';
    operation = '';
}
/**
 *Math functions
 */
function summ(a, b) {
    textArea.value = `${a} \n +`;
    deleteText();
    return a + b;
}

function substract(a, b) {
    textArea.value = `${a} \n -`;
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function squareRoot(a) {
    textArea.value = Math.sqrt(a);
}

function power(a) {
    textArea.value = a * a;
}

function fraction(a) {
    if (a != '') {
        textArea.value = 1 / a;
    } else {
        alert("Please throw me some numbers...");
    }

}

function factorial(a) {
    if (a === 0) {
        return 1;
    } else {
        return a * factorial(a - 1);
    }
}

function percent(a, b) {
    return;
}

function show() {
    image.removeAttribute("hidden");
}
function hide() {
    image.setAttribute("hidden");
}
