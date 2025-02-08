import type { Page } from 'playwright-core'
import config from '../config/configLoginPage'

export class LoginPageClass {
  private page: Page
  private static userName: string = '#username'
  private static password: string = '#password'

  constructor(page: Page) {
    this.page = page
  }

  async navigate() {
    await this.page.goto(`${config.baseURL}/login`)
  }

  async login(userName: string, password: string) {
    await this.page.locator(LoginPageClass.userName).fill(userName)
    await this.page.locator(LoginPageClass.password).fill(password)
    await this.page.getByRole('button', { name: /Login/ }).click()
  }

  async fillFields(userName: string, password: string) {
    await this.page.locator(LoginPageClass.userName).fill(userName)
    await this.page.locator(LoginPageClass.password).fill(password)
  }
}
