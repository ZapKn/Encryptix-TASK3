let display = document.getElementById('display');
let historyList = document.getElementById('historyList');
let historyBtn = document.getElementById('historyBtn');
let historyModal = document.getElementById('historyModal');
let closeHistory = document.getElementById('closeHistory');
let currentInput = '0';
let lastResult = 0;

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => handleInput(button.dataset.value));
});

historyBtn.onclick = function() {
    historyModal.style.display = "block";
}

closeHistory.onclick = function() {
    historyModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == historyModal) {
        historyModal.style.display = "none";
    }
}

function handleInput(value) {
    switch(value) {
        case 'C':
            currentInput = '0';
            break;
        case 'DEL':
            currentInput = currentInput.slice(0, -1) || '0';
            break;
        case '=':
            calculate();
            break;
        case 'log':
            currentInput = Math.log10(parseFloat(currentInput)).toString();
            break;
        default:
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
    }
    updateDisplay();
}

function calculate() {
    try {
        let expression = currentInput.replace(/\^/g, '**');
        let result = eval(expression);
        addToHistory(`${currentInput} = ${result}`);
        lastResult = result;
        currentInput = result.toString();
    } catch (error) {
        currentInput = 'Error';
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}

function addToHistory(entry) {
    let li = document.createElement('li');
    li.textContent = entry;
    historyList.prepend(li);
    
    while (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

updateDisplay();