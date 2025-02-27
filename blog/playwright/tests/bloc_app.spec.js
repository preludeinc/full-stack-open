import { loginWith, createBlog } from './helper'
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog App/)

    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'preludeinc', 'babbage')

      await expect(page.getByText('Ada Lovelace logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'prelude', 'babbage')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'preludeinc', 'babbage')
      await page.getByRole('button', { name: 'new blog' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'SCP Foundation', 'Placeholder', 'https://scp-wiki.wikidot.com/scp-ex', '13')
      await expect(page.getByText('SCP Foundation').first()).toBeVisible()
    })
  })

  describe('A blog can be liked', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'preludeinc', 'babbage')
    })

    test('once the like button is clicked', async ({ page }) => {
      await page.getByRole('button', { name: 'view details' }).first().click()
      await page.getByRole('button', { name: 'likes' }).click()
    })
  })

  describe('A blog can be removed', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'preludeinc', 'babbage')
    })

    test('once the remove button is clicked', async ({ page }) => {
      await page.getByRole('button', { name: 'view details' }).first().click()
      await page.getByRole('button', { name: 'remove' }).click()
    })
  })
})