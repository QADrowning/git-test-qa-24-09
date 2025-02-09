import config from '../config/configReqResApi'
import axios from 'axios'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
})

const clientSec = axios.create({
  baseURL: config.baseTwoURL,
  validateStatus: () => true,
})

export const userRegistry = async ({ email, name, password }) => {
  const response = await client.post('/doregister', {
    email,
    name,
    password,
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export const itemCreate = async ({ name, section, description }) => {
  const response = await clientSec.post(`/create`, {
    name,
    section,
    description,
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export const itemGet = async ({ id }) => {
  const response = await clientSec.get(`/get?id=${id}`, {
    id,
  })
  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export const itemDelete = async ({ id }) => {
  const response = await clientSec.delete(`/delete?id=${id}`, {
    id,
  })
  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}
