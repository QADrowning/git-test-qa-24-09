import 'dotenv/config'

export default Object.freeze({
  baseURL: process.env.OTUS_BASE_URL ?? 'https://try.vikunja.io/',
  userName: process.env.OTUS_USER_NAME ?? 'demo',
  password: process.env.OTUS_PASSWORD ?? 'demo',
  passwordFake: process.env.OTUS_PASSWORDFAKE ?? '1',
})
