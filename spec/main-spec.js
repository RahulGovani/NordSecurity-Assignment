const app = require('../index')

describe('main/getCreds', function () {
  it ('testing getCreds - sunny day', async function () {
    const data = await app.getCreds('http://ptsv2.com/t/fu807-1554722621/post')
    expect(data.username && data.password && data.targetUrl).toBeTruthy()
  })

  it('testing getCreds with incorrect url', async function () {
    await app.getCreds('http://ptsv2xx.com/t/fu807-1554722621/post').catch(err => {
      expect(err.message).toContain('ENOTFOUND')
    })
  })
})

describe('main/auth', function () {
  it ('testing auth - sunny day', async () => {
    const data = await app.auth()
    console.log('Auth', data)
    expect('ip' in data && 'token' in data).toBeTrue()
  })

  it ('testing auth - incorrect creds', async () => {
    const creds = await app.getCreds('http://ptsv2.com/t/fu807-1554722621/post')
    spyOn(app, 'getCreds').and.resolveTo(Object.assign(creds, { password: '123123' }))
    await app.auth().catch(err => {
      expect(err.message).toContain('401')
    })
  })
})
