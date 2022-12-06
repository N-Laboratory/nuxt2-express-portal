it('1:ログイン画面が表示されること', async () => {
  // Act
  await page.goto('http://localhost:3030/login')
  await page.waitForNavigation({ timeout: 5000, waitUntil: 'domcontentloaded' })
  await page.screenshot({
    path: `./src/e2e/evidence/login/1-login.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="login-page"]',
    (element) => !!element
  )

  // Assert
  expect(existsPage).toBeTruthy()
}, 20000)

describe('バリデーションチェック', () => {
  test.each([
    [
      2,
      'name',
      '半角英数字',
      'されない',
      'abcABC0123456789',
      '',
      'lf-name-error-msg',
    ],
    [
      3,
      'name',
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'nameは半角英数字で入力してください',
      'lf-name-error-msg',
    ],
    [
      4,
      'name',
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'nameは64文字以内にしてください',
      'lf-name-error-msg',
    ],
    [
      5,
      'name',
      '未入力',
      'される',
      '',
      'nameは必須項目です',
      'lf-name-error-msg',
    ],
    [
      6,
      'password',
      '半角英数字',
      'されない',
      'abcABC0123456789',
      '',
      'lf-password-error-msg',
    ],
    [
      7,
      'password',
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'passwordは半角英数字で入力してください',
      'lf-password-error-msg',
    ],
    [
      8,
      'password',
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'passwordは64文字以内にしてください',
      'lf-password-error-msg',
    ],
    [
      9,
      'password',
      '未入力',
      'される',
      '',
      'passwordは必須項目です',
      'lf-password-error-msg',
    ],
  ])(
    '%s:name=%sの入力フィールドに[%s]を入力した場合にエラーメッセージが表示%sこと',
    async (
      testNo,
      inputName,
      inputType,
      result,
      inputValue,
      expectedErrorMsg,
      errorMsgSelector
    ) => {
      // Act
      await page.type(`input[name="${inputName}"]`, inputValue)
      await page.keyboard.press('Tab')
      await page.screenshot({
        path: `./src/e2e/evidence/login/${testNo}-validation-${inputName}-${inputType}.png`,
        fullPage: true,
      })

      const errorMsg = await page.$eval(
        `[data-testid="${errorMsgSelector}"]`,
        (element) => element.textContent
      )

      // Assert
      expect(errorMsg).toBe(expectedErrorMsg)

      // reset input value
      await page.click(`input[name="${inputName}"]`, {
        clickCount: inputValue.length,
      })
      await page.keyboard.press('Backspace')
    },
    200000
  )
})

describe('Submitボタンの活性/非活性状態確認', () => {
  it('10:初期状態ではSubmitボタンが非活性であること', async () => {
    // Act
    await page.screenshot({
      path: `./src/e2e/evidence/login/10-nextBtnDisabled.png`,
      fullPage: true,
    })

    const hasDisabledProperty = await page.$eval(
      '[data-testid="lf-submit"]',
      (element) => element.getAttribute('disabled')
    )

    // Assert
    expect(hasDisabledProperty).toBeTruthy()
  }, 10000)

  it('11:入力フィールドにすべて入力した場合はSubmitボタンが活性であること', async () => {
    // Act
    await page.type(`input[name="name"]`, 'name')
    await page.type(`input[name="password"]`, 'password')
    await page.keyboard.press('Tab')
    await page.screenshot({
      path: `./src/e2e/evidence/login/11-nextBtnEnabled.png`,
      fullPage: true,
    })

    const hasDisabledProperty = await page.$eval(
      '[data-testid="lf-submit"]',
      (element) => element.getAttribute('disabled')
    )

    // Assert
    expect(hasDisabledProperty).toBeFalsy()

    // reset input value
    await page.click('input[name="name"]', { clickCount: 4 })
    await page.keyboard.press('Backspace')
    await page.click('input[name="password"]', { clickCount: 8 })
    await page.keyboard.press('Backspace')
  }, 10000)
})

it('12:Submitボタンを押下した場合にマイページ画面が表示されること', async () => {
  // Act
  await page.type(`input[name="name"]`, 'admin')
  await page.type(`input[name="password"]`, 'password')
  await page.keyboard.press('Tab')
  await page.click('[data-testid="lf-submit"]')
  await page.screenshot({
    path: `./src/e2e/evidence/login/12-my-page.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="my-page"]',
    (element) => !!element
  )

  // Assert
  expect(existsPage).toBeTruthy()
}, 10000)

it('13:存在しないアカウントのNameとPasswordを入力した場合はエラーメッセージが表示されること', async () => {
  // Act
  await page.click('[data-testid="sign-out"]')
  await page.type(`input[name="name"]`, 'name')
  await page.type(`input[name="password"]`, 'password')
  await page.click('[data-testid="lf-submit"]')
  await page.screenshot({
    path: `./src/e2e/evidence/login/13-error.png`,
    fullPage: true,
  })

  const existsErrorTitle = await page.$eval('#swal2-title', (element) =>
    element.getAttribute('disabled')
  )

  // Assert
  expect(existsErrorTitle).toBeFalsy()
}, 10000)

describe('各リンク押下時の遷移先確認', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3030/login')
  }, 10000)

  test.each([
    [
      13,
      'Create an Account',
      'アカウント登録画面',
      'create-account',
      'ca-input',
      'input',
    ],
    [
      14,
      'Forgot Password?',
      'アカウント認証画面',
      'forgot-password',
      'rp-check',
      'check',
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
        path: `./src/e2e/evidence/login/${testNo}-${fileName}.png`,
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
