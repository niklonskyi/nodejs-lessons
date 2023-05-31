// 1. Напишіть функцію, яка приймає будь-який тип масиву та асинхронний колбек, який викликається для кожного елемента масиву послідовно. 
// Результатом виклику має бути масив результатів колбеку. Усі типи мають застосовуватися автоматично (функція шаблону).

// функція викликає колбек для кожного елменту масиву та повертає масив промісів
async function runSequent<T, R>(
    array: T[],
    callback: (item: T, index: number) => Promise<R>
  ): Promise<R[]> {
    const results: Array<R> = [];
    for (let i = 0; i < array.length; i++) {
      await callback(array[i], i).then((data) => results.push(data));
    }
    return results;
  }
  
async function main() {
  const array: Array<string> = ["one", "two", "three"];
  const results = await runSequent(array, (item, index) =>
      Promise.resolve({
          item,
          index,
      })
  );
  console.log(results);
}

main();
