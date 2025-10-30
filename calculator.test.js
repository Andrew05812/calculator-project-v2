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


// ============================================
// ТЕСТЫ ВТОРОГО РАЗРАБОТЧИКА (BuMcHiKa)
// Операции 7-12
// ============================================

describe('Калькулятор - Продвинутые операции (BuMcHiKa)', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    // ТЕСТЫ ОПЕРАЦИИ 7: COS
    describe('Операция 7: Cos (косинус в градусах)', () => {
        test('Cos(0) = 1', () => {
            expect(calc.cos(0)).toBeCloseTo(1);
        });

        test('Cos(60) ≈ 0.5', () => {
            expect(calc.cos(60)).toBeCloseTo(0.5);
        });

        test('Cos(90) ≈ 0', () => {
            expect(calc.cos(90)).toBeCloseTo(0);
        });

        test('Cos(180) = -1', () => {
            expect(calc.cos(180)).toBeCloseTo(-1);
        });

        test('Cos(270) ≈ 0', () => {
            expect(calc.cos(270)).toBeCloseTo(0);
        });

        test('Cos(360) = 1', () => {
            expect(calc.cos(360)).toBeCloseTo(1);
        });

        test('Cos отрицательного угла', () => {
            expect(calc.cos(-60)).toBeCloseTo(0.5);
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 8: ВОЗВЕДЕНИЕ В СТЕПЕНЬ
    describe('Операция 8: Возведение в степень', () => {
        test('Возведение в положительную степень', () => {
            expect(calc.power(2, 3)).toBe(8);
        });

        test('Возведение в степень 0', () => {
            expect(calc.power(5, 0)).toBe(1);
        });

        test('Возведение в степень 1', () => {
            expect(calc.power(5, 1)).toBe(5);
        });

        test('Возведение в отрицательную степень', () => {
            expect(calc.power(2, -2)).toBeCloseTo(0.25);
        });

        test('Возведение отрицательного числа в чётную степень', () => {
            expect(calc.power(-2, 2)).toBe(4);
        });

        test('Возведение отрицательного числа в нечётную степень', () => {
            expect(calc.power(-2, 3)).toBe(-8);
        });

        test('Возведение дробного числа в степень', () => {
            expect(calc.power(0.5, 2)).toBeCloseTo(0.25);
        });

        test('Возведение числа в дробную степень (квадратный корень)', () => {
            expect(calc.power(4, 0.5)).toBeCloseTo(2);
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 9: КВАДРАТНЫЙ КОРЕНЬ
    describe('Операция 9: Квадратный корень', () => {
        test('Корень из положительного числа', () => {
            expect(calc.sqrt(16)).toBe(4);
        });

        test('Корень из 0', () => {
            expect(calc.sqrt(0)).toBe(0);
        });

        test('Корень из 1', () => {
            expect(calc.sqrt(1)).toBe(1);
        });

        test('Корень из дробного числа', () => {
            expect(calc.sqrt(0.25)).toBeCloseTo(0.5);
        });

        test('Корень из большого числа', () => {
            expect(calc.sqrt(144)).toBe(12);
        });

test('Корень из отрицательного числа выбрасывает ошибку', () => {
            expect(() => calc.sqrt(-4)).toThrow('Невозможно извлечь корень из отрицательного числа');
        });

        test('Корень из числа с иррациональным результатом', () => {
            expect(calc.sqrt(2)).toBeCloseTo(1.414, 2);
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 10: ОКРУГЛЕНИЕ ВНИЗ (FLOOR)
    describe('Операция 10: Округление вниз (floor)', () => {
        test('Округление положительного дробного числа', () => {
            expect(calc.floor(3.7)).toBe(3);
        });

        test('Округление отрицательного дробного числа', () => {
            expect(calc.floor(-3.7)).toBe(-4);
        });

        test('Округление целого числа', () => {
            expect(calc.floor(5)).toBe(5);
        });

        test('Округление числа близкого к целому', () => {
            expect(calc.floor(3.999)).toBe(3);
        });

        test('Округление нуля', () => {
            expect(calc.floor(0)).toBe(0);
        });

        test('Округление очень малого положительного числа', () => {
            expect(calc.floor(0.001)).toBe(0);
        });

        test('Округление очень малого отрицательного числа', () => {
            expect(calc.floor(-0.001)).toBe(-1);
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 11: ОКРУГЛЕНИЕ ВВЕРХ (CEIL)
    describe('Операция 11: Округление вверх (ceil)', () => {
        test('Округление положительного дробного числа', () => {
            expect(calc.ceil(3.2)).toBe(4);
        });

        test('Округление отрицательного дробного числа', () => {
            expect(calc.ceil(-3.2)).toBe(-3);
        });

        test('Округление целого числа', () => {
            expect(calc.ceil(5)).toBe(5);
        });

        test('Округление числа близкого к целому', () => {
            expect(calc.ceil(3.001)).toBe(4);
        });

        test('Округление нуля', () => {
            expect(calc.ceil(0)).toBe(0);
        });

        test('Округление очень малого положительного числа', () => {
            expect(calc.ceil(0.001)).toBe(1);
        });

        test('Округление очень малого отрицательного числа', () => {
            expect(calc.ceil(-0.001)).toBeCloseTo(0);
        });
    });

    // ТЕСТЫ ОПЕРАЦИИ 12: РАБОТА С ПАМЯТЬЮ
    describe('Операция 12: Работа с памятью', () => {
        test('Добавление положительного числа в память', () => {
            expect(calc.memoryAdd(5)).toBe(5);
        });

        test('Добавление нескольких чисел в память', () => {
            calc.memoryAdd(5);
            calc.memoryAdd(3);
            expect(calc.memoryRecall()).toBe(8);
        });

        test('Добавление отрицательного числа в память', () => {
            calc.memoryAdd(10);
            calc.memoryAdd(-3);
            expect(calc.memoryRecall()).toBe(7);
        });

        test('Очистка памяти', () => {
            calc.memoryAdd(5);
            calc.memoryClear();
            expect(calc.memoryRecall()).toBe(0);
        });

        test('Вызов значения из пустой памяти', () => {
            expect(calc.memoryRecall()).toBe(0);
        });

        test('Добавление нуля в память', () => {
            calc.memoryAdd(5);
            calc.memoryAdd(0);
            expect(calc.memoryRecall()).toBe(5);
        });

        test('Последовательные операции с памятью', () => {
            calc.memoryAdd(10);
            expect(calc.memoryRecall()).toBe(10);
            calc.memoryAdd(5);
            expect(calc.memoryRecall()).toBe(15);
            calc.memoryClear();
            expect(calc.memoryRecall()).toBe(0);
        });

        test('Добавление дробных чисел в память', () => {
            calc.memoryAdd(0.1);
            calc.memoryAdd(0.2);
            expect(calc.memoryRecall()).toBeCloseTo(0.3);
        });
    });

    // Тесты метода calculate() для операции power
    describe('Метод calculate() для операции power', () => {
        test('Calculate с операцией power', () => {
            expect(calc.calculate('power', 2, 3)).toBe(8);
        });

        test('Calculate power с отрицательной степенью', () => {
            expect(calc.calculate('power', 2, -2)).toBeCloseTo(0.25);
        });
    });

    // Интеграционные тесты для нескольких операций
    describe('Интеграционные тесты (комбинации операций)', () => {
        test('Сложение результата корня', () => {
            const sqrtResult = calc.sqrt(16);
            expect(calc.add(sqrtResult, 2)).toBe(6);
        });

        test('Возведение в степень и округление', () => {
            const powerResult = calc.power(2.5, 2);
            expect(calc.floor(powerResult)).toBe(6);
        });

        test('Косинус и умножение', () => {
            const cosResult = calc.cos(60);
            const multiplyResult = calc.multiply(cosResult, 2);
            expect(multiplyResult).toBeCloseTo(1);
        });

        test('Работа с памятью после вычислений', () => {
            const result1 = calc.add(5, 3);
            calc.memoryAdd(result1);
            const result2 = calc.multiply(2, 3);
            calc.memoryAdd(result2);
            expect(calc.memoryRecall()).toBe(14);
        });
    });
});

console.log('Тесты для операций 7-12 готовы (разработчик BuMcHiKa)');

console.log('Тесты для операций 1-6 готовы (разработчик andrew05812)');