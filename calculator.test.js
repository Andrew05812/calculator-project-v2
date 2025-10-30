// calculator.test.js - Unit-тесты для калькулятора
// Разработчик 1 (andrew05812): Тесты для операций 1-6

const Calculator = require('./calculator.js');

describe('Калькулятор - Базовые операции (andrew05812)', () => {
    let calc;

    // Перед каждым тестом создаём новый экземпляр калькулятора
    beforeEach(() => {
        calc = new Calculator();
    });

    // Тесты инициализации
    describe('Инициализация', () => {
        test('Калькулятор создаётся с начальным значением 0', () => {
            expect(calc.getCurrentValue()).toBe('0');
        });

        test('Память изначально равна 0', () => {
            expect(calc.memoryRecall()).toBe(0);
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 1: СЛОЖЕНИЕ
    describe('Операция 1: Сложение', () => {
        test('Сложение положительных чисел', () => {
            expect(calc.add(5, 3)).toBe(8);
        });

        test('Сложение отрицательных чисел', () => {
            expect(calc.add(-5, -3)).toBe(-8);
        });

        test('Сложение положительного и отрицательного числа', () => {
            expect(calc.add(5, -3)).toBe(2);
        });

        test('Сложение с нулём', () => {
            expect(calc.add(5, 0)).toBe(5);
        });

        test('Сложение дробных чисел', () => {
            expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3);
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 2: ВЫЧИТАНИЕ
    describe('Операция 2: Вычитание', () => {
        test('Вычитание положительных чисел', () => {
            expect(calc.subtract(10, 4)).toBe(6);
        });

        test('Вычитание с отрицательным результатом', () => {
            expect(calc.subtract(3, 5)).toBe(-2);
        });

        test('Вычитание отрицательных чисел', () => {
            expect(calc.subtract(-5, -3)).toBe(-2);
        });

        test('Вычитание нуля', () => {
            expect(calc.subtract(5, 0)).toBe(5);
        });

        test('Вычитание из нуля', () => {
            expect(calc.subtract(0, 5)).toBe(-5);
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 3: УМНОЖЕНИЕ
    describe('Операция 3: Умножение', () => {
        test('Умножение положительных чисел', () => {
            expect(calc.multiply(6, 7)).toBe(42);
        });

        test('Умножение на ноль', () => {
            expect(calc.multiply(5, 0)).toBe(0);
        });

        test('Умножение отрицательных чисел', () => {
            expect(calc.multiply(-3, -4)).toBe(12);
        });

        test('Умножение положительного на отрицательное', () => {
            expect(calc.multiply(5, -3)).toBe(-15);
        });

        test('Умножение дробных чисел', () => {
            expect(calc.multiply(0.5, 0.2)).toBeCloseTo(0.1);
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 4: ДЕЛЕНИЕ
    describe('Операция 4: Деление', () => {
        test('Деление положительных чисел', () => {
            expect(calc.divide(20, 4)).toBe(5);
        });

        test('Деление с дробным результатом', () => {
            expect(calc.divide(10, 3)).toBeCloseTo(3.333, 2);
        });

        test('Деление отрицательных чисел', () => {
            expect(calc.divide(-20, -4)).toBe(5);
        });

        test('Деление положительного на отрицательное', () => {
            expect(calc.divide(20, -4)).toBe(-5);
        });

        test('Деление нуля', () => {
            expect(calc.divide(0, 5)).toBe(0);
        });

        test('Деление на ноль выбрасывает ошибку', () => {
            expect(() => calc.divide(5, 0)).toThrow('Деление на ноль невозможно');
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 5: ОСТАТОК ОТ ДЕЛЕНИЯ
    describe('Операция 5: Остаток от деления (Modulo)', () => {
        test('Остаток от деления положительных чисел', () => {
            expect(calc.modulo(10, 3)).toBe(1);
        });

        test('Остаток равен нулю при делении без остатка', () => {
            expect(calc.modulo(10, 5)).toBe(0);
        });

        test('Остаток от деления отрицательных чисел', () => {
            expect(calc.modulo(-10, 3)).toBe(-1);
        });

        test('Остаток от деления на ноль выбрасывает ошибку', () => {
            expect(() => calc.modulo(5, 0)).toThrow('Деление на ноль невозможно');
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 6: SIN
    describe('Операция 6: Sin (синус в градусах)', () => {
        test('Sin(0) = 0', () => {
            expect(calc.sin(0)).toBeCloseTo(0);
        });

        test('Sin(30) ≈ 0.5', () => {
            expect(calc.sin(30)).toBeCloseTo(0.5);
        });

        test('Sin(90) = 1', () => {
            expect(calc.sin(90)).toBeCloseTo(1);
        });

        test('Sin(180) ≈ 0', () => {
            expect(calc.sin(180)).toBeCloseTo(0);
        });

        test('Sin(270) = -1', () => {
            expect(calc.sin(270)).toBeCloseTo(-1);
        });

        test('Sin отрицательного угла', () => {
            expect(calc.sin(-30)).toBeCloseTo(-0.5);
        });
    });

    // Тесты метода calculate()
    describe('Метод calculate() для операций 1-5', () => {
        test('Calculate с операцией add', () => {
            expect(calc.calculate('add', 5, 3)).toBe(8);
        });

        test('Calculate с операцией subtract', () => {
            expect(calc.calculate('subtract', 10, 4)).toBe(6);
        });

        test('Calculate с операцией multiply', () => {
            expect(calc.calculate('multiply', 6, 7)).toBe(42);
        });

        test('Calculate с операцией divide', () => {
            expect(calc.calculate('divide', 20, 4)).toBe(5);
        });

        test('Calculate с операцией modulo', () => {
            expect(calc.calculate('modulo', 10, 3)).toBe(1);
        });

        test('Calculate с неизвестной операцией выбрасывает ошибку', () => {
            expect(() => calc.calculate('unknown', 5, 3)).toThrow('Неизвестная операция');
        });
    });
});

console.log('Тесты для операций 1-6 готовы (разработчик andrew05812)');