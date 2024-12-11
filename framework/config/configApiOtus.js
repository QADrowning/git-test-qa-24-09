import 'dotenv/config'

export default Object.freeze({
  baseURL: process.env.TEST_BOOKSTORE_API_URL ?? 'https://bookstore.demoqa.com',
  username: process.env.TEST_BOOKSTORE_USERNAME ?? 'OlgaOtus',
  password: process.env.TEST_BOOKSTORE_PASSWORD ?? 'Password31!',
  usernameFake: process.env.TEST_BOOKSTORE_USERNAME_FAKE ?? 'Olga',
  passwordFake: process.env.TEST_BOOKSTORE_PASSWORD_FALE ?? 'fake',
})
