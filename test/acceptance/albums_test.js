'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const db = require(path.resolve('config/database')).get('albums')
 var album = {
    genre : 'Self Indulgence',
    artist : 'Me',
    name : 'I am the Best!'
  }


  

describe('Given an Albums Application', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })

    beforeEach(function(done) {
    db.remove({});
    db.insert(album, done);

    return browser.ignoreSynchronization = true;

    });

    afterEach(function() {
    db.remove({});
    })

  
  describe('Given when I am in the Albums Page', () => {
    
    it('Then I see Albums title', () => {
      browser.get('/albums')
      expect(element(by.tagName('h1')).getText()).toEqual('Albums')
    })

    it('Then I see a link that would take me to create a new albums', () => {
      expect(element(by.tagName('a')).getAttribute('href')).toContain('/albums/new')
    })

    it('Then I see a table with a list of current albums', () => {
      expect(element(by.tagName('table')).isPresent()).toBeTruthy()
    })
   

    it('Then I see a listing of Albums from the database', () => { 
      browser.get('/albums');
        expect(element(by.tagName('td')).getText()).toEqual('Me')
     })


  }) 

  

})