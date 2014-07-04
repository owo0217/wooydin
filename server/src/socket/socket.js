var socketGlobal = {
	'net' : null,
	'server' : null,
	'socketList' : {},
	'matchingList' : {} // key : value = 'id' : 'clientSocket'
}

socketGlobal.net = require('net');
socketGlobal.server = socketGlobal.net.createServer( function(client){
	if(client){
		client.setEncoding('utf-8');
		
		client.on('data', function(data){
			dataHandler(data, client);
		});
		
		client.on('end', function(data){
			connectionEndHandler();
		});
		client.on('error', function(){
			errorHandler(err)
		});
	}
});

/*
	0. new socket
		Input
			[TYPE]$[My ID]

	1. connect other user
		Input
			[TYPE]$[My ID]$[Target ID]

	2. send to other user
		Input
			[TYPE]$[My ID]$[Target ID]$[Message]
		Output
			[TYPE]$[My ID]$[Message]

	** Type
		0. NEW
		1. CONNECT
		2. SEND
*/
function dataHandler(data, socket){
	var type = null;
	var target = null;
	var msg = null;

	var strArray = [];
	var dataString = data.toString();

	//dataString = trim(dataString);
	strArray = dataString.split('$');

	switch(strArray[0]){
		case 'CONNECT':
			newMatching(strArray[1], strArray[2]);
			break;
		case 'SEND':
			sendMessage(strArray[1], strArray[2], strArray[3]);
			break;
		case 'NEW':
			newConnect(strArray[1], socket);
			break;
	}
}

function newConnect(myID, socket) {
	if( !socketList[myID] ) {
		socketList[myID] = socket;
	}
}

function newMatching(myID, targetID){
	if( !matchingList[myID] ) {
		matchingList[myID] = [];
		matchingList[myID].push(targetID);
	}
}

function sendMessage(myID, targetID, message) {
	if(socketList[targetID]){
		var targetSocket = socketList[targetID];
		if(matchingList[myID].indexOf(targetID) !== -1) {
			targetSocket.write('SEND$' + myID + '$' + message);
		}
	}
	
}

function errorHandler(socket){
	//ToDo
}
function connectionEndHandler(socket){
	//ToDo
}

function trim(string) {
	string += ''; // 숫자라도 문자열로 변환
	return string.replace(/^\s*|\s*$/g, '');
}//end of trim


//socket listening
socketGlobal.server.listen(20512, function(){
	console.log("server Bound (port : 20512)");
});



