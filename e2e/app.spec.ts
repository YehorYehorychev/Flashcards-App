import { test, expect } from '@playwright/test'

test.describe('Home', () => {
  test('shows title and primary navigation', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { name: 'Ukrainian Flashcards', level: 1 }),
    ).toBeVisible()

    const nav = page.getByRole('navigation', { name: 'Primary navigation' })
    await expect(nav.getByRole('link', { name: /Study Mode/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /Quiz Mode/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /Stats/i })).toBeVisible()
  })

  test('navigates to study category selection', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Study Mode/i }).click()
    await expect(page).toHaveURL(/\/study$/)
    await expect(
      page.getByRole('heading', { name: 'Choose a category', level: 1 }),
    ).toBeVisible()
    await expect(page.getByText('Mode: Study')).toBeVisible()
  })

  test('navigates to quiz category selection', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Quiz Mode/i }).click()
    await expect(page).toHaveURL(/\/quiz$/)
    await expect(page.getByText('Mode: Quiz')).toBeVisible()
  })

  test('navigates to stats page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Stats/i }).click()
    await expect(page).toHaveURL(/\/stats$/)
    await expect(
      page.getByRole('heading', { name: 'Statistics', level: 1 }),
    ).toBeVisible()
  })
})

test.describe('Study mode', () => {
  test('lists categories and opens a study session', async ({ page }) => {
    await page.goto('/study')

    await expect(page.getByRole('link', { name: /Animals/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Food/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Verbs/i })).toBeVisible()

    await page.getByRole('link', { name: /Animals/i }).click()
    await expect(page).toHaveURL(/\/study\/animals$/)
    await expect(page.getByRole('heading', { name: /Card 1 of 3/ })).toBeVisible()
    await expect(page.getByText('кіт', { exact: true })).toBeVisible()
  })

  test('flip shows English and right/wrong; advances through deck', async ({
    page,
  }) => {
    await page.goto('/study/food')

    await expect(page.getByRole('heading', { name: /Card 1 of 3/ })).toBeVisible()
    await expect(page.getByText('хліб', { exact: true })).toBeVisible()
    await expect(
      page.getByRole('button', { name: /got it right/i }),
    ).not.toBeVisible()

    await page
      .getByRole('button', { name: 'Show English translation' })
      .click()
    await expect(page.getByText('bread', { exact: true })).toBeVisible()
    await expect(
      page.getByRole('button', { name: /got it right/i }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: /got it wrong/i }),
    ).toBeVisible()

    await page.getByRole('button', { name: /got it right/i }).click()
    await expect(page.getByRole('heading', { name: /Card 2 of 3/ })).toBeVisible()
    await expect(page.getByText('молоко', { exact: true })).toBeVisible()

    await page
      .getByRole('button', { name: 'Show English translation' })
      .click()
    await page.getByRole('button', { name: /got it right/i }).click()

    await expect(page.getByRole('heading', { name: /Card 3 of 3/ })).toBeVisible()
    await expect(page.getByText('яблуко', { exact: true })).toBeVisible()
    await page
      .getByRole('button', { name: 'Show English translation' })
      .click()
    await page.getByRole('button', { name: /got it right/i }).click()

    await expect(
      page.getByRole('heading', { name: 'Session complete', level: 1 }),
    ).toBeVisible()
    await expect(page.getByText(/0.*marked wrong this round/i)).toBeVisible()
  })

  test('counts wrong answers on session summary', async ({ page }) => {
    await page.goto('/study/animals')

    await page
      .getByRole('button', { name: 'Show English translation' })
      .click()
    await page.getByRole('button', { name: /got it wrong/i }).click()

    await page
      .getByRole('button', { name: 'Show English translation' })
      .click()
    await page.getByRole('button', { name: /got it right/i }).click()

    await page
      .getByRole('button', { name: 'Show English translation' })
      .click()
    await page.getByRole('button', { name: /got it right/i }).click()

    await expect(
      page.getByRole('heading', { name: 'Session complete', level: 1 }),
    ).toBeVisible()
    await expect(page.getByText(/1.*marked wrong this round/i)).toBeVisible()
  })

  test('unknown category shows error and link back', async ({ page }) => {
    await page.goto('/study/not-a-category')
    await expect(page.getByText('Unknown category.')).toBeVisible()
    await page.getByRole('link', { name: /Back to categories/i }).click()
    await expect(page).toHaveURL(/\/study$/)
  })

  test('can exit study session to category list', async ({ page }) => {
    await page.goto('/study/verbs')
    await page.getByRole('link', { name: /Exit to categories/i }).click()
    await expect(page).toHaveURL(/\/study$/)
  })
})

test.describe('Quiz mode (static shell)', () => {
  test('category links target quiz routes', async ({ page }) => {
    await page.goto('/quiz')
    await page.getByRole('link', { name: /Food/i }).click()
    await expect(page).toHaveURL(/\/quiz\/food/)
  })
})
