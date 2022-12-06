it('1:パスワード確認画面が表示されること', async () => {
  // Act
  await page.goto('http://localhost:3030/resetPassword/check')
  await page.waitForNavigation({ timeout: 5000, waitUntil: 'domcontentloaded' })
  await page.type(`input[name="name"]`, 'admin')
  await page.click('[data-testid="caf-next"]')
  await page.type(`input[name="password"]`, 'password')
  await page.click('[data-testid="rpf-next"]')

  const existsPage = await page.$eval(
    '[data-testid="rp-confirm"]',
    (element) => !!element
  )
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/confirm/1-confirm.png`,
    fullPage: true,
  })

  // Assert
  expect(existsPage).toBeTruthy()
}, 20000)

it('2:次へボタンが活性であること', async () => {
  // Act
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/confirm/2-nextBtnEnabled.png`,
    fullPage: true,
  })
  const hasDisabledProperty = await page.$eval(
    '[data-testid="caf-next"]',
    (element) => element.getAttribute('disabled')
  )

  // Assert
  expect(hasDisabledProperty).toBeFalsy()
}, 10000)

it('3:戻るボタンを押下した場合にパスワード登録画面が表示されること', async () => {
  // Act
  await page.click('[data-testid="bs-back"]')
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/confirm/3-input.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="rp-input"]',
    (element) => !!element
  )

  // Assert
  expect(existsPage).toBeTruthy()
}, 10000)

it('4:次へボタンを押下した場合にパスワード変更完了画面が表示されること', async () => {
  // Act
  await page.click('[data-testid="rpf-next"]')
  await page.click('[data-testid="caf-next"]')
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/confirm/4-complete.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="rp-complete"]',
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
  }, 10000)

  test.each([
    [5, 'Homeアイコン', 'ログイン画面', 'home-icon', 'login-page', 'login'],
    [6, 'Aboutメニュー', 'About画面', 'about-menu', 'about-page', 'about'],
    [
      7,
      'Sign upメニュー',
      'ログイン画面',
      'sign-up-text',
      'login-page',
      'sign-up',
    ],
    [
      8,
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
        path: `./src/e2e/evidence/resetPassword/confirm/${testNo}-${fileName}.png`,
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
