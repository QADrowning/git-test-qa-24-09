import 'dotenv/config'

export default Object.freeze({
  baseURL:
    process.env.TEST_RWA_BASE_URL ?? 'https://rwa-194.87.102.103.sslip.io/',
  username: process.env.TEST_RWA_USERNAME ?? 'test',
  email: process.env.TEST_RWA_EMAIL ?? 'test@mail.ru',
  password: process.env.TEST_RWA_PASSWORD ?? 'P@ssw0rd',
})
