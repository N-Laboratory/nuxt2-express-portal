it('1:アカウント認証画面が表示されること', async () => {
  // Act
  await page.goto('http://localhost:3030/resetPassword/check')
  await page.waitForNavigation({ timeout: 5000, waitUntil: 'domcontentloaded' })

  const existsPage = await page.$eval(
    '[data-testid="rp-check"]',
    (element) => !!element
  )
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/check/1-check.png`,
    fullPage: true,
  })

  // Assert
  expect(existsPage).toBeTruthy()
}, 10000)

describe('バリデーションチェック', () => {
  test.each([
    [2, '半角英数字', 'されない', 'abcABC0123456789', ''],
    [
      3,
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'nameは半角英数字で入力してください',
    ],
    [
      4,
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'nameは64文字以内にしてください',
    ],
    [5, '未入力', 'される', '', 'nameは必須項目です'],
  ])(
    '%s:入力フィールドに[%s]を入力した場合にエラーメッセージが表示%sこと',
    async (testNo, inputType, result, inputValue, expectedErrorMsg) => {
      // Act
      await page.type(`input[name="name"]`, inputValue)
      await page.keyboard.press('Tab')
      await page.screenshot({
        path: `./src/e2e/evidence/resetPassword/check/${testNo}-validation-name-${inputType}.png`,
        fullPage: true,
      })

      const errorMsg = await page.$eval(
        '[data-testid="ii-error-msg"]',
        (element) => {
          return element.textContent
        }
      )

      // Assert
      expect(errorMsg).toBe(expectedErrorMsg)

      // reset input value
      await page.click('input[name="name"]', {
        clickCount: inputValue.length,
      })
      await page.keyboard.press('Backspace')
    },
    100000
  )
})

describe('次へボタンの活性/非活性状態確認', () => {
  it('6:初期状態では次へボタンが非活性であること', async () => {
    // Act
    const hasDisabledProperty = await page.$eval(
      '[data-testid="caf-next"]',
      (element) => element.getAttribute('disabled')
    )
    await page.screenshot({
      path: `./src/e2e/evidence/resetPassword/check/6-nextBtnDisabled.png`,
      fullPage: true,
    })

    // Assert
    expect(hasDisabledProperty).toBeTruthy()
  }, 10000)

  it('7:入力フィールドに入力した場合は次へボタンが活性であること', async () => {
    // Act
    await page.type(`input[name="name"]`, 'name')
    await page.keyboard.press('Tab')
    await page.screenshot({
      path: `./src/e2e/evidence/resetPassword/check/7-nextBtnEnabled.png`,
      fullPage: true,
    })
    const hasDisabledProperty = await page.$eval(
      '[data-testid="caf-next"]',
      (element) => element.getAttribute('disabled')
    )

    // Assert
    expect(hasDisabledProperty).toBeFalsy()

    // reset input value
    await page.click('input[name="name"]', { clickCount: 4 })
    await page.keyboard.press('Backspace')
  }, 10000)
})

it('8:存在しないアカウントのNameを入力した場合にエラーメッセージが表示されること', async () => {
  // Act
  await page.type(`input[name="name"]`, 'test name')
  await page.click('[data-testid="caf-next"]')
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/check/8-error.png`,
    fullPage: true,
  })

  const existsErrorTitle = await page.$eval(
    '#swal2-title',
    (element) => !!element
  )

  // Assert
  expect(existsErrorTitle).toBeTruthy()
}, 10000)

it('9:次へボタンを押下した場合にパスワード登録画面が表示されること', async () => {
  // Act
  await page.goto('http://localhost:3030/resetPassword/check')
  await page.type(`input[name="name"]`, 'admin')
  await page.click('[data-testid="caf-next"]')
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/check/9-input.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="rp-input"]',
    (element) => !!element
  )

  // Assert
  expect(existsPage).toBeTruthy()
}, 10000)

describe('各メニュー押下時の遷移先確認', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3030/resetPassword/check')
  }, 10000)

  test.each([
    [10, 'Homeアイコン', 'ログイン画面', 'home-icon', 'login-page', 'login'],
    [11, 'Aboutメニュー', 'About画面', 'about-menu', 'about-page', 'about'],
    [
      12,
      'Sign upメニュー',
      'ログイン画面',
      'sign-up-text',
      'login-page',
      'sign-up',
    ],
    [
      13,
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
        path: `./src/e2e/evidence/resetPassword/check/${testNo}-${fileName}.png`,
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
