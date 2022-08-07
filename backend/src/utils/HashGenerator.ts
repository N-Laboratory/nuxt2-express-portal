import hmacSHA3 from 'crypto-js/hmac-sha3'
import crypto from 'crypto-js'

export function generate(target: string): [string, string] {
  const salt = crypto.lib.WordArray.random(128 / 8)
  const hash = hmacSHA3(target, salt).toString()
  return [hash, salt.toString()]
}