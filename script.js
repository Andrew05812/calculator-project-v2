// Глобальные переменные
let currentValue = '0';
let previousValue = '';
let operation = null;
let memory = 0;

// Получение элемента дисплея
const display = document.getElementById('display');

// Обновление дисплея
function updateDisplay() {
    display.value = currentValue;
}

// Добавление символа на дисплей
function appendToDisplay(value) {
    if (currentValue === '0' && value !== '.') {
        currentValue = value;
    } else if (currentValue === '0' && value === '.') {
        currentValue = '0.';
    } else {
        // Запрет на несколько точек
        if (value === '.' && currentValue.includes('.')) return;
        currentValue += value;
    }
    updateDisplay();
}

// Очистка дисплея
function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    updateDisplay();
}

// Удаление последнего символа
function deleteLastChar() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

// ===== ОПЕРАЦИЯ 1: СЛОЖЕНИЕ =====
function add() {
    if (currentValue === '') return;
    if (previousValue !== '' && operation !== null) {
        calculate();
    }
    operation = 'add';
    previousValue = currentValue;
    currentValue = '0';
}

// ===== ОПЕРАЦИЯ 2: ВЫЧИТАНИЕ =====
function subtract() {
    if (currentValue === '') return;
    if (previousValue !== '' && operation !== null) {
        calculate();
    }
    operation = 'subtract';
    previousValue = currentValue;
    currentValue = '0';
}

// ===== ОПЕРАЦИЯ 3: УМНОЖЕНИЕ =====
function multiply() {
    if (currentValue === '') return;
    if (previousValue !== '' && operation !== null) {
        calculate();
    }
    operation = 'multiply';
    previousValue = currentValue;
    currentValue = '0';
}

// ===== ОПЕРАЦИЯ 4: ДЕЛЕНИЕ =====
function divide() {
    if (currentValue === '') return;
    if (previousValue !== '' && operation !== null) {
        calculate();
    }
    operation = 'divide';
    previousValue = currentValue;
    currentValue = '0';
}

// ===== ОПЕРАЦИЯ 5: ОСТАТОК ОТ ДЕЛЕНИЯ =====
function modulo() {
    if (currentValue === '') return;
    if (previousValue !== '' && operation !== null) {
        calculate();
    }
    operation = 'modulo';
    previousValue = currentValue;
    currentValue = '0';
}

// ===== ОПЕРАЦИЯ 6: SIN =====
function calculateSin() {
    const value = parseFloat(currentValue);
    if (isNaN(value)) {
        alert('Ошибка: введите число');
        return;
    }
    // Переводим градусы в радианы
    const radians = value * (Math.PI / 180);
    currentValue = Math.sin(radians).toString();
    updateDisplay();
}

// Вычисление результата
function calculate() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch(operation) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                alert('Ошибка: деление на ноль!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        case 'modulo':
            if (current === 0) {
                alert('Ошибка: деление на ноль!');
                clearDisplay();
                return;
            }
            result = prev % current;
            break;
        case 'power':
            result = Math.pow(prev, current);
            break;
        default:
            return;
    }
    
    // Округляем до 10 знаков после запятой
    currentValue = Math.round(result * 10000000000) / 10000000000;
    currentValue = currentValue.toString();
    operation = null;
    previousValue = '';
    updateDisplay();
}

// ===== ЗАГЛУШКИ ДЛЯ ФУНКЦИЙ ВТОРОГО РАЗРАБОТЧИКА =====
// Эти функции будет реализовывать второй аккаунт (BuMcHiKa)

function calculateCos() {
    alert('Функция COS будет добавлена разработчиком BuMcHiKa');
}

function power() {
    alert('Функция возведения в степень будет добавлена разработчиком BuMcHiKa');
}

function calculateSqrt() {
    alert('Функция квадратного корня будет добавлена разработчиком BuMcHiKa');
}

function floorValue() {
    alert('Функция округления вниз будет добавлена разработчиком BuMcHiKa');
}

function ceilValue() {
    alert('Функция округления вверх будет добавлена разработчиком BuMcHiKa');
}

function memoryAdd() {
    alert('Функция памяти M+ будет добавлена разработчиком BuMcHiKa');
}

function memoryClear() {
    alert('Функция памяти MC будет добавлена разработчиком BuMcHiKa');
}

function memoryRecall() {
    alert('Функция памяти MR будет добавлена разработчиком BuMcHiKa');
}

// Инициализация
updateDisplay();

console.log('=== Калькулятор v2.0 ===');
console.log('Разработчик 1 (andrew05812): Базовые операции (+, -, ×, ÷, %, sin)');
console.log('Разработчик 2 (BuMcHiKa): Продвинутые функции (будут добавлены)');