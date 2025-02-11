import { Page } from 'playwright-core'
import { LoginPage } from '../pages/LoginPage'

export function login(page: Page, email, password) {
  const loginPage = new LoginPage(page)
  return loginPage.navigateAndLogin(email, password)
}
