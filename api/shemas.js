const database = require('./db')

exports.createDish = (dish) => {
	return new Promise(function (resolve, reject) {

		let { id, name, description, format } = dish;

		database.query("INSERT INTO dishes (id, name, description, image) VALUES (?, ?, ?, ?)", [id, name, description, id + "." + format])
			.catch((err) => {
				if (err) {
					console.log(err)
					return reject(err);
				};
				resolve(result);
			})
	});
};

/* apres par exemple ça c'est un petit programme pour inserer un nouveau "plat" dans la base
*/