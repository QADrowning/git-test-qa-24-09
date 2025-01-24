import { test, expect } from '@playwright/test';

const selectors = {
  userName: '#username',
  password:'#password',
  loginButton:'button[type=button]',
  loginSuccess: '.username',
  logo: '.logo',

  menu:'.is-active',
  addTaskArea: '.add-task-textarea',
  burgerMenu:'.base-button',
  dropDown: '.ml-1',
  dropDownContent:'.dropdown-content',
  addTaskBtn: 'button[type=button]',
  loginBtn: 'input[tabindex=submit]',
}

const task = {
  loginName: 'demo',
  password: 'demo'
}

test.describe('OtusHomework_11', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://try.vikunja.io/');
  });  

  test('login', async({page}) => {
    
    await page.waitForURL('https://try.vikunja.io/login');  
    await page.locator(selectors.userName).fill(task.loginName);
    await page.locator(selectors.password).fill(task.password);
    await page.locator(selectors.loginButton).nth(2).click();

    const title = await page.locator(selectors.loginSuccess).textContent();
    expect(title).toEqual('demo')
    await expect (page.locator(selectors.logo).nth(0)).toBeVisible();   
  })

  test('Add a task field exist', async({page}) => {
    
    await page.waitForURL('https://try.vikunja.io/login');  
    await page.locator(selectors.userName).fill(task.loginName);
    await page.locator(selectors.password).fill(task.password);
    await page.locator(selectors.loginButton).nth(2).click();  

    await expect (page.locator(selectors.addTaskArea)).toBeVisible();   
  })

  test('User menu exist', async({page}) => {
    
    await page.waitForURL('https://try.vikunja.io/login');  
    await page.locator(selectors.userName).fill(task.loginName);
    await page.locator(selectors.password).fill(task.password);
    await page.locator(selectors.loginButton).nth(2).click();  

    await expect (page.locator(selectors.menu)).toBeVisible();   
  })

  test('User menu dropddown exist', async({page}) => {
    
    await page.waitForURL('https://try.vikunja.io/login');  
    await page.locator(selectors.userName).fill(task.loginName);
    await page.locator(selectors.password).fill(task.password);
    await page.locator(selectors.loginButton).nth(2).click();  

    await page.locator(selectors.dropDown).click();   
    await expect (page.locator(selectors.dropDownContent).nth(0)).toBeVisible();
  })

  test('Burger menu exist', async({page}) => {
    
    await page.waitForURL('https://try.vikunja.io/login');  
    await page.locator(selectors.userName).fill(task.loginName);
    await page.locator(selectors.password).fill(task.password);
    await page.locator(selectors.loginButton).nth(2).click();  

    await expect (page.locator(selectors.burgerMenu).nth(0)).toBeVisible();   
  })  
 })