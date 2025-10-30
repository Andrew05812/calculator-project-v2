// calculator.js - Логика калькулятора без UI

class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.memory = 0;
    }

    // Сброс калькулятора
    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
    }

    // Установка текущего значения
    setCurrentValue(value) {
        this.currentValue = value.toString();
    }

    // Получение текущего значения
    getCurrentValue() {
        return this.currentValue;
    }

    // ОПЕРАЦИЯ 1: Сложение
    add(a, b) {
        return a + b;
    }

    // ОПЕРАЦИЯ 2: Вычитание
    subtract(a, b) {
        return a - b;
    }

    // ОПЕРАЦИЯ 3: Умножение
    multiply(a, b) {
        return a * b;
    }

    // ОПЕРАЦИЯ 4: Деление
    divide(a, b) {
        if (b === 0) {
            throw new Error('Деление на ноль невозможно');
        }
        return a / b;
    }

    // ОПЕРАЦИЯ 5: Остаток от деления
    modulo(a, b) {
        if (b === 0) {
            throw new Error('Деление на ноль невозможно');
        }
        return a % b;
    }

    // ОПЕРАЦИЯ 6: Sin (в градусах)
    sin(degrees) {
        const radians = degrees * (Math.PI / 180);
        return Math.sin(radians);
    }

    // ОПЕРАЦИЯ 7: Cos (в градусах)
    cos(degrees) {
        const radians = degrees * (Math.PI / 180);
        return Math.cos(radians);
    }

    // ОПЕРАЦИЯ 8: Возведение в степень
    power(base, exponent) {
        return Math.pow(base, exponent);
    }

    // ОПЕРАЦИЯ 9: Квадратный корень
    sqrt(value) {
        if (value < 0) {
            throw new Error('Невозможно извлечь корень из отрицательного числа');
        }
        return Math.sqrt(value);
    }

    // ОПЕРАЦИЯ 10: Округление вниз
    floor(value) {
        return Math.floor(value);
    }

    // ОПЕРАЦИЯ 11: Округление вверх
    ceil(value) {
        return Math.ceil(value);
    }

    // ОПЕРАЦИЯ 12: Работа с памятью
    memoryAdd(value) {
        this.memory += value;
        return this.memory;
    }

    memoryClear() {
        this.memory = 0;
        return this.memory;
    }

    memoryRecall() {
        return this.memory;
    }

    // Выполнение операции
    calculate(operation, a, b) {
        switch(operation) {
            case 'add':
                return this.add(a, b);
            case 'subtract':
                return this.subtract(a, b);
            case 'multiply':
                return this.multiply(a, b);
            case 'divide':
                return this.divide(a, b);
            case 'modulo':
                return this.modulo(a, b);
            case 'power':
                return this.power(a, b);
            default:
                throw new Error('Неизвестная операция');
        }
    }
}

// Экспорт для Node.js (для тестов)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}