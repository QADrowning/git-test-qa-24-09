import { test, expect } from '@playwright/test'
import { ProjectPageClass } from '../framework/pages'
import { login } from '../framework/actions/login'
import config from '../framework/config/configLoginPage'

test.beforeEach(async ({ page }) => {
  await login(page, config.userName, config.password)
})

test.describe('Project actions', () => {
  test('Create project', async ({ page }) => {
    const projectPage = new ProjectPageClass(page)
    await projectPage.createProject('OtusProject')

    const title = await page.locator('.project-title').textContent()
    expect(title).toEqual('OtusProject')
  })

  test('Add task in project', async ({ page }) => {
    const projectPage = new ProjectPageClass(page)
    await projectPage.createProject('OtusProject')
    await projectPage.addTask('OtusTask')

    const title = await page.locator('.tasktext').textContent()
    expect(title).toEqual('OtusTask')
  })
})
