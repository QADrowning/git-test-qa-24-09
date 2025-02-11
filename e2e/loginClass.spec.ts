import { test, expect } from '@playwright/test'
import { LoginPage } from '../framework/pages/LoginPage'
import config from '../framework/config/configLoginPage'

test.describe('Authorization', () => {
  test('Login page visit', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()

    const title = await page.locator('.title').textContent()
    expect(title).toEqual('Login')
    await expect(page.locator('.api-url-info')).toBeVisible()
  })

  test('Create account opportunity exist', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()

    const title = await page.locator('[href^="/register"]').textContent()
    expect(title).toEqual('Create account')
  })

  test('Forgot your password link exist', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()

    const title = await page
      .locator('[href^="/get-password-reset"]')
      .textContent()
    expect(title).toEqual('Forgot your password?')
  })

  test('Eye icon and Show the password message exist', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()

    await expect(page.locator('[data-icon="eye"]')).toBeVisible()
    await page.hover('[data-icon="eye"]')
    await expect(page.locator('[aria-label="Show the password"]')).toBeVisible()
  })

  test('User can can see the entered password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.fillFields(config.userName, config.password)

    await page.locator('[data-icon="eye"]').click()
    await expect(page.locator('[data-icon="eye-slash"]')).toBeVisible()
  })

  test('Hide the password message exist', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.fillFields(config.userName, config.password)

    await page.locator('[data-icon="eye"]').click()
    await page.hover('[data-icon="eye-slash"]')
    await expect(page.locator('[aria-label="Hide the password"]')).toBeVisible()
  })

  test('Checkbox exist', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()

    await expect(page.locator('[type="checkbox"]')).toBeVisible()
  })

  test('Unsuccess authorization with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.login(config.userName, config.passwordFake)

    const title = await page.locator('.message.danger').textContent()
    expect(title).toEqual('Wrong username or password.')
  })

  test('Notification is displayed when password field is empty', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.login(config.userName, '')

    await expect(page.getByText('Please provide a password.')).toBeVisible()
  })

  test('Unsuccess authorization with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.login('', config.password)

    await expect(page.getByText('Please provide a username.')).toBeVisible()
  })

  test('Successfully authorization', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.login(config.userName, config.password)

    const title = await page.locator('.username').textContent()
    expect(title).toEqual('demo')
  })
})
