import { kolobok } from '../src/tale.js'

describe('kolobok function', () => {
  const data = [
    {
      name: 'Дедушка',
      expected: 'Дед меня испек',
    },
    {
      name: 'Заяц',
      expected: 'Обрел друга',
    },
    {
      name: 'Лиса',
      expected: 'Меня съели',
    },
  ]

  test.each(data)('should return valid action', ({ name, expected }) => {
    expect(kolobok(name)).toBe(expected)
  })

  it('should return error', () => {
    expect(() => {
      kolobok('Кощей')
    }).toThrow('Это из другой сказки!')
  })
})
