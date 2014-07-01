var express = require('express');
var router = express.Router();

var routingList = {
	'mapService' : require('../src/http/map');
}

/* GET home page. */
router.get('/', function(req, res) {
});

/* POST */

router.post('/getPosition', function(req, res){
	//ToDo : Routing to getPosition Logic
	routingList.mapService.getPosition(req, res);
});

module.exports = router;
