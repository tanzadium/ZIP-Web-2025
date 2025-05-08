let A = 0;
let B = null;
let operator = null;
let justCalculated = false;

const inputDisplay = document.querySelector("#input");
const outputDisplay = document.querySelector("#output");

function clearAll() {
    A = null;
    B = null;
    operator = null;
    inputDisplay.textContent = "";
    outputDisplay.textContent = "0";
}

function updateInputDisplay() {
    inputDisplay.textContent = `${A !== null ? A : ""} ${operator !== null ? operator : ""} ${B !== null ? B : ""}`;
}

function evaluate() {
    const numA = parseFloat(A);
    const numB = parseFloat(B);
    let result = null;

    switch (operator) {
        case "+":
            result = numA + numB;
            break;
        case "-":
            result = numA - numB;
            break;
        case "×":
            result = numA * numB;
            break;
        case "÷":
            if (numB === 0) {
                result = "Error";
            } else {
                result = numA / numB;
            }
            break;
    }

    outputDisplay.textContent = result;
    A = result;
    B = null;
    operator = null;
    justCalculated = true;
}

document.querySelectorAll("button").forEach(button => {
    const value = button.textContent;

    button.addEventListener("click", () => {
        if (value === "C") {
            clearAll();
            return;
        }

        if (value === "+/-") {
            if (operator === null && A !== null) {
                A = (parseFloat(A) * -1).toString();
                outputDisplay.textContent = A;
            } else if (operator !== null && B !== null) {
                B = (parseFloat(B) * -1).toString();
                outputDisplay.textContent = B;
            }
            updateInputDisplay();
            return;
        }

        if (value === "%") {
            if (operator === null && A !== null) {
                A = (parseFloat(A) / 100).toString();
                outputDisplay.textContent = A;
            } else if (operator !== null && B !== null) {
                B = (parseFloat(B) / 100).toString();
                outputDisplay.textContent = B;
            }
            updateInputDisplay();
            return;
        }

        if (["+", "-", "×", "÷"].includes(value)) {
            if (A === null) {
                A = "0";
            }
            if (B !== null) {
                evaluate();
            }
            operator = value;
            justCalculated = false;
            updateInputDisplay();
            return;
        }

        if (value === "=") {
            if (A !== null && B !== null && operator !== null) {
                evaluate();
                updateInputDisplay();
            }
            return;
        }

        if (justCalculated && operator === null) {
            A = null;
            outputDisplay.textContent = "0";
            justCalculated = false;
        }

        if (operator === null) {
            if (A === null || A === "0") {
                A = value === "." ? "0." : value;
            } else if (value === "." && A.includes(".")) {
                return;
            } else {
                A += value;
            }
            outputDisplay.textContent = A;
        } else {
            if (B === null || B === "0") {
                B = value === "." ? "0." : value;
            } else if (value === "." && B.includes(".")) {
                return;
            } else {
                B += value;
            }
            outputDisplay.textContent = B;
        }

        updateInputDisplay();
    });
});

clearAll();