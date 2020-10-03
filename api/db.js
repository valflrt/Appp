const mysql = require('mysql');

function query(queryStr, queryVars) {
	return new Promise(function (resolve, reject) {

		const db = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "AA_aa_11_#@",
			database: "Appp"
		});

		queryVars = queryVars || [];

		db.query(queryStr, queryVars, function (err, result) {
			if (err) {
				return reject(err);
			};
			return resolve(result);
		});
	});
};

exports.query = query;