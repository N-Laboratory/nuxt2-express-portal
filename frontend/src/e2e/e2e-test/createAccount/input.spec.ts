it('1:アカウント登録画面が表示されること', async () => {
  // Act
  await page.goto('http://localhost:3030/createAccount/input')
  await page.waitForNavigation({ timeout: 5000, waitUntil: 'domcontentloaded' })

  const existsPage = await page.$eval(
    '[data-testid="ca-input"]',
    (element) => !!element
  )
  await page.screenshot({
    path: `./src/e2e/evidence/createAccount/input/1-input.png`,
    fullPage: true,
  })

  // Assert
  expect(existsPage).toBeTruthy()
}, 10000)

describe('バリデーションチェック', () => {
  test.each([
    [2, 'name', '半角英数字', 'されない', 'abcABC0123456789', '', 0],
    [
      3,
      'name',
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'nameは半角英数字で入力してください',
      0,
    ],
    [
      4,
      'name',
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'nameは64文字以内にしてください',
      0,
    ],
    [5, 'name', '未入力', 'される', '', 'nameは必須項目です', 0],
    [6, 'password', '半角英数字', 'されない', 'abcABC0123456789', '', 1],
    [
      7,
      'password',
      '半角英数字以外',
      'される',
      'あいうえお漢字カナ',
      'passwordは半角英数字で入力してください',
      1,
    ],
    [
      8,
      'password',
      '64文字以上',
      'される',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'passwordは64文字以内にしてください',
      1,
    ],
    [9, 'password', '未入力', 'される', '', 'passwordは必須項目です', 1],
  ])(
    '%s:name=%sの入力フィールドに[%s]を入力した場合にエラーメッセージが表示%sこと',
    async (
      testNo,
      inputName,
      inputType,
      result,
      inputValue,
      expectedErrorMsg,
      index
    ) => {
      // Act
      await page.type(`input[name="${inputName}"]`, inputValue)
      await page.keyboard.press('Tab')
      await page.screenshot({
        path: `./src/e2e/evidence/createAccount/input/${testNo}-validation-${inputName}-${inputType}.png`,
        fullPage: true,
      })

      const errorMsgList = await page.$$eval(
        '[data-testid="ii-error-msg"]',
        (list) => {
          return list.map((data) => data.textContent)
        }
      )

      // Assert
      expect(errorMsgList[index]).toBe(expectedErrorMsg)

      // reset input value
      await page.click(`input[name="${inputName}"]`, {
        clickCount: inputValue.length,
      })
      await page.keyboard.press('Backspace')
    },
    100000
  )
})

describe('次へボタンの活性/非活性状態確認', () => {
  it('10:初期状態では次へボタンが非活性であること', async () => {
    // Act
    const hasDisabledProperty = await page.$eval(
      '[data-testid="raf-next"]',
      (element) => element.getAttribute('disabled')
    )
    await page.screenshot({
      path: `./src/e2e/evidence/createAccount/input/10-nextBtnDisabled.png`,
      fullPage: true,
    })

    // Assert
    expect(hasDisabledProperty).toBeTruthy()
  }, 10000)

  it('11:入力フィールドにすべて入力した場合は次へボタンが活性であること', async () => {
    // Act
    await page.type(`input[name="name"]`, 'name')
    await page.type(`input[name="password"]`, 'password')
    await page.keyboard.press('Tab')
    await page.screenshot({
      path: `./src/e2e/evidence/createAccount/input/11-nextBtnEnabled.png`,
      fullPage: true,
    })
    const hasDisabledProperty = await page.$eval(
      '[data-testid="raf-next"]',
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

it('12:次へボタンを押下した場合にアカウント確認画面が表示されること', async () => {
  // Act
  await page.type(`input[name="name"]`, 'name')
  await page.type(`input[name="password"]`, 'password')
  await page.keyboard.press('Tab')
  await page.click('[data-testid="raf-next"]')
  await page.screenshot({
    path: `./src/e2e/evidence/createAccount/input/12-confirm.png`,
    fullPage: true,
  })

  const existsPage = await page.$eval(
    '[data-testid="ca-confirm"]',
    (element) => !!element
  )

  // Assert
  expect(existsPage).toBeTruthy()
}, 10000)

describe('各メニュー押下時の遷移先確認', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3030/createAccount/input')
  }, 10000)

  test.each([
    [13, 'Homeアイコン', 'ログイン画面', 'home-icon', 'login-page', 'login'],
    [14, 'Aboutメニュー', 'About画面', 'about-menu', 'about-page', 'about'],
    [
      15,
      'Sign upメニュー',
      'ログイン画面',
      'sign-up-text',
      'login-page',
      'sign-up',
    ],
    [
      16,
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
        path: `./src/e2e/evidence/createAccount/input/${testNo}-${fileName}.png`,
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
