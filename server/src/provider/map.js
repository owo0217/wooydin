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
mapGlobal.schemaItemKeyList = ['id', 'latitude', 'longitude', 'online', 'role'];
mapGlobal.schemaItemTypeList = ['String', 'Number', 'Number', 'Boolean', 'Number'];
mapGlobal.schemaObject = makeSchemaObject();
mapGlobal.mapSchema = new mapGlobal.schema(mapGlobal.schemaObject);
mapGlobal.mapModel = mongoose.model('uwdmap', mapGlobal.mapSchema);

function UwdMapProvider{}

UwdMapProvider.prototype.add = function(data, callback){
	//ToDo
	var doc = new mapGlobal.mapModel();
	var response = {};
	for(var key in data) {
		doc.key = data.key;
	}

	doc.save(function(err) {
		if(!err){
			response = {
				'result' : true
			}
		}
		else {
			response = {
				'result' : false
			}
		}
	}

	callback(response);
};

UwdMapProvider.prototype.remove = function(){
	//ToDo
};

UwdMapProvider.prototype.getPosition = function(data, callback){
	//ToDo
	var response = {};

	mapGlobal.mapModel.find({'id' : data.id, 'online' : true})
						.where('latitude').lte( data.latitude + mapConst.latitudeOffset )
						.where('longitude').lte( data.longitude + mapConst.longitudeOffset ).exec(function(err, docs){
							if(!err){
								response = {
									'result' : true,
									'data' : docs
								};
							}
							else {
								response = {
									'result' : false
								}
							}
						});

	callback(response);

};

UwdMapProvider.prototype.setOnline = function() {

};

UwdMapProvider.prototype.getOnline = function() {

};


function makeSchemaObject{
	var len = mapGlobal.schemaItemKeyList.length;
	var obj = {};
	for(var i = 0; i<len; i++) {
		(function(m){
			obj[ schemaItemKeyList[m] ] = schemaItemTypeList[m];
		})(i);
	}

	return obj;
}

module.exports = UwdMapProvider;