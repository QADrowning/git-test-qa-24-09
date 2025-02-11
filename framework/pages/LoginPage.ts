import type { Page } from 'playwright-core'
import config from '../config/configLoginPage'

export class LoginPage {
  private page: Page
  private static userName: string = '#username'
  private static password: string = '#password'

  constructor(page: Page) {
    this.page = page
  }

  async navigate() {
    await this.page.goto(`${config.baseURL}/login`)
  }

  async navigateAndLogin(userName: string, password: string) {
    await this.page.goto(`${config.baseURL}/login`)
    await this.page.locator(LoginPage.userName).fill(userName)
    await this.page.locator(LoginPage.password).fill(password)
    await this.page.getByRole('button', { name: /Login/ }).click()
  }

  async login(userName: string, password: string) {
    await this.page.locator(LoginPage.userName).fill(userName)
    await this.page.locator(LoginPage.password).fill(password)
    await this.page.getByRole('button', { name: /Login/ }).click()
  }

  async fillFields(userName: string, password: string) {
    await this.page.locator(LoginPage.userName).fill(userName)
    await this.page.locator(LoginPage.password).fill(password)
  }
}
