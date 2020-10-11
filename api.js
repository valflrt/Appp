const express = require("express");
const parser = require("body-parser");
const cors = require("cors");

const port = 8888;

const api = express();

api.use(cors());
api.use(parser.urlencoded({ extended: false }));

const db = require("./db");
const shemas = require("./shemasDB");

const classes = require("./classes");

const User = require("./shemas/user")

// log every request

api.use((req, res, next) => {
	let request = new classes.Connection(req);
	console.log(request);
	next();
});

// routes

api.get("/", (req, res) => {
	res.status(100).json({
		message: "Appp's api"
	});
});

// get all users

api.get("/users", (req, res) => {
	db.query("SELECT id, name FROM users")
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// create a new user

api.post("/users", (req, res) => {

	let { username, password, email } = req.query;

	let user = new User({
		username: username,
		password: password,
		email: email
	});

	console.log(user);

	if (user.isSuitable() === true) {
		shemas.addUser(user)
			.then((result) => {
				res.status(200).json({
					status: "user created and added successfully",
					user: user,
					databaseMessage: result
				});
			})
			.catch((err) => {
				res.status(500).json({
					error: "error while adding the user",
					databaseMessage: err
				});
			});
	} else {
		res.status(406).json(user.warns);
	};

});

api.put("/users/:id", (req, res) => {

	let { name, password, email } = req.query;

	let user = new classes.updatingUser({
		name: name,
		password: password,
		email: email
	});

	if (user.isSuitable === true) {
		shemas.updateUser(user, req.params.id)
			.then((result) => {
				res.status(200).json({
					status: "user updated successfully",
					user: user,
					databaseMessage: result
				});
			})
			.catch((err) => {
				res.status(500).json({
					error: "error while updating the user",
					databaseMessage: err
				});
			});
	} else {
		res.status(406).json(user.warns);
	};

});

// 404 handling

api.use((req, res) => {
	res.status(404).json({
		data: "404: Not found"
	});
});

// listenning

api.listen(port, () => {
	console.log("running at port %s", port);
});