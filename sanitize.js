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
	};

	if (user.email.split("@").pop().includes(".") === false) {
		warns.push({
			name: "EMAIL",
			type: "STRUCTURE",
			problem: "email must contain \".\" after \"@\""
		});
	};

	require("./db").query("SELECT * FROM users WHERE email = ?", [user.email])
		.then((result) => {
			if (result.length !== 0) {
				warns.push({
					name: "EMAIL",
					type: "ALREADY_USED",
					problem: "email already in use"
				});
			};
		});

	// sanitized data returned

	return {
		name: user.name.toLowerCase(),
		password: encryption.hash(user.password),
		email: user.email || null,
		isSuitable: (() => {
			if (warns.length === 0) {
				return true;
			} else {
				return false;
			};
		})(),
		warns: warns
	};
};

// user updating sanitization

module.exports.userUpdating = (user) => {

	let warns = [];

	// username verification

	if (user.name) {

	}

	// password verification

	if (user.password) {
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
	}

	// email verification

	if (user.email) {
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
		};

		if (user.email.split("@").pop().includes(".") === false) {
			warns.push({
				name: "EMAIL",
				type: "STRUCTURE",
				problem: "email must contain \".\" after \"@\""
			});
		};

		require("./db").query("SELECT * FROM users WHERE email = ?", [user.email])
			.then((result) => {
				if (result.length !== 0) {
					warns.push({
						name: "EMAIL",
						type: "ALREADY_USED",
						problem: "email already in use"
					});
				};
			});
	}

	// sanitized data returned

	return {
		name: user.name,
		password: (() => {
			if (user.password) {
				return encryption.hash(user.password);
			} else {
				return null;
			};
		})(),
		email: user.email || null,
		isSuitable: (() => {
			if (warns.length === 0) {
				return true;
			} else {
				return false;
			};
		})(),
		warns: warns
	};
};

// user id sanitization

module.exports.id = (id) => {

};