var express = require('express');
var router = express.Router();

var routingList = {
	'mapService' : require('../src/http/map')
}

/* GET home page. */
router.get('/', function(req, res) {
	//res.redirect('../views/index');
	res.render('../views/index.jade');
});

router.get('/add', function(req, res){
	res.render('../views/administrator/addUser.jade');
});

/* POST */
router.post('/addUser', function(req, res){
	routingList.mapService.addUser(req, res);
});
router.post('/getPosition', function(req, res){
	console.log('here');
	routingList.mapService.getPosition(req, res);
});

module.exports = router;
