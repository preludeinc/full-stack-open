const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog App/)

    const usernameLocator = await page.getByText('username')
    await expect(usernameLocator).toBeVisible()

    const passLocator = await page.getByText('password')
    await expect(passLocator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('preludeinc')
      await textboxes[1].fill('babbage')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Ada Lovelace logged in')).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('prelude')
      await textboxes[1].fill('babbage')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong username or password')).toBeVisible();
    })
  })
})