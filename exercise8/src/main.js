const displayBox = document.querySelector('.display-box');
const displayInput = document.querySelector('#input');
const displayOutput = document.querySelector('#output');
const btns = document.querySelectorAll("button");
const operators = ['×', '÷', '%', '+', '-'];

let input = "";
let output = "";
let lastCalculatedValue = false;

displayOutput.textContent = '0';

const calculate = btnValue => {

    const lastChar = input[input.length - 1];
    const isLastOperator = operators.includes(lastChar);

    if (btnValue === 'C') {
        clearDisplay();
        lastCalculatedValue = false;
    } else if (btnValue === '+/-') {
        if (!isNaN(input)) {
            input = (parseFloat(input) * -1).toString();
        }
    } else if (btnValue === '%') {
        const percent = parseFloat(input) / 100;
        input = percent.toString();
    } else if (btnValue === '.') {
        if (lastCalculatedValue) {
            clearDisplay();
            input = '0.';
            output = '';
        } else if (input === '') {
            input = input + '0.';
        } else {
            const lastNumber = input.split(/[\+\-\*\/]/).pop();
            if (!lastNumber.includes('.')) {
                input = input + '.';
            }
        }
    } else if (btnValue === '=') {
        if (input === "" ||
            lastChar === "." ||
            isLastOperator && lastChar !== "%" ||
            lastCalculatedValue
        ) return;

        const formattedOperators = input
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        try {
            const calculatedValue = new Function(`return ${formattedOperators};`)();
            output = parseFloat(calculatedValue);
            lastCalculatedValue = true;
        } catch (error) {
            output = 'Error';
        }
    } else if (operators.includes(btnValue)) {
        if (lastCalculatedValue) {
            input = output + btnValue;
            output = '';
            lastCalculatedValue = false;
        } else if ((input === '' && (btnValue === '×' || btnValue === '÷' || btnValue === '%' || btnValue === '+'))) {
            return;
        } else if (operators.includes(input.slice(-1)) && operators.includes(btnValue)) {
            if (lastChar === '%') {
                input = input + btnValue;
            } else {
                input = input.slice(0, -1) + btnValue; // delete last operator and insert new operator
            }
        } else {
            input += btnValue;
        }
    } else {
        if (lastCalculatedValue) {
            clearDisplay();
            output = '';
        }
        output = '';
        input = input + btnValue;
    }

    // update display
    // use textContent when u use div
    // use value when u use input
    displayInput.textContent = input;
    console.log(input);
    displayOutput.textContent = output;
    console.log(output);
    displayInput.scrollLeft = displayInput.scrollWidth;
    displayOutput.scrollLeft = displayOutput.scrollWidth;
}

function clearDisplay() {
    input = '';
    output = '0';
    lastCalculatedValue = false;
}

btns.forEach(btn => {
    btn.addEventListener('click', e => calculate(e.target.textContent));
})