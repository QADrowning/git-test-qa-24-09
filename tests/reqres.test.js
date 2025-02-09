import config from '../framework/config/configReqResApi'
import { faker } from '@faker-js/faker'
import {
  userRegistry,
  itemCreate,
  itemGet,
  itemDelete,
} from '../framework/services/apiReqResService'

describe('User create check', () => {
  const name = faker.internet.email()
  const email = faker.internet.email()
  const password = config.password
  const fakeEmail = config.emailFake
  const passwordEmpty = ' '

  it('Success create', async () => {
    const response = await userRegistry({ name, email, password })
    console.log(response)
    expect(response.status).toEqual(200)
    expect(response.data.name).toBe(name)
    expect(response.data.email).toBe(email)
  })

  it('Missing email or username message', async () => {
    const response = await userRegistry({ name, fakeEmail, password })
    expect(response.status).toEqual(200)
    console.log(response)
    expect(response.data.message).toBe('Параметр email является обязательным!')
  })

  it('Password empty', async () => {
    const response = await userRegistry({ name, email, passwordEmpty })
    expect(response.status).toEqual(200)
    console.log(response)
    expect(response.data.message).toBe(
      'Параметр password является обязательным!',
    )
  })

  describe('Item create/delete check', () => {
    const name = 'Платье женское с запахом'
    const section = 'Платья'
    const description = 'Модное платье из новой коллекции!'

    it('Success item create', async () => {
      const response = await itemCreate({ name, section, description })
      console.log(response)
      expect(response.status).toEqual(200)
      expect(response.data.result.id).toBeDefined()
      expect(response.data.status).toBe('ok')
      expect(response.data.result.name).toBe(name)
      expect(response.data.result.section).toBe(section)
    })

    it('Item create failed of description', async () => {
      const response = await itemCreate({ name, section })
      expect(response.status).toEqual(200)
      expect(response.data.status).toBe('error')
      expect(response.data.message).toBe('Описание товара не заполнено!')
    })

    it('Item create failed of section', async () => {
      const response = await itemCreate({ name })
      expect(response.status).toEqual(200)
      expect(response.data.status).toBe('error')
      expect(response.data.message).toBe('Категория не найдена!')
    })

    it('Get item info', async () => {
      const response = await itemCreate({ name, section, description })
      console.log(response)
      const id = response.data.result.id
      console.log(id)
      const responseSec = await itemGet({ id })
      console.log(responseSec)
      expect(responseSec.status).toEqual(200)
      expect(responseSec.data.result.id).toBe(id)
      expect(responseSec.data.result.name).toBe(name)
      expect(responseSec.data.result.section).toBe(section)
    })

    it('Unsuccesse get item info', async () => {
      const response = await itemGet({})
      expect(response.status).toEqual(200)
      expect(response.data.message).toBe('Поле ID товара  не заполнено')
    })

    it('Succese delete item', async () => {
      const response = await itemCreate({ name, section, description })
      const id = response.data.result.id
      const responseSec = await itemDelete({ id })
      expect(responseSec.status).toEqual(200)
      expect(responseSec.data.status).toBe('ok')
      expect(responseSec.data.result).toBe(`Товар с ID ${id} успешно удален`)
    })

    it('Unsuccesse delete item', async () => {
      const response = await itemDelete({})
      expect(response.status).toEqual(200)
      expect(response.data.message).toBe('Поле ID товара  не заполнено')
    })
  })
})
