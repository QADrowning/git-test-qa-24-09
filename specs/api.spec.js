import passfather from 'passfather'
import 'dotenv/config'
import {addMsg} from 'jest-html-reporters/helper'
// import { faker } from '@faker-js/faker'

describe('User/token create', () => {
  it('Login already used', async () => {
    addMsg({message:'Этот тест был пробный'})
    const response = await fetch(`${process.env.BASE_URL}/Account/v1/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'OlgaOtus',
        password: 'Password31!',
      }),
    })
    const data = await response.json()
    expect(response.status).toEqual(406)
    expect(data.message).toBe('User exists!')
  })

  it('Uncorrect password', async () => {
    const response = await fetch(
      'https://bookstore.demoqa.com/Account/v1/User',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: 'OlgaOtus',
          password: 'fake',
        }),
      },
    )
    const data = await response.json()
    expect(response.status).toEqual(400)
    expect(data.message).toContain(
      'Passwords must have at least one non alphanumeric character',
    )
  })

  it('Create user successefull', async () => {
    const name = passfather({
      numbers: false,
      uppercase: true,
      lowercase: true,
      symbols: false,
      length: 5,
    })
    const password = passfather({
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: true,
      length: 15,
    })

    const response = await fetch(
      'https://bookstore.demoqa.com/Account/v1/User',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: name,
          password: password,
        }),
      },
    )
    const data = await response.json()
    expect(response.status).toEqual(201)
    expect(data.username).toBe(name)
  })

  it('Generate token successefull', async () => {
    const response = await fetch(
      'https://bookstore.demoqa.com/Account/v1/GenerateToken',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: 'OlgaOtus',
          password: 'Password31!',
        }),
      },
    )
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.status).toBe('Success')
    expect(data.result).toBe('User authorized successfully.')
    expect(data.token).toBeTruthy()
  })

  it('Generate token failed', async () => {
    const response = await fetch(
      'https://bookstore.demoqa.com/Account/v1/GenerateToken',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: 'Olga',
          password: 'Password31!',
        }),
      },
    )
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.token).toBeNull()
    expect(data.expires).toBeNull()
    expect(data.status).toBe('Failed')
    expect(data.result).toBe('User authorization failed.')
  })
})
