/**
 *入力値が半角数字がチェック
 */
const alphaNum = {
  validate(value: string) {
    if (value.match(/[^A-Za-z0-9]+/)) {
      return false
    }
    return true
  },
  message(field: string) {
    return `${field}は半角英数字で入力してください`
  },
}

export { alphaNum }
