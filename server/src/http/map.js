var requireGlobal = {
	'UwdMapProvider' : null
};

requireGlobal.UwdMapProvider = require('../provider/map');

function UwdMapService {}

UwdMapService.prototype.add = function(req, res) {
	//ToDo
	
};

UwdMapService.prototype.remove = function(req, res) {
	//ToDo
};

UwdMapService.prototype.getPosition = function(req, res) {
	//ToDo
	//받아오는 객체의 이름이 reqString이라고 가정
	//inputStream.split('$');
	// [id, latitude, longitude, role]
	var self = this;
	var inputStream = req.body.data;
	var requestObject = {};
	var inputArr = [];
	var response = null;
	inputArr = inputStream.split('$');
	requestObject = {
		'id' : inputArr[0],
		'latitude' : inputArr[1],
		'longitude' : inputArr[2],
		'role' : inputArr[3]
	};
	requireGlobal.UwdMapProvider.getPosition(requestObject, function(result){
		if(result === true){
			response = self._makePositionString(result.data);
			res.send(response);	
		}
		else {
			res.send('empty');
		}
		
	});
};

UwdMapService.prototype._makePositionString = function(data){
	var returnString = "";
	var len = data.length;
	for(var i = 0 ; i < len ; i++){
		(function(m){
			returnString += data[i].id + '$';
			returnString += data[i].latitude + '$';
			returnString += data[i].longitude + '$';
			returnString += data[i].online + '$';
			returnString += data[i].role + '#'; 
		})(i);
	}
	return returnString;
};

UwdMapService.prototype.setPosition = function(req, res){
	//ToDo
};

UwdMapService.prototype.setOnline = function(req, res){
	//ToDo
};

UwdMapService.prototype.getOnline = function(req, res){
	//ToDo

};


module.exports = UwdMapService;
