'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const db = require(path.resolve('config/database')).get('albums')
var album = {
    _id: '5555fb55c5ac555bad5e5555',
    Genre: 'Rock',
    Artist: 'Me',
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


    describe('Given when I visit show album page', () => {

        it('Then I show album details with heading Showing Album', () => {
            browser.get('/albums/5555fb55c5ac555bad5e5555')
            expect(element(by.tagName('h1')).getText()).toContain('Showing Album')
        })



        it('Then I show album details and check if edit link exists', () => {
            browser.get('/albums/5555fb55c5ac555bad5e5555')
            expect(element(by.tagName('a')).getAttribute('href')).toContain('edit')
        })
    })
})



//All code below rendered not needed cos mongo dont care and you can sent _id
// var id
        //  db.find({}, (err, album) => {     
        //  console.log("Inside Find in show",album)
        //  id=album._id
        //  console.log("In A test-->",album._id)
        //   browser.get('/albums/'+id)
        //  // console.log('Bworser',browser.getCurrentUrl())
        //  expect(element(by.tagName('h1')).getText()).toContain('Showing No Album')  
        //  done()
        //  })