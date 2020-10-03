// user sanitization

module.exports.user = (user) => {
	const encryption = require("./encryption");

	let warns = [];

	// username verification

	if (user.name.length > 100) {
		warns.push({
			name: "USERNAME",
			type: "LENGTH",
			problem: "The name must contain less than 100 characters"
		});
	};

	// password verification

	if (user.password.length < 6 || user.password.length > 100) {
		warns.push({
			name: "PASSWORD",
			type: "LENGTH",
			problem: "password must be more than 6 characters and less than 100 characters"
		});
	};

	if (!/[0-9]/.test(user.password) || !/[A-Z]/.test(user.password) || !/[a-z]/.test(user.password)) {
		warns.push({
			name: "PASSWORD",
			type: "STRUCTURE",
			problem: "password must contain at least: one upper letter, one lower letter and one number"
		});
	};

	// email verification

	if (user.email.length > 100) {
		warns.push({
			name: "EMAIL",
			type: "LENGTH",
			problem: "email must be less than 100 characters"
		});
	};

	if (user.email.includes('@') === false) {
		warns.push({
			name: "EMAIL",
			type: "STRUCTURE",
			problem: "email must contain \"@\""
		});
	}

	if (user.email.split("@").pop().includes(".") === false) {
		warns.push({
			name: "EMAIL",
			type: "STRUCTURE",
			problem: "email must contain \".\" after \"@\""
		});
	}

	// sanitized data returned

	if (warns.length <= 0) {
		const isSuitable = true;
	};

	return {
		name: user.name.toLowerCase(),
		password: encryption.hash(user.password),
		email: user.email || null,
		isSuitable: isSuitable,
		warns: warns
	};
};

// user id sanitization

module.exports.id = (id) => {
	let database = require("./db");

	database.query("SELECT * FROM users WHERE id = ?", [id])
		.then((result) => {
			if (result.length < 0) {
				return true;
			} else {
				return false;
			}
		});
};