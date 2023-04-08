// Задача 3. Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром.
function deepClone<Type>(obj: Type): Type {

    // Перевіряємо чи об'єкт є null або не є об'єктом взагалі
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    // Створюємо об'єкт clone методом .create, з прототипом obj
    const clone: Type = Object.create(obj);

    // for луп для проходження по полям об'єкту obj
    for (const key in obj) {
        // Якщо поле присутнє тільки в об'єкті, а не в прототипі об'єкту, реверсійно викликаємо функцію
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }

    // Повертаємо склонований об'єкт
    return clone;
}

class Human {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Parent extends Human{
    child?: Child

    constructor(name: string, age: number, child?: Child) {
        super(name, age);
        if (!!child) {
            this.child = child;
        }
    }
}

class Child extends Human{
}

// Створюємо об'єкти класа Parent і Child
const child1 = new Child('Mike', 6);
const parent1 = new Parent('Rayan', 28, child1);

// Глибоке клонування parent1 у змінну parent2
const parent2 = deepClone(parent1);

// Змінюємо ім'я об'єкту child і вік об'єкту parent2
parent2.child.name = 'Tyler';
parent2.age = 45;

// Переіряємо чи відсилаються змінні на один об'єкт
console.log(parent1 === parent2); // false
console.log(parent1);
console.log(parent2);

// Перевіряємо чи об'єкти є instance одного класу
console.log(parent1 instanceof Parent); // true
console.log(parent2 instanceof Parent); // true