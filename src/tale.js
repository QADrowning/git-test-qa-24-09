//import {describe, expect} from '@jest/globals'

export default

function kolobok(name){
  switch(name){
    case 'Дедушка':
      return ("Дед меня испек");
    case 'Заяц':
      return ("Обрел друга");
    case 'Лиса':
      return("Меня съели");
  }  
}

kolobok('Дедушка');

function newYear(magicPerson){
  return `${magicPerson}!${magicPerson}!${magicPerson}!`
}

newYear('Снегурочка');

describe('kolobok function', () => {
  it ('should return action', () => {
    const result = kolobok('Дедушка');
    expect(result).toBe('Дед меня испек');
  })
}) 
