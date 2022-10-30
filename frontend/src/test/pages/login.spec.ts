import { shallowMount, Wrapper } from '@vue/test-utils'
import { waitPerfectly } from './../setup'
import Login from '~/pages/login.vue'

let wrapper: Wrapper<Login & { [key: string]: any }>
const loginWithMock = jest.fn()
const swal = jest.fn()

jest.useFakeTimers()

beforeEach(() => {
  wrapper = shallowMount(Login, {
    mocks: {
      $auth: {
        loginWith: loginWithMock,
      },
      $swal: swal,
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

test('ユーザー情報が初期値で設定されていること', () => {
  // Assert
  expect(wrapper.vm.$data.user.name).toBe('')
  expect(wrapper.vm.$data.user.password).toBe('')
})

describe('submit押下時の動作確認', () => {
  test('submitを押下した場合は、ログイン処理が実行されること', async () => {
    // Act
    wrapper.vm.login()
    await waitPerfectly()

    // Assert
    expect(loginWithMock).toHaveBeenCalled()
  })

  test('ログイン処理に失敗した場合はエラーメッセージ(SweetAlert)が表示されること', async () => {
    wrapper = shallowMount(Login, {
      mocks: {
        $auth: {
          // eslint-disable-next-line prefer-promise-reject-errors
          loginWith: jest.fn().mockReturnValue(Promise.reject()),
        },
        $swal: swal,
      },
    })

    // Act
    wrapper.vm.login()
    await waitPerfectly()

    // Assert
    expect(swal).toHaveBeenCalled()
  })
})
