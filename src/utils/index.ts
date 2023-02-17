import { Protocol } from 'puppeteer'

export const testIdSelector = (id: string) => `[data-testid="${id}"]`

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const getDomain = (url: string) => new URL(url).hostname

export const getCookieById = (
  cookies: Protocol.Network.Cookie[],
  id: string,
) => {
  const cookie = cookies.find((cookie) => cookie.name === id)
  if (cookie) {
    return cookie.value
  }
  return ''
}

export const isMacOS = () => process.platform === 'darwin'
