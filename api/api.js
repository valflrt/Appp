const express = require("express");
const parser = require("body-parser");
const cors = require("cors");

const port = 8888;

const api = express();

api.use(cors());
api.use(parser.urlencoded({ extended: false }));

// response class used to generate a proper response (json)

class Connection {
	constructor(props) {
		this.path = props.path || undefined;
		this.method = props.method || undefined;
		this.query = props.body || undefined;
		this.ip = props.ip.split(":").pop() || undefined;
	};
};

// log every request

api.use((req, res, next) => {
	let request = new Connection(req);
	console.log(request);
	next();
});

// routes

api.get("/", (req, res) => {
	res.status(200).json({
		"data": "This is home ^^"
	});
});

api.get("/test", (req, res) => {
	res.status(200).json({
		"data": "It works !!!"
	});
});

// 404 handling

api.use((req, res) => {
	res.status(404).json({
		"data": "404: Not found"
	})
});

// listenning

api.listen(port, () => {
	console.log("running at port %s", port);
});