import config from '../framework/config/configApiPet'
import {
  petCreate,
  petGet,
  petChange,
  petGetInfo,
  petDelete,
} from '../framework/services/apiPetService'

describe('Pet create check', () => {
  const id = config.petId
  const fakeId = config.petFakeId
  const name = config.petName
  const status = config.status
  const statusNew = config.statusNew

  it('Success create', async () => {
    const response = await petCreate({ id, name, status })
    expect(response.status).toEqual(200)
    expect(response.data.id).toBe(id)
    expect(response.data.name).toBe(name)
    expect(response.data.status).toBe(status)
  })

  it('Get pet info', async () => {
    const response = await petGet({ id })
    expect(response.status).toEqual(200)
    expect(response.data.name).toBe(name)
    expect(response.data.status).toBe(status)
  })

  it('Change pet info', async () => {
    const response = await petChange({ id, name, statusNew })
    expect(response.status).toEqual(200)
    expect(response.data.name).toBe(name)
    expect(response.data.status).toBe(undefined)
  })

  it('Change pet info failed', async () => {
    const response = await petGetInfo({ fakeId })
    expect(response.status).toEqual(415)
  })

  it('Delete pet', async () => {
    const response = await petDelete({ fakeId })
    expect(response.status).toEqual(404)
  })
})
