let display = document.getElementById('result');
let currentInput = '';
let operator = null;
let firstOperand = null;
const body = document.body;
const calculator = document.querySelector('.calculator');
const themeToggle = document.getElementById('theme-toggle');

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (firstOperand !== null) {
        calculate();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '';
}

function appendDecimal() {
    if (currentInput.includes('.')) return;
    currentInput += '.';
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    display.value = '0';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput === '' ? '0' : currentInput;
}

function calculate() {
    if (operator === null || firstOperand === null || currentInput === '') return;
    const secondOperand = parseFloat(currentInput);
    let result;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                display.value = 'Error!';
                return;
            }
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    currentInput = String(result);
    operator = null;
    firstOperand = null;
    display.value = currentInput;
}

// Keyboard Support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});

// Dark Mode Toggle Functionality
themeToggle.addEventListener('change', function() {
    body.classList.toggle('dark-mode');
    calculator.classList.toggle('dark-mode');
});

// Set initial theme based on user preference (optional - you might need more complex logic)
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     themeToggle.checked = true;
//     body.classList.add('dark-mode');
//     calculator.classList.add('dark-mode');
// }