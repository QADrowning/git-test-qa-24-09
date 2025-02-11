import { Page } from 'playwright-core'
import { LoginPage } from '../pages/LoginPage'
import config from '../config/configLoginPage'

export function login(page: Page) {
  const loginPage = new LoginPage(page)

  return ({ email, password }: { email: string; password: string }) => {
    return loginPage.navigateAndLogin(email, password)
  }
}

export function loginUser(page: Page) {
  return login(page)({ email: config.userName, password: config.password })
}
