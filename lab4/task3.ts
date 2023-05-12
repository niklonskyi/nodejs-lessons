// Напишіть скрипт, який отримує з командного рядка рядковий параметр -
// шлях до JSON-файла із масивом рядків - посилань, читає та аналізує його вміст.
// Скрипт має створити папку «<JSON_filename>_pages» і для кожного посилання
// із <JSON-файла отримати його HTML-вміст і зберегти цей вміст у окремому файлі в новоствореній папці.
// Приклад JSON-файла (list.json) прикріплений до цього практичного завдання нижче.

import * as fs from "fs";
import * as https from "https";
import * as path from "path";

// функція для отримання шляху до файлу через консоль
function getPathFromConsole(): string {
  const path: string = process.argv[2];

  return path;
}

// функція яка зчитує json файл
// та для кожного елемента викликає калбек функцію
// у нашому випадку елемент = посилання на сторінку
function readJson(path: string, callback: Function) {
  fs.readFile(path, { encoding: "utf-8" }, (err, result) => {
    if (err) {
      throw err;
    }

    const content = JSON.parse(result);

    content.forEach((element: string, index: number) => {
      callback(element, index.toString());
    });
  });
}

// функція що отримуює html зміст сторінки
// та створює файл з цим змістом
function getPageFromLink(link: string, name: string) {
  https
    .get(link, (res) => {
      res.on("data", (d) => {
        createFile(name, d);
      });
    })
    .on("error", (e) => {
      console.error(e);
    });
}

// функція для створення html файлу
function createFile(filename: string, data: string) {
  fs.writeFile(filename + ".html", data, (error) => {
    if (error) throw error;
  });
}

// функція що створює папку з ім'ям folderName
function createFolder(folderName: string): void {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}

function main() {
  // Отримуємо шлях до файла з консолі
  const pathOfFile = getPathFromConsole();

  // Ім'я папки = <JSON_filename>_pages
  const folderName = path.basename(pathOfFile, ".json") + "_pages";

  // Директорія = шлях до файлу + назва нової папки
  const directoryPath = path.join(path.dirname(pathOfFile), folderName);

  // Створюємо папку з ім'ям folderName
  createFolder(folderName);

  // Зчитуємо JSON файл, та створюємо HTML сторінки
  readJson(pathOfFile, (link: string, name: string) => {
    getPageFromLink(link, directoryPath + "/" + name);
  });
}

// для запуску:
// tsc task3.ts
// node task3.js *relative (list.json) or full path*
// example: node task3.js C:\Users\artem\Documents\repos\nodejs-lessons\lab4\list.json

main();
