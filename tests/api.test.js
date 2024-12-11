import passfather from 'passfather'
import { addMsg } from 'jest-html-reporters/helper'
import config from '../framework/config/configApiOtus'
import {
  generateToken,
  login,
  user,
} from '../framework/services/apiOtusService'

console.log(config)

describe('User create check', () => {
  it('Login already used', async () => {
    addMsg({ message: 'Этот тест был пробный' })
    const response = await user({
      userName: config.username,
      password: config.password,
    })
    expect(response.status).toEqual(406)
    expect(response.data.message).toBe('User exists!')
  })

  it('Uncorrect password', async () => {
    const response = await user({
      userName: config.username,
      password: config.passwordFake,
    })
    expect(response.status).toEqual(400)
    expect(response.data.message).toContain(
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

    const response = await user({
      userName: name,
      password: password,
    })
    expect(response.status).toEqual(201)
    expect(response.data.username).toBe(name)
  })
})

describe('Token check', () => {
  it('Generate token successefull', async () => {
    const response = await generateToken({
      userName: config.username,
      password: config.password,
    })

    expect(response.status).toEqual(200)
    expect(response.data.status).toBe('Success')
    expect(response.data.result).toBe('User authorized successfully.')
    expect(response.data.token).toBeTruthy()
  })

  it('Generate token failed', async () => {
    const response = await generateToken({
      userName: config.usernameFake,
      password: config.password,
    })
    expect(response.status).toEqual(200)
    expect(response.data.token).toBeNull()
    expect(response.data.expires).toBeNull()
    expect(response.data.status).toBe('Failed')
    expect(response.data.result).toBe('User authorization failed.')
  })
})

describe('Login check', () => {
  it('Login successe', async () => {
    const response = await login({
      userName: config.username,
      password: config.password,
    })
    expect(response.status).toEqual(200)
  })

  it('Login failed userName fake', async () => {
    const response = await login({
      userName: config.usernameFake,
      password: config.password,
    })
    expect(response.status).toEqual(404)
    expect(response.data.message).toBe('User not found!')
  })

  it('Login failed password empty', async () => {
    const response = await login({
      userName: config.username,
      password: '',
    })
    expect(response.status).toEqual(400)
    expect(response.data.message).toBe('UserName and Password required.')
  })
})
