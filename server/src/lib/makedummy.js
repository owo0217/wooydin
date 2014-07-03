//	126.9746545 경도
// 	37.2933638 위도

var makedummy = {};
var LONGITUDE = 126.87;
var LATITUDE = 37.2933638;
var mapProvider = require('../provider/map');

makedummy.makeRandomValue = function(){
	return (Math.floor(Math.random()*10000 - Math.random()*20000)/1000000000);
};

makedummy.addDummy = function(number){
	var self = this;
	var body = {};
	for(var i=0; i<number; i++){
		(function(m){
			body = {};
			body['id'] = 'man' + m;
			body['longitude'] = LONGITUDE + self.makeRandomValue();
			body['latitude'] = LATITUDE + self.makeRandomValue();
			body['online'] = true;
			body['role'] = m%2;
		})(i);
	}
};

module.exports = makedummy;