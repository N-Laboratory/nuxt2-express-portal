import { random } from 'lodash'

it('1:アカウント登録完了画面が表示されること', async () => {
  // Arrange
  await page.goto('http://localhost:3030/createAccount/input')
  await page.waitForNavigation({ timeout: 5000, waitUntil: 'domcontentloaded' })
  await page.type(`input[name="name"]`, 'name')
  await page.type(`input[name="password"]`, 'password')
  await page.keyboard.press('Tab')
  await page.click('[data-testid="raf-next"]')

  // Act
  await page.click('[data-testid="caf-next"]')
  await page.screenshot({
    path: `./src/e2e/evidence/createAccount/complete/1-complete.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="ca-complete"]',
    (element) => !!element
  )

  // Assert
  expect(existsPage).toBeTruthy()
}, 20000)

it('2:TOpページへ戻るボタンを押下した場合にログイン画面が表示されること', async () => {
  // Act
  await page.click('[data-testid="cf-back"]')
  await page.screenshot({
    path: `./src/e2e/evidence/createAccount/complete/2-login.png`,
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
  let count = 1
  beforeEach(async () => {
    await page.goto('http://localhost:3030/createAccount/input')
    await page.type(`input[name="name"]`, `test${count}`)
    await page.type(`input[name="password"]`, `test${count}`)
    await page.keyboard.press('Tab')
    await page.click('[data-testid="raf-next"]')
    await page.click('[data-testid="caf-next"]')
    count++
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
        path: `./src/e2e/evidence/createAccount/complete/${testNo}-${fileName}.png`,
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
