import { nameIsValid, fullTrim, getTotal } from '../src/app.js';

describe('nameIsValid function', () => { 

  it('name is correct', () => {
    expect(() => {
      nameIsValid('Kostya')
    }).toBeTruthy()
  })

  it('name is not in latin', () => {
    const result = nameIsValid('дедушка')
    expect(result).toEqual(false)
  })

  it('name is not in correct length', () => {
    const result = nameIsValid('д')
    expect(result).toEqual(false)
  })
}) 

describe('fullTrim function', () => {
  const data = [
    {
      text: 'Д има ',
      expected: 'Дима'
    },
    {
      text: ' Непонятно',
      expected: 'Непонятно'
    },
    {
      text: '1359 546',
      expected: '1359546'
    }
  ]

  test.each(data)('should return string without trim', 
  ({text,expected}) => {
    expect(fullTrim(text)).toBe(expected)
  })

  it('no trim = no action', () => {
    expect(fullTrim('Привет')).toBe('Привет'); 
  });

  test.failing('wrong type', () => {
    expect(fullTrim(123)).toBe('Привет'); 
  });
})

describe('getTotal function' , () => {
  const data_positive= [
    {
      items: [{quantity: 1, name: 'товар1', price: 10}],
      discount: 5,
      expected: 9.5
    },
    {
      items: [{quantity: 5, name: 'товар2', price: 100}],
      discount: 10,
      expected: 450
    },
    {
      items: [{quantity: 10, name: 'товар3', price: 1000}],
      discount: 50,
      expected: 5000
    },
  ]

  const data_negative = [
    {
      items: [{quantity: 1, name: 'товар1', price: 10}],
      discount: -1
    },
    {
      items: [{quantity: 5, name: 'товар2', price: 100}],
      discount: 100
    },
    {
      items: [{quantity: 10, name: 'товар3', price: 1000}],
      discount: 1050
    },
  ]

  test.each(data_positive)('valid count', 
  ({items,discount,expected}) => {    
  expect(getTotal(items,discount)).toBe(expected)
  })
  
  test.each(data_negative)('should return discount warning', 
  ({items,discount}) =>{
    expect(() => {
      getTotal(items,discount)
    }).toThrow('Процент скидки должен быть от 0 до 99')
  })

  it('should return number error', () => {
    const discount = 'строка'
    const items = [5,'товар2', 100]
    expect(() => {
      getTotal(items,discount)
    }).toThrow('Скидка должна быть число')
  })
})