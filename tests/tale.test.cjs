// import * as kolobok from './node_modules/tale.js';
 import kolobok from '../src/tale.js';
// const kolobok = require('../src/tale.js');
//  import { describe}  from './node_modules/@types/jest/index.d.ts';

describe('kolobok function', () => {
  it ('should return action', () => {
    const result = kolobok('Дедушка');
    expect(result).toBe('Дед меня испек');
  })
}) 