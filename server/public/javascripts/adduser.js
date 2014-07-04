$(document).ready(function(){

	function addUser() {
		var _data = {};
		_data['id'] = $("#id").val();
		_data['latitude'] = $("#latitude").val();
		_data['longitude'] = $("#longitude").val();
		_data['online'] = true;
		_data['role'] = $("#role").val();

		console.log(_data);
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '/addUser',
			data : _data,
			success : function( result ) {
				console.log("[CLIENT] Result of user add : ")
				console.log( result );					
			},
			error : function( request, status, error ) {
				alert('req : ', request, '  status : ', status, '  error : ', error);
			}
		});
	}

	function getPosition() {
		var _data = {};
		_data['id'] = $("#id").val();
		_data['latitude'] = $("#latitude").val();
		_data['longitude'] = $("#longitude").val();
		_data['role'] = $("#role").val();

		console.log("[CLIENT] Request data for get position : ");
		console.log(_data);
		$.ajax({
			type : 'POST',
			dataType : 'text',
			url : '/getPosition',
			data : {'data' : _data},
			success : function( result ) {
				console.log("[CLIENT] Result of get position : ");
				console.log( result );					
			},
			error : function( request, status, error ) {
				alert('req : ', request, '  status : ', status, '  error : ', error);
			}
		});
	}


	$("#add").click(function(){
		addUser();
	});

	$("#getPosition").click(function(){
		getPosition();
	})
})