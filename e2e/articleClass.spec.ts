import { test, expect } from '@playwright/test'
import { EditorPageClass } from '../framework/pages/EditorPageClass'
import { loginUser } from '../framework/actions/login'
import config from '../framework/config/configRWA'

test.beforeEach(async ({ page }) => {
  await loginUser(page)
})

test('Создание страницы', async ({ page }) => {
  const editorPage = new EditorPageClass(page)
  await editorPage.visit()
  await editorPage.createArticle(
    'article title',
    'about article',
    'article content',
    ['e2e'],
  )

  await expect(page.getByRole('heading')).toContainText('article title')
  await expect(
    page.getByRole('button', { name: 'Delete Article' }).nth(1),
  ).toBeVisible()
})

test('Обновление страницы', async ({ page }) => {
  const editorPage = new EditorPageClass(page)
  editorPage.editArticle('[E2E] [Update] Как тестировать EDIT')

  await expect(
    page.getByText('[E2E] [Update] Как тестировать EDIT'),
  ).toBeVisible()
  editorPage.editArticleClick()
  editorPage.editArticle('[E2E] [Update] Как тестировать UPDATED')
  editorPage.waitForUrl(`${config.baseURL}article/e2e-update-kak-testirovat`)

  await expect(
    page.getByText('[E2E] [Update] Как тестировать UPDATED'),
  ).toBeVisible()
})

test('Удаление страницы', async ({ page }) => {
  const editorPage = new EditorPageClass(page)
  await editorPage.visit()
  editorPage.createArticle('delete title', 'delete article', 'delete content', [
    'e2e',
  ])
  await expect(page.getByRole('heading')).toContainText('delete title')
  await editorPage.deleteArticleAsync()
  editorPage.waitForUrl(`${config.baseURL}?feed=feed`)
})
