import * as hg from '../../utils/HashGenerator'
import crypto from 'crypto-js'
import hmacSHA3 from 'crypto-js/hmac-sha3'

jest.mock('crypto-js')
crypto.lib.WordArray.random.mockImplementation(() => 'generatedSalt')

jest.mock('crypto-js/hmac-sha3')
hmacSHA3.mockImplementation(() => 'generatedHash')

test('ハッシュ化対象の文字列とソルトを基にハッシュ値を取得できること', async () => {
  // Act
  const result = hg.generateHashBySalt('test', 'salt')

  // Assert
  expect(result).toBe('generatedHash')
})

test('ハッシュ化対象の文字列を基にハッシュ値とソルトを取得できること', async () => {
  // Act
  const result = hg.generateHashAndSalt('test')

  // Assert
  expect(result[0]).toBe('generatedHash')
  expect(result[1]).toBe('generatedSalt')
})
