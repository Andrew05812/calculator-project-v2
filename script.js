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

// ===== ОПЕРАЦИИ ВТОРОГО РАЗРАБОТЧИКА (BuMcHiKa) =====

// ===== ОПЕРАЦИЯ 7: COS =====
function calculateCos() {
    const value = parseFloat(currentValue);
    if (isNaN(value)) {
        alert('Ошибка: введите число');
        return;
    }
    // Переводим градусы в радианы
    const radians = value * (Math.PI / 180);
    currentValue = Math.cos(radians).toString();
    updateDisplay();
}

// ===== ОПЕРАЦИЯ 8: ВОЗВЕДЕНИЕ В СТЕПЕНЬ =====
function power() {
    if (currentValue === '') return;
    if (previousValue !== '' && operation !== null) {
        calculate();
    }
    operation = 'power';
    previousValue = currentValue;
    currentValue = '0';
}

// ===== ОПЕРАЦИЯ 9: КВАДРАТНЫЙ КОРЕНЬ =====
function calculateSqrt() {
    const value = parseFloat(currentValue);
    if (isNaN(value)) {
        alert('Ошибка: введите число');
        return;
    }
    if (value < 0) {
        alert('Ошибка: невозможно извлечь корень из отрицательного числа!');
        return;
    }
    currentValue = Math.sqrt(value).toString();
    updateDisplay();
}

// ===== ОПЕРАЦИЯ 10: ОКРУГЛЕНИЕ ВНИЗ (FLOOR) =====
function floorValue() {
    const value = parseFloat(currentValue);
    if (isNaN(value)) {
        alert('Ошибка: введите число');
        return;
    }
    currentValue = Math.floor(value).toString();
    updateDisplay();
}

// ===== ОПЕРАЦИЯ 11: ОКРУГЛЕНИЕ ВВЕРХ (CEIL) =====
function ceilValue() {
    const value = parseFloat(currentValue);
    if (isNaN(value)) {
        alert('Ошибка: введите число');
        return;
    }
    currentValue = Math.ceil(value).toString();
    updateDisplay();
}

// ===== ОПЕРАЦИЯ 12: РАБОТА С ПАМЯТЬЮ =====

// M+ (добавить в память)
function memoryAdd() {
    const value = parseFloat(currentValue);
    if (isNaN(value)) {
        alert('Ошибка: введите число');
        return;
    }
    memory += value;
    alert('Добавлено в память: ' + value + '\nТекущее значение памяти: ' + memory);
}

// MC (очистить память)
function memoryClear() {
    memory = 0;
    alert('Память очищена');
}

// MR (вызвать из памяти)
function memoryRecall() {
    currentValue = memory.toString();
    updateDisplay();
}

// Инициализация
updateDisplay();

console.log('=== Калькулятор v2.0 ===');
console.log('Разработчик 1 (andrew05812): Базовые операции (+, -, ×, ÷, %, sin)');
console.log('Разработчик 2 (BuMcHiKa): Продвинутые функции (cos, степень, корень, округления, память) - ГОТОВО!');