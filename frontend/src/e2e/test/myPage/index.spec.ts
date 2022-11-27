import { random } from 'lodash'

it('1:マイページ画面が表示されること', async () => {
  // Arrange
  await page.goto('http://localhost:3030/login')
  await page.waitForNavigation({ timeout: 5000, waitUntil: 'domcontentloaded' })

  // Act
  await page.type(`input[name="name"]`, 'admin')
  await page.type(`input[name="password"]`, 'password')
  await page.click('[data-testid="lf-submit"]')
  await page.screenshot({
    path: `./src/e2e/evidence/myPage/index/1-index.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="my-page"]',
    (element) => !!element
  )

  // Assert
  expect(existsPage).toBeTruthy()
}, 20000)

describe('各メニュー押下時の遷移先確認', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3030/myPage')
  }, 10000)

  test.each([
    [2, 'Homeアイコン', 'マイページ画面', 'home-icon', 'my-page', 'my-page'],
    [3, 'Aboutメニュー', 'About画面', 'about-menu', 'about-page', 'about'],
    [
      4,
      'sign-outメニュー',
      'ログイン画面',
      'sign-out',
      'login-page',
      'sign-out',
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
        path: `./src/e2e/evidence/myPage/index/${testNo}-${fileName}.png`,
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
