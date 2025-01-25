import type { Page } from 'playwright-core'
import config from '../config/configLoginPage'

export function LoginPage({ page }: { page: Page }) {
  const selectors = {
    userName: '#username',
    password: '#password',
    loginButton: '//button[text()="Login"]',
  }

  const visit = async () => {
    await page.goto(`${config.baseURL}/login`)
  }

  const fillUserName = async (userName: string) => {
    await page.locator(selectors.userName).fill(userName)
  }

  const fillPassword = async (password: string) => {
    await page.locator(selectors.password).fill(password)
  }

  const submit = async () => {
    await page.locator(selectors.loginButton).click()
  }

  const login = async (userName, password) => {
    await visit()
    await fillUserName(userName)
    await fillPassword(password)
    await submit()
  }

  return {
    visit,
    fillUserName,
    fillPassword,
    submit,
    login,
  }
}
