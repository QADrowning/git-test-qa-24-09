import type { Page } from 'playwright-core'

export class ProjectPage {
  private page: Page
  private static projectButtonMenu: string = '[href="/projects"]'
  private static newProjectButton: string = '[href="/projects/new"]'
  private static projectTitle: string = '[name="projectTitle"]'
  private static addTaskButton: string = '[aria-label="Add"]'

  constructor(page: Page) {
    this.page = page
  }

  async createProject(title: string) {
    await this.page.locator(ProjectPage.projectButtonMenu).click()
    await this.page.locator(ProjectPage.newProjectButton).click()
    await this.page.locator(ProjectPage.projectTitle).fill(title)
    await this.page.getByRole('button', { name: /Create/i }).click()
  }

  async addTask(taskTitle: string) {
    await this.page.getByPlaceholder('Add a task…').fill(taskTitle)
    await this.page.locator(ProjectPage.addTaskButton).click()
  }
}
