/**
 * 入力値が半角数字かどうかチェック
 * 文字列中のスペースは許容
 */
const alphaNum = {
  validate(value: string) {
    if (value.replace(/\s+/g, '').match(/[^A-Za-z0-9]+/)) {
      return false
    }
    return true
  },
  message(field: string) {
    return `${field}は半角英数字で入力してください`
  },
}

export { alphaNum }
