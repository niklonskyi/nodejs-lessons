// Задача 2. Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.
function anagram(string1: string, string2: string): boolean {
    // Якщо довжина строк різна вони не можуть бути анаграмами
    if (string1.length !== string2.length) return false;

    // Приводимо всі букви до нижнього регістру
    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();

    // Розділяємо строки у масиви та сортуємо
    let characterArray1: string[] = string1.split('').sort();
    let characterArray2: string[] = string2.split('').sort();

    // Перевіряємо кожне значення string1 з string2
    // Якщо значення не співпадуть метод повертає false
    return characterArray1.every((val: string, index: number) => val === characterArray2[index]);
}

console.log(anagram('Мука', 'кума'))