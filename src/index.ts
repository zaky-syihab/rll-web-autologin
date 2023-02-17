import { getCookieById, getDomain, isMacOS } from './utils/index'
import { IToken } from './interface'
import puppeteer, { Protocol } from 'puppeteer'
import { testIdSelector, delay } from './utils'
import parseArgs, { ParsedArgs } from 'minimist'

const getToken = async (
  email: string,
  password: string,
  loginUrl: string,
  verbose = false,
): Promise<IToken> => {
  try {
    console.log('Getting tokens...')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const url = loginUrl

    await page.goto(url)

    //   Login
    await page.type(testIdSelector('input-username'), email)
    await page.type(testIdSelector('input-password'), password)
    await page.click(testIdSelector('button-submit'))

    await delay(2000)

    //   Get Cookies
    const cookies = await page.cookies()
    const access_token = getCookieById(cookies, 'access_token')
    const refresh_token = getCookieById(cookies, 'refresh_token')
    const chat_token = getCookieById(cookies, 'chat_token')

    await browser.close()

    console.log('Tokens successfully retrieved')
    return {
      access_token,
      refresh_token,
      chat_token,
    }
  } catch (error) {
    console.error('ERROR: Failed to get tokens')
    verbose && console.error(error)

    return {
      access_token: '',
      refresh_token: '',
      chat_token: '',
    }
  }
}

const setToken = async (
  tokens: IToken,
  targetUrl: string,
  verbose = false,
) => {
  try {
    console.log('Setting tokens...')
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: isMacOS()
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : undefined,
      defaultViewport: null,
      args: [
        '--start-maximized',
        // Does not work on Apple Silicon (M1)
        // "--user-data-dir=/Users/zsyihab/Library/Application Support/Google/Chrome",
      ],
    })
    const page = await browser.newPage()

    const url = targetUrl
    const domain = getDomain(url)

    await page.goto(url)

    const cookies: Protocol.Network.CookieParam[] = Object.keys(
      tokens,
    ).map((key) => ({
      name: key,
      // @ts-expect-error
      value: tokens[key],
      domain,
      path: '/',
    }))

    await page.setCookie(...cookies)
    console.log('Tokens successfully set')

    page.reload()
  } catch (error) {
    console.error('ERROR: Failed to set tokens')
    verbose && console.error(error)

    return
  }
}

;(async () => {
  const {
    u: email,
    p: password,
    l: loginUrl,
    t: targetUrl,
    v: verbose,
  }: ParsedArgs = parseArgs(process.argv.slice(2))

  const tokens = await getToken(email, password, loginUrl, verbose)

  if (tokens.access_token && tokens.refresh_token) {
    await setToken(tokens, targetUrl, verbose)
  } else {
    console.error('ERROR: Token does not exist')
  }

  return undefined
})()
