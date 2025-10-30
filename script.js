// script.js - UI логика калькулятора

// Создание экземпляра калькулятора
const calc = new Calculator();

// Получение элемента дисплея
const display = document.getElementById('display');

// Обновление дисплея
function updateDisplay() {
    display.value = calc.getCurrentValue();
}

// Добавление символа на дисплей
function appendToDisplay(value) {
    let current = calc.getCurrentValue();
    
    if (current === '0' && value !== '.') {
        calc.setCurrentValue(value);
    } else if (current === '0' && value === '.') {
        calc.setCurrentValue('0.');
    } else {
        if (value === '.' && current.includes('.')) return;
        calc.setCurrentValue(current + value);
    }
    updateDisplay();
}

// Очистка дисплея
function clearDisplay() {
    calc.clear();
    updateDisplay();
}

// Удаление последнего символа
function deleteLastChar() {
    let current = calc.getCurrentValue();
    if (current.length > 1) {
        calc.setCurrentValue(current.slice(0, -1));
    } else {
        calc.setCurrentValue('0');
    }
    updateDisplay();
}

// Операции с двумя операндами
let previousValue = '';
let operation = null;

function add() {
    setOperation('add');
}

function subtract() {
    setOperation('subtract');
}

function multiply() {
    setOperation('multiply');
}

function divide() {
    setOperation('divide');
}

function modulo() {
    setOperation('modulo');
}

function power() {
    setOperation('power');
}

function setOperation(op) {
    if (calc.getCurrentValue() === '') return;
    if (previousValue !== '' && operation !== null) {
        calculate();
    }
    operation = op;
    previousValue = calc.getCurrentValue();
    calc.setCurrentValue('0');
}

// Вычисление результата
function calculate() {
    try {
        const prev = parseFloat(previousValue);
        const current = parseFloat(calc.getCurrentValue());
        
        if (isNaN(prev) || isNaN(current)) return;
        
        const result = calc.calculate(operation, prev, current);
        calc.setCurrentValue(Math.round(result * 10000000000) / 10000000000);
        operation = null;
        previousValue = '';
        updateDisplay();
    } catch (error) {
        alert('Ошибка: ' + error.message);
        clearDisplay();
    }
}

// Унарные операции
function calculateSin() {
    try {
        const value = parseFloat(calc.getCurrentValue());
        if (isNaN(value)) {
            alert('Ошибка: введите число');
            return;
        }
        const result = calc.sin(value);
        calc.setCurrentValue(result);
        updateDisplay();
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}

function calculateCos() {
    try {
        const value = parseFloat(calc.getCurrentValue());
        if (isNaN(value)) {
            alert('Ошибка: введите число');
            return;
        }
        const result = calc.cos(value);
        calc.setCurrentValue(result);
        updateDisplay();
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}

function calculateSqrt() {
    try {
        const value = parseFloat(calc.getCurrentValue());
        if (isNaN(value)) {
            alert('Ошибка: введите число');
            return;
        }
        const result = calc.sqrt(value);
        calc.setCurrentValue(result);
        updateDisplay();
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}

function floorValue() {
    try {
        const value = parseFloat(calc.getCurrentValue());
        if (isNaN(value)) {
            alert('Ошибка: введите число');
            return;
        }
        const result = calc.floor(value);
        calc.setCurrentValue(result);
        updateDisplay();
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}

function ceilValue() {
    try {
        const value = parseFloat(calc.getCurrentValue());
        if (isNaN(value)) {
            alert('Ошибка: введите число');
            return;
        }
        const result = calc.ceil(value);
        calc.setCurrentValue(result);
        updateDisplay();
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}

// Работа с памятью
function memoryAdd() {
    try {
        const value = parseFloat(calc.getCurrentValue());
        if (isNaN(value)) {
            alert('Ошибка: введите число');
            return;
        }
        const memory = calc.memoryAdd(value);
        alert('Добавлено в память: ' + value + '\nТекущее значение памяти: ' + memory);
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}

function memoryClear() {
    calc.memoryClear();
    alert('Память очищена');
}

function memoryRecall() {
    const memory = calc.memoryRecall();
    calc.setCurrentValue(memory);
    updateDisplay();
}

// Инициализация
updateDisplay();

console.log('=== Калькулятор v3.0 с Unit-тестами ===');
console.log('Разработчик 1 (andrew05812): Рефакторинг + тесты для операций 1-6');
console.log('Разработчик 2 (BuMcHiKa): Тесты для операций 7-12');