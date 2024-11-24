// import { strict as assert } from "node:assert";
// import assert from "node:assert/strict";

// function sum(a, b) {
//   return a - b;
// }

// console.log(sum(3, 7));

function kolobok(name) {
  switch (name) {
    case 'Дедушка':
      return "Дед меня испек";
    case 'Заяц':
      return "Обрел друга";
    case 'Лиса':
      return "Меня съели";
  }
}

kolobok('Дедушка');

function newYear(magicPerson) {
  return `${magicPerson}!${magicPerson}!${magicPerson}!`;
}

newYear('Снегурочка');