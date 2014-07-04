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
	console.log("[SERVER] Received Data : ");
	console.log(req.body);

	var self = this;
	var inputStream = req.body;//req.body.data || req.body;
	var requestObject = {};
	var response = null;
	
	requestObject = {
		'id' : inputStream.id,
		'latitude' : inputStream.latitude,
		'longitude' : inputStream.longitude,
		'role' : inputStream.role
	};
	requireGlobal.UwdMapProvider.getPosition(requestObject, function(result){
		if(result.result === true){
			response = self._makePositionString(result.data);
			console.log("[SERVER] Response Data : ");
			console.log(response);

			res.send(JSON.stringify(response));	
		}
		else {
			console.log("[SERVER] Response Data : Empty ");
			res.send(JSON.stringify('empty'));
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
