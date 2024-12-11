import config from '../config/configApiPet'
import axios from 'axios'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
})

export const petCreate = async ({ id, name, status }) => {
  const response = await client.post(`/pet`, {
    id,
    name,
    status,
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export const petGet = async ({ id }) => {
  const response = await client.get(`/pet/${id}`, {})

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export const petChange = async ({ id, name, statusNew }) => {
  const response = await client.put(`/pet`, {
    id,
    name,
    statusNew,
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export const petGetInfo = async ({ id }) => {
  const response = await client.post(`/pet/${id}`, {})

  return {
    headers: response.headers,
    status: response.status,    
    data: response.data,
  }
}

export const petDelete = async ({ id }) => {
  const response = await client.delete(`/pet/${id}`, {})

  return {
    headers: response.headers,
    status: response.status,    
    data: response.data,
  }
}