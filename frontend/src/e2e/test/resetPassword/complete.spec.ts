it('1:パスワード変更完了画面が表示されること', async () => {
  // Act
  await page.goto('http://localhost:3030/resetPassword/check')
  await page.waitForNavigation({ timeout: 5000, waitUntil: 'domcontentloaded' })
  await page.type(`input[name="name"]`, 'admin')
  await page.click('[data-testid="caf-next"]')
  await page.type(`input[name="password"]`, 'password')
  await page.click('[data-testid="rpf-next"]')
  await page.click('[data-testid="caf-next"]')

  const existsPage = await page.$eval(
    '[data-testid="rp-complete"]',
    (element) => !!element
  )
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/complete/1-complete.png`,
    fullPage: true,
  })

  // Assert
  expect(existsPage).toBeTruthy()
}, 20000)

it('2:TOPページへ戻るを押下した場合にログイン画面が表示されること', async () => {
  // Act
  await page.click('[data-testid="cf-back"]')
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/complete/2-top.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="login-page"]',
    (element) => !!element
  )

  // Assert
  expect(existsPage).toBeTruthy()
}, 10000)

describe('各メニュー押下時の遷移先確認', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3030/resetPassword/check')
    await page.type(`input[name="name"]`, 'admin')
    await page.click('[data-testid="caf-next"]')
    await page.type(`input[name="password"]`, 'password')
    await page.click('[data-testid="rpf-next"]')
    await page.click('[data-testid="caf-next"]')
  }, 10000)

  test.each([
    [3, 'Homeアイコン', 'ログイン画面', 'home-icon', 'login-page', 'login'],
    [4, 'Aboutメニュー', 'About画面', 'about-menu', 'about-page', 'about'],
    [
      5,
      'Sign upメニュー',
      'ログイン画面',
      'sign-up-text',
      'login-page',
      'sign-up',
    ],
    [
      6,
      'Sign inメニュー',
      'ログイン画面',
      'sign-in-text',
      'login-page',
      'sign-in',
    ],
  ])(
    '%s:%sを押下した場合に%sが表示されること',
    async (
      testNo,
      targetName,
      result,
      menuDataTestid,
      pageDataTestid,
      fileName
    ) => {
      // Act
      await page.click(`[data-testid="${menuDataTestid}"]`)
      await page.screenshot({
        path: `./src/e2e/evidence/resetPassword/complete/${testNo}-${fileName}.png`,
        fullPage: true,
      })

      const existsPage = await page.$eval(
        `[data-testid="${pageDataTestid}"]`,
        (element) => !!element
      )

      // Assert
      expect(existsPage).toBeTruthy()
    },
    100000
  )
})
