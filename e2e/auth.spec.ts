import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { AuthPage } from '../framework/pages/'
import { OtusPage } from '../framework/pages/OtusPage'
import configRWA from '../framework/config/configRWA'

test('Создание нового юзера', async ({ page }) => {
  const authPage = AuthPage({ page })

  await authPage.visit()
  await authPage.fillUsername(faker.person.fullName())
  await authPage.fillEmail(faker.internet.email())
  await authPage.fillPassword('re@l_passw0rd')

  await authPage.submit()

  await expect(page).toHaveURL(`${configRWA.baseURL}?feed=feed`)
})

test('Успешная авторизация', async ({ page }) => {
  const loginPage = OtusPage({ page })

  await loginPage.visit()

  await loginPage.fillEmail(configRWA.email)
  await loginPage.fillPassword(configRWA.password)
  await loginPage.submit()

  await expect(page).toHaveURL(`${configRWA.baseURL}?feed=feed`)

  await expect(page.getByText('A place to share your')).toBeVisible()
  await expect(page.getByRole('link', { name: 'test test' })).toBeVisible()
})

test('Несуществующий пользователь, не может зайти в систему', async ({
  page,
}) => {
  const loginPage = OtusPage({ page })

  await loginPage.visit()

  await loginPage.fillEmail('undefined@mail.ru')
  await loginPage.fillPassword('P@ssw0rd')
  await loginPage.submit()

  await expect(page).toHaveURL(
    `${configRWA.baseURL}login/error?error=CredentialsSignin&provider=credentials`,
  )

  await expect(page.getByText('This page could not be found.')).toBeVisible()
})
