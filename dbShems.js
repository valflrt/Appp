const database = require('./db');
const toolbox = require("./tb")

exports.addUser = (user) => {

	return new Promise(function (resolve, reject) {

		let id = ""
		let { username, password, email } = user;

		database.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, password, email])
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
			database.query("UPDATE users SET username = ? WHERE id = ?", [user.name, id])
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