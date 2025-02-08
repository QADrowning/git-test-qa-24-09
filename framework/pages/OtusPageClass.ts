import { Page } from 'playwright-core'
import { BasePageClass } from './BasePageClass'
import config from '../config/configRWA'

export class OtusPageClass extends BasePageClass {
  private emailInput = 'input-email'
  private passwordInput = 'input-password'
  private loginButton = 'btn-submit'

  constructor(page: Page) {
    super(page)
  }

  async navigate() {
    await super.navigeTo(`${config.baseURL}/login`)
  }

  async login(email: string, password: string) {
    await this.page.getByTestId(this.emailInput).fill(email)
    await this.page.getByTestId(this.passwordInput).fill(password)
    await this.page.getByTestId(this.loginButton).click()
  }
}
