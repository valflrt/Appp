// password encryption module

const encryption = require("./encryption");

// user class

module.exports = class User {

	// constructor

	constructor(data) {
		this.warns = new Array();

		this.setUsername(data.username);
		this.setPassword(data.password);
		this.setEmail(data.email);

		this.updating = data.updating || false;
	};

	// function to set username

	setUsername(username) {
		if (username === undefined && this.updating === false) {
			this.pushWarn({
				name: "USERNAME",
				type: "NULL",
				problem: "User must have an username"
			});

			this.username = null;
		} else if (username === undefined && this.updating === true) {
			this.username = null;
		} else {
			if (username.length > 100) {
				pushWarn({
					name: "USERNAME",
					type: "LENGTH",
					problem: "The name must contain less than 100 characters"
				});
			};

			try {
				this.username = username;
			} catch (err) {
				this.pushWarn(err);
			};
		};
	};

	// function to set password

	setPassword(password) {
		if (password === undefined && this.updating === false) {
			this.pushWarn({
				name: "PASSWORD",
				type: "NULL",
				problem: "User must have a password"
			});

			this.password = null;
		} else if (password === undefined && this.updating === true) {
			this.password = null;
		} else {
			if (password.length < 6 || password.length > 100) {
				warns.push({
					name: "PASSWORD",
					type: "LENGTH",
					problem: "password must be more than 6 characters and less than 100 characters"
				});
			};

			if (!/[0-9]/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
				warns.push({
					name: "PASSWORD",
					type: "STRUCTURE",
					problem: "password must contain at least: one upper letter, one lower letter and one number"
				});
			};

			try {
				this.password = encryption.hash(password);
			} catch (err) {
				this.pushWarn(err);
			};
		};
	};

	// function to set email

	setEmail(email) {
		if (email === undefined) {
			this.email = null;
		} else {
			if (email.length > 100) {
				warns.push({
					name: "EMAIL",
					type: "LENGTH",
					problem: "email must be less than 100 characters"
				});
			};

			if (email.includes('@') === false) {
				warns.push({
					name: "EMAIL",
					type: "STRUCTURE",
					problem: "email must contain \"@\""
				});
			};

			if (email.split("@").pop().includes(".") === false) {
				warns.push({
					name: "EMAIL",
					type: "STRUCTURE",
					problem: "email must contain \".\" after \"@\""
				});
			};

			try {
				this.email = email;
			} catch (err) {
				this.pushWarn(err);
			};
		}
	};

	// function to add a warn to the warns array

	pushWarn(warn) {
		this.warns.push(warn);
	};

	// function to verify if the user is ready to insert in the db (no warns)

	isSuitable() {
		if (this.warns.length === 0) {
			return true;
		} else {
			return false;
		};
	};
};