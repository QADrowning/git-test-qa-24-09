//import {describe, expect} from '@jest/globals'

export default

function kolobok(name){
  switch(name){
    case 'Дедушка':
      return ("Дед меня испек")
    case 'Заяц':
      return ("Обрел друга")
    case 'Лиса':
      return("Меня съели")
    default: 
      throw new Error('Это из другой сказки!')
  }  
}

kolobok('Дедушка');

function newYear(magicPerson){
  return `${magicPerson}!${magicPerson}!${magicPerson}!`
}

newYear('Снегурочка');
