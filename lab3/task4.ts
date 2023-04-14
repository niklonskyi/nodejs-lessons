// Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю параметрів.
const wrapper = (func: Function): Function => {
    // Ініціалізуємо об'єкт cache
    const cache: object = {};

    return (...args: number[]): string => {
        // Конвертуємо аргументи у JSON строку
        const key: string = JSON.stringify(args);

        // Якщо об'єкт cache має поле key то повертаємо значення цього поля з об'єкту cache
        if (cache.hasOwnProperty(key)) {
            return (`${key} from cache = ${cache[key]}`);
        }

        // Якщо cache не має поля key, викликаємо callback функцію з переданними аргументами
        const result = func(...args);

        // Записуемо результат до об'єкту cache
        cache[key] = result;
        return (`${key} calculated = ${result}`);
    };
};

const calc = (a, b, c) => a+b+c;

const cachedCalc = wrapper(calc);
console.log(cachedCalc(2,2,3)); // 7 calculated
console.log(cachedCalc(5,8,1)); // 14 calculated
console.log(cachedCalc(2,2,3));