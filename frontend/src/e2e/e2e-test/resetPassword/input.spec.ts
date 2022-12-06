it('1:パスワード登録画面が表示されること', async () => {
  // Act
  await page.goto('http://localhost:3030/resetPassword/check')
  await page.waitForNavigation({ timeout: 5000, waitUntil: 'domcontentloaded' })
  await page.type(`input[name="name"]`, 'admin')
  await page.click('[data-testid="caf-next"]')

  const existsPage = await page.$eval(
    '[data-testid="rp-input"]',
    (element) => !!element
  )
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/input/1-input.png`,
    fullPage: true,
  })

  // Assert
  expect(existsPage).toBeTruthy()
}, 20000)

describe('バリデーションチェック', () => {
  test.each([
    [2, '半角英数字', 'されない', 'abcABC0123456789', ''],
    [
      3,
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'passwordは半角英数字で入力してください',
    ],
    [
      4,
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'passwordは64文字以内にしてください',
    ],
    [5, '未入力', 'される', '', 'passwordは必須項目です'],
  ])(
    '%s:入力フィールドに[%s]を入力した場合にエラーメッセージが表示%sこと',
    async (testNo, inputType, result, inputValue, expectedErrorMsg) => {
      // Act
      await page.type(`input[name="password"]`, inputValue)
      await page.keyboard.press('Tab')
      await page.screenshot({
        path: `./src/e2e/evidence/resetPassword/input/${testNo}-validation-password-${inputType}.png`,
        fullPage: true,
      })

      var errorMsg = await page.$eval(
        '[data-testid="ii-error-msg"]',
        (element) => {
          return element.textContent
        }
      )

      // Assert
      expect(errorMsg).toBe(expectedErrorMsg)

      // reset input value
      await page.click('input[name="password"]', {
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
      '[data-testid="rpf-next"]',
      (element) => element.getAttribute('disabled')
    )
    await page.screenshot({
      path: `./src/e2e/evidence/resetPassword/input/6-nextBtnDisabled.png`,
      fullPage: true,
    })

    // Assert
    expect(hasDisabledProperty).toBeTruthy()
  }, 10000)

  it('7:入力フィールドに入力した場合は次へボタンが活性であること', async () => {
    // Act
    await page.type(`input[name="password"]`, 'password')
    await page.keyboard.press('Tab')
    await page.screenshot({
      path: `./src/e2e/evidence/resetPassword/input/7-nextBtnEnabled.png`,
      fullPage: true,
    })
    const hasDisabledProperty = await page.$eval(
      '[data-testid="rpf-next"]',
      (element) => element.getAttribute('disabled')
    )

    // Assert
    expect(hasDisabledProperty).toBeFalsy()

    // reset input value
    await page.click('input[name="password"]', { clickCount: 8 })
    await page.keyboard.press('Backspace')
  }, 10000)
})

it('8:次へボタンを押下した場合にパスワード確認画面が表示されること', async () => {
  // Act
  await page.type(`input[name="password"]`, 'password')
  await page.click('[data-testid="rpf-next"]')
  await page.screenshot({
    path: `./src/e2e/evidence/resetPassword/input/8-confirm.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="rp-confirm"]',
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
  }, 10000)

  test.each([
    [9, 'Homeアイコン', 'ログイン画面', 'home-icon', 'login-page', 'login'],
    [10, 'Aboutメニュー', 'About画面', 'about-menu', 'about-page', 'about'],
    [
      11,
      'Sign upメニュー',
      'ログイン画面',
      'sign-up-text',
      'login-page',
      'sign-up',
    ],
    [
      12,
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
        path: `./src/e2e/evidence/resetPassword/input/${testNo}-${fileName}.png`,
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
