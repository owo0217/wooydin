var mongoose = require('mongoose');
var mapGlobal = {};
var mapConst = {};

mapGlobal = {
	'schema' : {},
	'schemaItemKeyList' : [],
	'schemaItemTypeList' : [],
	'schemaObject' : {},
	'mapSchema' : {},
	'mapModel' : {}
};

mapConst = {
	'latitudeOffset' : 0.02,
	'longitudeOffset' : 0.02
};

mapGlobal.schema = mongoose.Schema;
mapGlobal.schemaObject = {
	'id' : String,
	'latitude' : Number,
	'longitude' : Number,
	'online' : Boolean,
	'role' : Number
};
mapGlobal.mapSchema = new mapGlobal.schema(mapGlobal.schemaObject);
mapGlobal.mapModel = mongoose.model('uwdmap', mapGlobal.mapSchema);

var UwdMapProvider = {};

UwdMapProvider.addUser = function(data, callback){
	//ToDo
	var doc = new mapGlobal.mapModel();
	var response = {};
	doc.id = data.id;
	doc.latitude = data.latitude;
	doc.longitude = data.longitude;
	doc.online = data.online;
	doc.role = data.role;

	doc.save(function(err) {
		if(!err){
			response = {
				'result' : true
			};
			callback(response);
		}
		else {
			response = {
				'result' : false
			};
			callback(response);
		}
	});


};

UwdMapProvider.remove = function(){
	//ToDo
};

UwdMapProvider.getPosition = function(data, callback){
	//ToDo
	var response = {};
	console.log(parseFloat(data.longitude));
	mapGlobal.mapModel.find({
		'online' : true,
		'longitude' : {'$gte' : parseFloat(data.longitude) - mapConst.longitudeOffset, '$lte' : parseFloat(data.longitude) + mapConst.longitudeOffset},
		'latitude' : {'$gte' : parseFloat(data.latitude) - mapConst.latitudeOffset, '$lte' : parseFloat(data.latitude) + mapConst.latitudeOffset }
	}).exec(function(err, docs){
		if(!err && (docs.length > 0) ) {
			response = {
				'result' : true,
				'data' : docs
			};
			callback(response);
		}
		else {
			response = {
				'result' : false
			};
			callback(response);
		}
	});
};

UwdMapProvider.setOnline = function() {

};

UwdMapProvider.getOnline = function() {

};

module.exports = UwdMapProvider;