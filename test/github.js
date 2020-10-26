require('dotenv').config()
const nock = require('nock')
const tap = require('tap')
const github = require('../lib/github')
const CONFIG = require('./fixtures/config')

tap.beforeEach(async () => {
  nock.disableNetConnect()
})

tap.afterEach(async () => {
  nock.cleanAll()
  nock.enableNetConnect()
})

tap.test('getPackageJson() handles NotFound reposiptory error', async tap => {
  nock('https://api.github.com')
    .post('/graphql')
    .reply(404, {
      errors: [
        { type: 'NOT_FOUND' }
      ]
    })

  tap.rejects(
    github.getPackageJson(CONFIG.DEP_ORG, CONFIG.DEP_REPO),
    new Error(`Could not find GitHub repository at https://www.github.com/${CONFIG.DEP_ORG}/${CONFIG.DEP_REPO}`)
  )
})

tap.test('getPackageJson() handles general error', async tap => {
  nock('https://api.github.com')
    .post('/graphql')
    .reply(500)

  tap.rejects(
    github.getPackageJson(CONFIG.DEP_ORG, CONFIG.DEP_REPO)
  )
})

tap.test('getPermissions() handles NotFound reposiptory error', async tap => {
  nock('https://api.github.com')
    .post('/graphql')
    .reply(404, {
      errors: [
        { type: 'NOT_FOUND' }
      ]
    })

  tap.rejects(
    github.getPermissions(CONFIG.DEP_ORG, CONFIG.DEP_REPO),
    new Error(`Could not find GitHub repository at https://www.github.com/${CONFIG.DEP_ORG}/${CONFIG.DEP_REPO}`)
  )
})

tap.test('getPermissions() handles general error', async tap => {
  nock('https://api.github.com')
    .post('/graphql')
    .reply(500)

  tap.rejects(
    github.getPermissions(CONFIG.DEP_ORG, CONFIG.DEP_REPO)
  )
})
