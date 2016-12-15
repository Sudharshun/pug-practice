
'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))

describe('Given an Albums Application', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })

  describe('Given when I visit Main Page', () => {
    it('Then I see OMG Albums', () => {
      browser.get('/')
      expect(element(by.tagName('h1')).getText()).toEqual('OMG Albums!')
    })
    it('Then I see a link that would take me to the list of albums', () => {
      expect(element(by.tagName('a')).getAttribute('href')).toContain('/albums')
    })
  }) 

  }) 