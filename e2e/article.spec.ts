import { test, expect } from '@playwright/test'
import { EditorPage } from '../framework/pages/EditorPage'
import { loginUser } from '../framework/actions/login'
import configRWA from '../framework/config/configRWA'

test.beforeEach(async ({ page }) => {
  await loginUser(page)
})

test('Создание страницы', async ({ page }) => {
  const editorPage = EditorPage({ page })

  // HeaderElement
  await page.getByRole('link', { name: 'New Post' }).click()

  await editorPage.fillTitle('article title')
  await editorPage.fillAbout('about article')
  await editorPage.fillContent('article content')
  await editorPage.addTags(['e2e'])
  await editorPage.publish()

  // ArticlePage
  await expect(page.getByRole('heading')).toContainText('article title')
  await expect(
    page.getByRole('button', { name: 'Delete Article' }).nth(1),
  ).toBeVisible()
})

test('Обновление страницы', async ({ page }) => {
  const editorPage = EditorPage({ page })

  // ArticlePage
  await page.goto(`${configRWA.baseURL}/article/e2e-update-kak-testirovat`)
  await page.getByRole('button', { name: 'Edit Article' }).first().click()

  // EditorPage
  await editorPage.isOpen('e2e-update-kak-testirovat')
  await editorPage.fillContent('[E2E] [Update] Как тестировать EDIT')
  await editorPage.publish()

  // ArticlePage
  await expect(
    page.getByText('[E2E] [Update] Как тестировать EDIT'),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Edit Article' }).first().click()

  // EditorPage
  await editorPage.isOpen('e2e-update-kak-testirovat')
  await editorPage.fillContent('[E2E] [Update] Как тестировать UPDATED')
  await editorPage.publish()

  // ArticlePage
  await page.waitForURL(`${configRWA.baseURL}article/e2e-update-kak-testirovat`)
  // этого тут тоже не должно быть, но страница в кеше
  await page.reload()

  // ArticlePage
  await expect(
    page.getByText('[E2E] [Update] Как тестировать UPDATED'),
  ).toBeVisible()
})

test('Удаление страницы', async ({ page }) => {
  const editorPage = EditorPage({ page })

  // EditorPage
  // создаём новую
  await page.getByRole('link', { name: 'New Post' }).click()

  await editorPage.fillTitle('Article for delete')
  await editorPage.fillContent(
    'Эта статья должна быть удалена! Такая вот судьба',
  )
  await editorPage.addTags(['E2E'])
  const responseCreatePromise = page.waitForResponse(request => {
    return (
      request.url().includes('/api/articles') &&
      request.request().method() === 'POST'
    )
  })
  await editorPage.publish()
  await responseCreatePromise

  // ArticlePage
  // удаляем
  const responsePromise = page.waitForResponse(request => {
    return (
      request.url().includes('/api/articles') &&
      request.request().method() === 'DELETE'
    )
  })

  page.once('dialog', dialog => dialog.accept())
  await Promise.all([
    responsePromise,
    page.getByRole('button', { name: 'Delete Article' }).nth(1).click(),
    page.waitForURL(`${configRWA.baseURL}?feed=feed`),
  ])
})
