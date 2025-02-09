import type { Page } from 'playwright-core'
import config from '../config/configRWA'

export function AuthPage({ page }: { page: Page }) {
  const visit = async () => {
    await page.goto(`${config.baseURL}/register`)
  }

  const fillUsername = async (username: string) => {
    await page.getByTestId('input-username').fill(username)
  }

  const fillEmail = async (email: string) => {
    await page.getByTestId('input-email').fill(email)
  }

  const fillPassword = async (password: string) => {
    await page.getByTestId('input-password').fill(password)
  }

  const submit = async () => {
    await page.getByTestId('btn-submit').click()
  }

  return {
    visit,
    fillUsername,
    fillEmail,
    fillPassword,
    submit,
  }
}
