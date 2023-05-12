// Напишіть скрипт, який отримує з командного рядка числовий параметр – частоту в секундах.
// Скрипт має виводити на кожному тику (визначеному частотою) наступну системну інформацію

// бібліотека systeminformation
import * as si from "../node_modules/systeminformation/lib/index";

// отримуємо константу frequency як аргумент з консолі
const frequency = Number(process.argv[2]);

// створюємо об'єкт інтервалу, якому передаємо асинхронну функцію
// задаємо змінні за допомогою деструктурізації
// та методу Promise.all який поверне значення, коли всі передані проміси будуть виконані
let intervalObj: NodeJS.Timer = setInterval(async () => {
  const [platform, users, cpu, cpuTemperature, graphics, memory, battery] =
    await Promise.all([
      (await si.osInfo()).platform,
      si.users(),
      si.cpu(),
      (await si.cpuTemperature()).main,
      si.graphics(),
      si.mem(),
      si.battery(),
    ]);

  console.log(`Платформа: ${platform}`);

  console.log(`Користувач: ${users[0].user}`);

  console.log(`Розробник CPU: ${cpu.manufacturer}`);
  console.log(`Бренд CPU: ${cpu.brand}`);
  console.log(`Температура CPU: ${cpuTemperature}`);

  for (let i = 0; i < graphics.controllers.length; i++) {
    console.log(
      `Графічний контролер: ${graphics.controllers[i].vendor} ${graphics.controllers[i].model}`
    );
  }

  console.log(
    `Загальна кількість пам'яті: ${memory.total / Math.pow(1024, 3)} Gb`
  );
  console.log(
    `Використана кількість пам'яті: ${memory.used / Math.pow(1024, 3)} Gb`
  );
  console.log(
    `Вільна кількість пам'яті: ${memory.free / Math.pow(1024, 3)} Gb`
  );

  console.log(`Батарея заряджається: ${battery.isCharging}`);
  console.log(`Процент батареї: ${battery.percent}`);
  console.log(`Часу залишилося: ${battery.timeRemaining}`);

  console.log("-----------------------------------------------");
}, frequency);

// таймаут на виключення інтервалу через 6 итерацій
setTimeout(() => {
  clearInterval(intervalObj);
}, frequency * 6);
