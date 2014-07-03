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
	'latitudeOffset' : 100,
	'longitudeOffset' : 100
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

	console.log(data);
	// mapGlobal.mapModel.find({'id' : data.id, 'online' : true})
	// 					.where('latitude').lte( data.latitude + mapConst.latitudeOffset )
	// 					.where('longitude').lte( data.longitude + mapConst.longitudeOffset ).exec(function(err, docs){
	// 						if(!err){
	// 							response = {
	// 								'result' : true,
	// 								'data' : docs
	// 							};
	// 							callback(response);
	// 						}
	// 						else {
	// 							response = {
	// 								'result' : false
	// 							};
	// 							callback(response);
	// 						}
	// 					});

	mapGlobal.mapModel.find({'id' : data.id, 'online' : true}, function(err, docs){
							console.log(docs, err);
							if(!err){
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