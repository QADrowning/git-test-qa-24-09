import { Page } from 'playwright-core'
import { OtusPage } from '../pages/OtusPage'
import config from '../config/configRWA'

export function login(page: Page) {
  const loginPage = OtusPage({ page })

  return ({ email, password }: { email: string; password: string }) => {
    return loginPage.login({ email, password })
  }
}

export function loginUser(page: Page) {
  return login(page)({ email: config.email, password: config.password })
}
