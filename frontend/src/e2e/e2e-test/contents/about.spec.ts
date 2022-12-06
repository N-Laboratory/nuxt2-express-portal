it('aboutページが表示されること', async () => {
  // Act
  await page.goto('http://localhost:3030/contents/about')
  await page.waitForNavigation({ timeout: 5000, waitUntil: 'domcontentloaded' })

  const existsPage = await page.$eval(
    '[data-testid="about-page"]',
    (element) => !!element
  )
  await page.screenshot({
    path: `./src/e2e/evidence/contents/about.png`,
    fullPage: true,
  })

  // Assert
  expect(existsPage).toBeTruthy()
}, 10000)
