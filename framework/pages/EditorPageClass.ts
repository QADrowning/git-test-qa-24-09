import { Page } from 'playwright-core'
import { BasePageClass } from './BasePageClass'
import config from '../config/configRWA'

export class EditorPageClass extends BasePageClass {
  private static titleInput = 'Article Title'
  private static aboutInput = "What's this article about?"
  private static contentInput = 'Write your article (in'
  private static tagInput = 'Enter tags'

  constructor(page: Page) {
    super(page)
  }

  async visit(slug?: string) {
    await super.navigeTo(`${config.baseURL}editor/${slug}`)
  }

  async waitForUrl(url) {
    await this.page.waitForURL(url)
  }

  async editArticleClick() {
    await this.page
      .getByRole('button', { name: 'Edit Article' })
      .first()
      .click()
  }

  async createArticle(
    title: string,
    about: string,
    content: string,
    tags: string[],
  ) {
    await this.page.getByRole('link', { name: 'New Post' }).click()
    await this.page.getByPlaceholder(EditorPageClass.titleInput).fill(title)
    await this.page.getByPlaceholder(EditorPageClass.aboutInput).fill(about)
    await this.page.getByPlaceholder(EditorPageClass.contentInput).fill(content)
    await this.page
      .getByPlaceholder(EditorPageClass.tagInput)
      .fill(tags.join(' '))
    await this.page.getByRole('button', { name: 'Publish Article' }).click()
  }

  async editArticle(content: string) {
    await this.page.goto(`${config.baseURL}/article/e2e-update-kak-testirovat`)
    await this.page
      .getByRole('button', { name: 'Edit Article' })
      .first()
      .click()
    await this.page.getByPlaceholder(EditorPageClass.contentInput).fill(content)
    await this.page.getByRole('button', { name: 'Publish Article' }).click()
  }

  async deleteArticleAsync() {
    const responsePromise = this.page.waitForResponse(request => {
      return (
        request.url().includes('/api/articles') &&
        request.request().method() === 'DELETE'
      )
    })

    this.page.once('dialog', dialog => dialog.accept())
    await Promise.all([
      responsePromise,
      this.page.getByRole('button', { name: 'Delete Article' }).nth(1).click(),
    ])
  }
}
