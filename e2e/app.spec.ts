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
    await expect(
      page.getByText(/Study mode — flip cards/i),
    ).toBeVisible()
  })

  test('navigates to quiz selection', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Quiz Mode/i }).click()
    await expect(page).toHaveURL(/\/quiz$/)
    await expect(
      page.getByRole('heading', { name: 'Quiz', level: 1 }),
    ).toBeVisible()
  })

  test('navigates to stats page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Stats/i }).click()
    await expect(page).toHaveURL(/\/stats$/)
    await expect(
      page.getByRole('heading', { name: /Stats/, level: 1 }),
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
    await expect(page.getByRole('heading', { name: /Card 1 of \d+/ })).toBeVisible()
    await expect(page.getByText('кіт', { exact: true })).toBeVisible()
  })

  test('flip shows English and right/wrong; advances through deck', async ({
    page,
  }) => {
    await page.goto('/study/food')

    await expect(page.getByRole('heading', { name: /Card 1 of \d+/ })).toBeVisible()
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
    await expect(page.getByRole('heading', { name: /Card 2 of \d+/ })).toBeVisible()
    await expect(page.getByText('молоко', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'Show English translation' }).click()
    await page.getByRole('button', { name: /got it right/i }).click()

    await expect(page.getByRole('heading', { name: /Card 3 of \d+/ })).toBeVisible()
    await expect(page.getByText('яблуко', { exact: true })).toBeVisible()
    
    // Finalize the deck
    while (!(await page.getByRole('heading', { name: /Session complete/i, level: 1 }).isVisible())) {
        await page.getByRole('button', { name: 'Show English translation' }).click()
        await page.getByRole('button', { name: /got it right/i }).click()
    }

    await expect(
      page.getByRole('heading', { name: /Session complete/i, level: 1 }),
    ).toBeVisible()
    await expect(page.getByText(/0.*to review again/i)).toBeVisible()
  })

  test('counts wrong answers on session summary', async ({ page }) => {
    await page.goto('/study/animals')

    // Click through the entire deck (dynamic)
    let isFinished = false;
    let cardCount = 0;
    while (!isFinished) {
        await page.getByRole('button', { name: 'Show English translation' }).click()
        // Mark first card (кіт) as wrong, all others right
        if (cardCount === 0) {
            await page.getByRole('button', { name: /got it wrong/i }).click()
        } else {
            await page.getByRole('button', { name: /got it right/i }).click()
        }
        cardCount++;
        isFinished = await page.getByRole('heading', { name: /Session complete/i, level: 1 }).isVisible();
    }

    await expect(
      page.getByRole('heading', { name: /Session complete/i, level: 1 }),
    ).toBeVisible()
    await expect(page.getByText(/1.*to review again/i)).toBeVisible()
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

test.describe('Quiz mode', () => {
  test('category links include quiz type and render questions', async ({
    page,
  }) => {
    await page.goto('/quiz')
    await page.getByRole('link', { name: /Food/i }).click()
    await expect(page).toHaveURL(/\/quiz\/food/)
    await expect(page).toHaveURL(/type=multiple-choice/)

    await expect(page.getByRole('heading', { name: /Question 1 of \d+/ })).toBeVisible()
    
    // Complete the quiz
    while (!(await page.getByRole('heading', { name: /Quiz complete/i, level: 1 }).isVisible())) {
        const option = page.locator('[role="group"] button').first()
        if (await option.isVisible()) {
            await option.click()
            const nextBtn = page.getByRole('button', { name: /Next Question|Finish Quiz/i })
            await nextBtn.click()
        } else {
            break;
        }
    }
    
    await expect(
      page.getByRole('heading', { name: /Quiz complete/i, level: 1 }),
    ).toBeVisible()
  })

  test('fill-in-the-blank is case-insensitive', async ({ page }) => {
    await page.goto('/quiz')
    await page.getByRole('button', { name: /Fill in the blank/i }).click()
    await page.getByRole('link', { name: /Animals/i }).click()
    await expect(page).toHaveURL(/\/quiz\/animals/)
    await expect(page).toHaveURL(/type=fill-in-the-blank/)

    await expect(page.getByText('птах', { exact: true })).toBeVisible()
    await page.getByPlaceholder(/English translation/i).fill('THE BIRD')
    await page.getByRole('button', { name: /Check answer/i }).click()
    await expect(page.getByText(/Correct/i)).toBeVisible()
  })
})

test.describe('Stats', () => {
  test('shows overall section after activity', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('flashcards-app-progress-v2')
    })
    await page.goto('/study/food')
    await page
      .getByRole('button', { name: 'Show English translation' })
      .click()
    await page.getByRole('button', { name: /got it right/i }).click()

    await page.goto('/stats')
    await expect(page.getByRole('heading', { name: /Overall/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /By category/i })).toBeVisible()
    await expect(page.getByText('Food').first()).toBeVisible()
  })
})
