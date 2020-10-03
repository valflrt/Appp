// response class used to generate a proper response (json)

module.exports.Connection = class Connection {
	constructor(props) {
		this.path = props.path || undefined;
		this.method = props.method || undefined;
		this.query = props.body || undefined;
		this.ip = props.ip.split(":").pop() || undefined;
	};
};

// user constructor

const bcrypt = require("bcrypt");
const toolbox = require("./tb");
const sanitize = require("./sanitize");

module.exports.User = class User {
	constructor(user) {
		let sanitizedUser = sanitize.user(user)
		this.findId();
		this = sanitizedUser;
	};

	findId() {
		this.id = toolbox.alphanum(16);
		while (sanitize.id(this.id) === false) {
			this.id = toolbox.alphanum(16);
		};
	};
};