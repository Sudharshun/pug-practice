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
        console.log("DB Items",albums)
        res.render('albums/albums',{albums:albums});
    })
});

router.get('/new', function(req, res, next) {
  res.render('albums/new_album');
});


module.exports = router;
