import hmacSHA3 from 'crypto-js/hmac-sha3'
import crypto from 'crypto-js'

export function generateHashAndSalt(target: string): [string, string] {
  const salt = crypto.lib.WordArray.random(128 / 8).toString()
  const hash = generateHashBySalt(target, salt)
  return [hash, salt]
}

export function generateHashBySalt(target: string, salt: string): string {
  return hmacSHA3(target, salt).toString()
}
