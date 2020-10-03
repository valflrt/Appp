const express = require("express");
const parser = require("body-parser");
const cors = require("cors");

const port = 8888;

const api = express();

api.use(cors());
api.use(parser.urlencoded({ extended: false }));

const db = require("./db");
const shemas = require("./shemas");

const sanitize = require("./sanitize");

const classes = require("./classes");

// log every request

api.use((req, res, next) => {
	let request = new classes.Connection(req);
	console.log(request);
	next();
});

// routes

api.get("/", (req, res) => {
	res.status(100).json({
		"message": "Appp's api"
	});
});

api.get("/users", (req, res) => {
	db.query("SELECT * FROM users")
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

api.post("/users/add", (req, res) => {

	let { name, password, email } = req.query;

	let user = new classes.User({
		name: name,
		password: password,
		email: email
	});

	console.log(user);

	shemas.addUser(user)
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(500).json(err);
		});

});

// 404 handling

api.use((req, res) => {
	res.status(404).json({
		"data": "404: Not found"
	});
});

// listenning

api.listen(port, () => {
	console.log("running at port %s", port);
});