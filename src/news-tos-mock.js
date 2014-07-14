var db = {
      "1":{id:"1", newspaperUrl:"http://www.elsoldelcentro.com.mx", tosUrl:"", tosText:""},
      "2":{id:"2", newspaperUrl:"http://www.heraldo.mx", tosUrl:"", tosText:""},
      "3":{id:"3", newspaperUrl:"http://www.elvigia.net", tosUrl:"", tosText:""}
};

function findAll(callback) {
	setTimeout(function() {
		callback(null, db);
	}, 2000);
}

function findById(id, callback) {
	var record = db[id];
	if (record === undefined) {
		callback("record not found");
	} else {
		setTimeout(function() {
			callback(null, record);
		}, 2000);
	}
}

function upsert(id, record, callback) {
	var record = db[id];
	if (record === undefined) {
		db[id] = record;
		callback(null, true);
	} else {
		db[id] = record;
		callback(null, false);
	}
}

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.upsert = upsert;