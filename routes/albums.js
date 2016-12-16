var express = require('express');
var router = express.Router();
const path = require('path')
const albumCollection = require(path.resolve('config/database')).get('albums')
/* GET home page. */
router.get('/', function(req, res, next) {
 
    albumCollection.find({},(err,albums)=>{
        if(err){
        console.log("Error",err)
        return    
        }
        console.log("In get DB Items",albums)
        res.render('albums/albums',{albums:albums});
    })
});

router.get('/new', function(req, res, next) {
  res.render('albums/new_album');
})

router.post('/', function(req, res, next) {
    console.log('In POST:Request Body: ',  req.body)
    albumCollection.insert(req.body,(err,data) =>{
        res.redirect('albums');
    })
  
})


router.get('/:id', function(req, res, next){
    console.log("In get id ")
  albumCollection.findOne({_id : req.params.id}, (err, album) => {
      console.log("Found Id",album)
    res.render('albums/show_album', {album: album})
  })
})

module.exports = router;
