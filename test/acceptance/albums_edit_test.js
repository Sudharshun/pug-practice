'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const db = require(path.resolve('config/database')).get('albums')
var album = {
    _id: '7777fb77c7ac777bad7e7777',
    Genre: 'Rock',
    Artist: 'You',
    Album: 'I am the Best!'
}
describe('Given an Albums Application', () => {
    beforeAll(() => {
        const server = http.createServer(app)
        server.listen(0)
        browser.baseUrl = 'http://localhost:' + server.address().port
        browser.ignoreSynchronization = true
    })

    beforeEach(function (done) {
        db.insert(album, done);
        return browser.ignoreSynchronization = true;
    })

    afterEach(function () {
             db.remove({});
    })


    describe('Given I visit edit album page', () => {

        it('Then I have heading Edit Album', () => {
            browser.get('/albums/7777fb77c7ac777bad7e7777/edit')
            expect(element(by.tagName('h1')).getText()).toContain('Edit')
        })

        it('Then I edit album and check if update link exists', () => {
          //browser.get('/albums/7777fb77c7ac777bad7e7777/edit')
            expect(element.all(by.tagName('input')).get(8).getAttribute('value')).toContain('Update')
        })

        it('Then I edit album and check if cancel button exists', () => {
         //   browser.get('/albums/7777fb77c7ac777bad7e7777/edit')
            expect(element(by.tagName('a')).getText()).toContain('cancel')
        })

         it('Then I see labels for artist,album,genre', () => {
         // browser.get('/albums/7777fb77c7ac777bad7e7777/edit')
            var labelList = element.all(by.tagName('label'))
            expect(labelList.get(0).getText()).toContain('Artist')
            expect(labelList.get(1).getText()).toContain('Album')
            expect(labelList.get(2).getText()).toContain('Genre')
            expect(labelList.get(3).getText()).toContain('Stars')
            expect(labelList.get(4).getText()).toContain('1')
            expect(labelList.get(5).getText()).toContain('5')
            expect(labelList.get(6).getText()).toContain('Contains Explicit Lyrics')
        })

        
        it('Then I see a Drop down with values for genre', () => {
         // browser.get('/albums/7777fb77c7ac777bad7e7777/edit')
            let optionList = element.all(by.tagName('option'))
            expect(element(by.tagName('select')).getAttribute("name")).toEqual('Genre')
            expect(optionList.get(0).getAttribute("value")).toEqual('Rock')
            expect(optionList.get(1).getAttribute("value")).toEqual('Alternative')
            expect(optionList.get(2).getAttribute("value")).toEqual('Jazz')
            expect(optionList.get(3).getAttribute("value")).toEqual('Classical')
            expect(optionList.get(4).getAttribute("value")).toEqual('Folk')
            expect(optionList.get(5).getAttribute("value")).toEqual('Disco')
            expect(optionList.get(0).getAttribute("selected")).toEqual('true')
        })


        it('Then I see Text input fields for artist,album', () => {
         
            let txtList = element.all(by.tagName('input'))
            expect(txtList.get(0).getAttribute("name")).toEqual('Artist')
            expect(txtList.get(0).getAttribute("type")).toEqual('text')
            expect(txtList.get(0).getAttribute("value")).toEqual(album.Artist)
            expect(txtList.get(1).getAttribute("name")).toEqual('Album')
            expect(txtList.get(1).getAttribute("type")).toEqual('text')
            expect(txtList.get(1).getAttribute("value")).toEqual(album.Album)
        })


        it('Then I see a Radio button with values for starts', () => {
    
            let radioButtonsSelection = element.all(by.name('albumStars'))   
            expect(radioButtonsSelection.get(0).getAttribute("value")).toEqual('1')
            expect(radioButtonsSelection.get(1).getAttribute("value")).toEqual('2')
            expect(radioButtonsSelection.get(2).getAttribute("value")).toEqual('3')
            expect(radioButtonsSelection.get(3).getAttribute("value")).toEqual('4')
            expect(radioButtonsSelection.get(4).getAttribute("value")).toEqual('5')
        })

        it('Then check box should be dsiplayed ', () => {
            expect(element(by.name('explicit_contain')).getAttribute("type")).toEqual('checkbox')
        })


    })
})
