var express = require('express');
var router = express.Router();
const path = require('path')
const albumCollection = require(path.resolve('config/database')).get('albums')
/* GET home page. */
router.get('/', function(req, res, next) {
 
    albumCollection.find({},(err,albums)=>{
        if(err){        
        return    
        }        
        res.render('albums/albums',{albums:albums});
    })
});

router.get('/new', function(req, res, next) {
  res.render('albums/new_album');
})

router.post('/', function(req, res, next) {
    
    albumCollection.insert(req.body,(err,data) =>{
        res.redirect('albums');
    })
  
})


router.get('/:id', function(req, res, next){    
    
  albumCollection.findOne({_id : req.params.id}, (err, album) => {     
    res.render('albums/show_album', {album: album})
  })
})

router.get('/:id/edit', function(req, res, next) {
  albumCollection.findOne({_id : req.params.id}, (err, album) => {     
    res.render('albums/edit_album', {album: album})
    })
})

router.put('/:id', function(req, res, next) {
    console.log('In POST:Request Body: ',  req.body)
    albumCollection.findAndModify({
        'query': {_id: req.params.id},
        'update': {'$set': req.body}
            },(err,data) => {
        res.redirect('/albums');
    })
  
})

module.exports = router
