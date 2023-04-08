//  Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
//  console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37

function add(num: number): Function {
    // Ініціалізуємо суму як початкове значення функції
    let sum: number = num;

    // Додаємо аргумент до суми та повертаємо функцію
    // Коли наступний елемент undefined повертаємо суму
    function innerAdd(nextNum: number): number | Function {
        if (nextNum !== undefined) {
            sum += nextNum;
            return innerAdd;
        } else {
            return sum;
        }
    }

    // Якщо аргумент лише один, повертаємо sum
    // Якщо аргументів декілька повертаємо функцію innerAdd з цим аргументом
    return function next(): number | Function {
        if (arguments.length === 0) {
            return sum;
        } else {
            return innerAdd(arguments[0]);
        }
    };
}

console.log(add(2)(5)(7)(1)(6)(5)(11)())