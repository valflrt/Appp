const database = require('./db');
const toolbox = require("./tb")

exports.addUser = (user) => {
	return new Promise(function (resolve, reject) {

		let { id, name, password } = user;
		let email = user.email || null;

		database.query("INSERT INTO users (id, name, password, email) VALUES (?, ?, ?, ?)", [id, name, password, email])
			.catch((err) => {
				if (err) {
					console.log(err);
					return reject(err);
				} else {
					return resolve(result);
				}
			});
	});
};