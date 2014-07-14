var mysql = require("mysql"),
	config = require("./config"),
	connection = mysql.createConnection({
	  host     : config.MYSQL_HOST,
	  user     : config.MYSQL_USER,
	  password : config.MYSQL_PASS,
	  database : config.MYSQL_DATABASE
	});

function findAll(callback) {
	connection.query("SELECT * FROM mexico", function(err, rows){
		if (err) {
			return callback(err);
		}
		
		callback(null, rows);
	});
}

function findById(id, callback) {
	connection.query("SELECT * FROM mexico WHERE id = ?", [id], function(err, row){
		if (err) {
			return callback(err);
		}
		callback(null, row[0]);
	});
}

function update(record, callback) {
	var sql, inserts;
	if (record.tos_url === undefined) {
		sql = "UPDATE mexico SET tos_has_general = 1, tos_clean = ? WHERE id = ?";
		inserts = [record.tos_clean, record.id];
		sql = mysql.format(sql, inserts);
	} else {
		sql = "UPDATE mexico SET tos_has_general = 1, tos_has_url = 1, tos_url = ?, tos_html = ?, tos_clean = ? WHERE id = ?";
		inserts = [record.tos_url, record.tos_html, record.tos_clean, record.id];
		sql = mysql.format(sql, inserts);
	}
	connection.query(sql, function(err, rows){
		if (err) {
			return callback(err);
		}
		
		callback(null, rows);
	});
}

function findEmpty(callback) {
	connection.query("SELECT * FROM mexico WHERE tos_has_url = 0", function(err, rows) {
		if (err) {
			return callback(err);
		}
		if (rows.length === 0) {
			return callback(null, null);
		}
		return callback(null, rows[0]);
	});
}

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.update = update;
module.exports.findEmpty = findEmpty;