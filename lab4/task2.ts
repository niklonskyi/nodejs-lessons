export {};

// Напишіть функцію, яка приймає будь-який тип масиву та правило для видалення елементів масиву.
// Функція змінює переданий масив, а усі видалені елементи функція повертає окремим масивом такого ж типу.
// Усі типи мають застосовуватися автоматично (функція шаблону).

// функція приймає два аргументи: array дженерік типу Т,
// і колбек функцію яка приймає аргумент типу Т та повертає булеве значення
function arrayChangeDelete<T>(array: T[], callback: (item: T) => boolean): T[] {
  // результат array типу Т
  const result: T[] = [];

  // проходимось for лупом по елементам масиву
  for (let i = 0; i < array.length; i++) {
    // якщо колбек повертає true, видаляємо елемент з початкового array та добавляємо його до result
    if (callback(array[i])) {
      result.push(...array.splice(i, 1));
    }
  }

  // повертаємо result
  return result;
}

const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

console.log(array); // [1, 3, 7, 9]
console.log(deletedElements); // [2, 6]
