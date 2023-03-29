//  Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
//  console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
function add(num) {
    // Ініціалізуємо суму як початкове значення функції
    let sum = num;

    // Додаємо аргумент до суми та повертаємо функцію
    // Коли наступний елемент undefined повертаємо суму
    function innerAdd(nextNum) {
        if (nextNum !== undefined) {
            sum += nextNum;
            return innerAdd;
        } else {
            return sum;
        }
    }

    // Якщо аргумент лише один, повертаємо sum
    // Якщо аргументів декілька повертаємо функцію innerAdd з цим аргументом
    return function next() {
        if (arguments.length === 0) {
            return sum;
        } else {
            return innerAdd(arguments[0]);
        }
    };
}

console.log(add(2)(5)(7)(1)(6)(5)(11)())


// Задача 2. Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.
function anagram(string1, string2) {
    // Якщо довжина строк різна вони не можуть бути анаграмами
    if (string1.length !== string2.length) return false;

    // Приводимо всі букви до нижнього регістру, розділяємо у array по буквах та сортуємо
    string1 = string1.toLowerCase().split('').sort();
    string2 = string2.toLowerCase().split('').sort();

    // Перевіряємо кожне значення string1 з string2
    // Якщо значення не співпадуть метод повертає false
    return string1.every((val, index) => val === string2[index]);
}

console.log(anagram('Мука', 'кума'))


// Задача 3. Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром.
function deepClone(obj) {
    // Ініціалзуємо об'єкт клона
    const clone = {};

    // Проходимося по об'єкту for in лупом
    for (let i in obj) {

        // Якщо поле об'єкта є об'єктом, але не є null, рекурсивно викликаємо функцію
        if (typeof (obj[i]) === "object" && obj[i] !== null) {
            clone[i] = deepClone(obj[i]);
        }

        // Клонуємо поле
        else clone[i] = obj[i];
    }

    return clone;
}

// Клонуємо об'єкт і перевіряємо що змінні зсилаються на різні об'єкти
const person = {name: 'Arthur', surname: 'Morgan', child: {name: 'Dave', age: 6}};
const person2 = deepClone(person);
person2.name = 'Dutch';
person2.child.age += 2;

console.log(person)
console.log(person2)


// Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю параметрів.
const wrapper = (func) => {
    // Ініціалізуємо об'єкт cache
    const cache = {};

    return (...args) => {
        // Конвертуємо аргументи у JSON строку
        const key = JSON.stringify(args);

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