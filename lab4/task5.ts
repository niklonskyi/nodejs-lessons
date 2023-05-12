// Напишіть власну реалізацію класу EventEmitter (Publisher/Subscriber)

// інтерфейс івентів, що типізує властивості як строки, а значення властивостей як масив функцій
interface IEvents {
  [key: string]: Function[];
}

class MyEventEmitter {
  events: IEvents = {};
  constructor() {
    this.events = {};
  }

  // функція приймає назву івента як строку, та колбек для івента як функцію
  // якщо не існує властивості з назвою eventName створюємо її
  // додаємо до масиву функцію що передали
  registerHandler(eventName: string, callback: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // функція приймає назву івента та опціональні аргументи
  // та викликає кожну функцію необхідного івента
  emitEvent(eventName: string, args?: string) {
    const event = this.events[eventName];
    event.forEach((callback) => callback(args));
  }
}

const emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", () =>
  console.log("Обліковий запис користувача оновлено")
);
emitter.emitEvent("userUpdated"); // Обліковий запис користувача оновлено
