const OPERATORS = {
    '+': function(x, y) { return (+x) + (+y) },
    '-': function(x, y) { return x - y },
    '*': function(x, y) { return x * y },
    '/': function(x, y) { return x / y },
    '%': function(x, y) { return x % y }
};

window.onload = function() {
    initNum();
    document.addEventListener('keydown', event => {
        const keyPressed = event.key;
        if (OPERATORS.hasOwnProperty(keyPressed) || (+keyPressed >= 0) && (+keyPressed <= 9)) {
            insertNum(keyPressed);
        } else if (keyPressed === '=' || keyPressed === 'Enter') {
            calculate();
        } else if (keyPressed === 'Backspace') {
            const result = document.getElementById('result');
            const resultValue = result.value;
            if (OPERATORS.hasOwnProperty(resultValue[resultValue.length - 1])) {
                result.value = resultValue.slice(0, -2);
            } else {
                result.value = resultValue.slice(0, -1);
            }
        }
    });
}

function initNum() {
    const numElements = document.querySelectorAll('.num');
    for (const num of numElements) {
        num.addEventListener('click', function(event) {
            const element = event.target;
            insertNum(element.innerText);
        });
    }
}

function insertNum(num) {
    let result = document.getElementById('result');
    let resultText = result.value;
    if (resultText == '0') {
        result.value = num;
    } else if (OPERATORS.hasOwnProperty(resultText[resultText.length-1])) {
        let newEntry = document.createElement('div');
        newEntry.innerText = resultText;
        document.getElementById('current-calculation').appendChild(newEntry);
        result.value = num;
    } else {
        if (OPERATORS.hasOwnProperty(num)) {
            resultText += ' ';
        }
        resultText += num;
        result.value = resultText;
    }
    result.scrollLeft = result.scrollWidth;
}

function changeSign() {
    let current = document.getElementById('result').value;
    document.getElementById('result').value = current * -1
}

function calculate() {
    const previousInput = document.getElementById('current-calculation').innerText;
    const [firstInput, operator] = previousInput.split(' ');
    if (operator) {
        const currentInput = document.getElementById('result').value;
        const total = OPERATORS[operator](firstInput, currentInput);
        const result = document.getElementById('result');
        document.getElementById('result').value = total;
        document.getElementById('current-calculation').innerHTML = "";
        result.scrollLeft = result.scrollWidth;
    }
}

function clearInput() {
    document.getElementById('result').value = "0";
}