var requireGlobal = {
	'UwdMapProvider' : require('../provider/map')
};

//function UwdMapService() {}

var UwdMapService = {};

UwdMapService.addUser = function(req, res) {
	requireGlobal.UwdMapProvider.addUser(req.body, function(result){
		res.json(result);
	});
};

UwdMapService.remove = function(req, res) {
	//ToDo
};

UwdMapService.getPosition = function(req, res) {
	//ToDo
	//받아오는 객체의 이름이 reqString이라고 가정
	//inputStream.split('$');
	// [id, latitude, longitude, role]
	var self = this;
	var inputStream = req.body.data || req.body;
	var requestObject = {};
	var inputArr = [];
	var response = null;
	inputArr = inputStream.split('$');
	console.log(req.body);
	requestObject = {
		'id' : inputArr[0],
		'latitude' : inputArr[1],
		'longitude' : inputArr[2],
		'role' : inputArr[3]
	};
	requireGlobal.UwdMapProvider.getPosition(requestObject, function(result){
		if(result.result === true){
			response = self._makePositionString(result.data);
			res.send(response);	
		}
		else {
			res.send('empty');
		}
		
	});
};

UwdMapService._makePositionString = function(data){
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

UwdMapService.setPosition = function(req, res){
	//ToDo
};

UwdMapService.setOnline = function(req, res){
	//ToDo
};

UwdMapService.getOnline = function(req, res){
	//ToDo

};


module.exports = UwdMapService;
