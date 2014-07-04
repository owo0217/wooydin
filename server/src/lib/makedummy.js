//자과캠
//	126.9746545 경도
// 	37.2933638 위도

//인사캠
//경도 126.9921594
//위도 37.5879535

/* 가장자리 위치 */
//126.9737502
// 37.2987294


var makedummy = {};
var LONGITUDE = 126.9921594;
var LATITUDE = 37.5879535;
var mapProvider = require('../provider/map');

makedummy.makeRandomValue = function(){
	var ret = (Math.floor(Math.random()*100000 - Math.random()*200000)/1000000000);
	return ret;
};

makedummy.addDummy = function(number){
	var self = this;
	var body = {};
	for(var i=0; i<number; i++){
		(function(m){
			body = {};
			body['id'] = 'm_woman' + m;
			body['longitude'] = LONGITUDE + self.makeRandomValue();
			body['latitude'] = LATITUDE + self.makeRandomValue();
			body['online'] = true;
			body['role'] = m%2;
			mapProvider.addUser(body, function(res){});
		})(i);
	}

};

module.exports = makedummy;