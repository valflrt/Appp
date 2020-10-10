const database = require('./db');
const toolbox = require("./tb")

exports.addUser = (user) => {

	return new Promise(function (resolve, reject) {

		let id = "CONCAT(CHAR(FLOOR(RAND()*26)+65),FLOOR(100+RAND()*(500-100)))"
		let { name, password, email } = user;

		database.query("INSERT INTO users (id, name, password, email) VALUES (?, ?, ?, ?)", [id, name, password, email])
			.then((result) => {
				return resolve(result);
			})
			.catch((err) => {
				return reject(err);
			});
	});
};

exports.updateUser = (user, id) => {

	return new Promise(function (resolve, reject) {

		const encryption = require("./encryption");

		let results = [];
		let errors = [];

		if (user.name) {
			database.query("UPDATE users SET name = ? WHERE id = ?", [user.name, id])
				.then((result) => {
					results.push(result);
				})
				.catch((err) => {
					errors.push(err);
				});
		}

		if (user.password) {
			database.query("UPDATE users SET password = ? WHERE id = ?", [user.password, id])
				.then((result) => {
					results.push(result);
				})
				.catch((err) => {
					errors.push(err);
				});
		}

		if (user.email) {
			database.query("UPDATE users SET email = ? WHERE id = ?", [user.email, id])
				.then((result) => {
					results.push(result);
				})
				.catch((err) => {
					errors.push(err);
				});
		};

		if (errors.length !== 0) {
			return reject(errors);
		} else {
			return resolve(result);
		};

	});
};