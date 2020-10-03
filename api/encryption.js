const bcrypt = require("bcrypt");

const saltRounds = 36;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports.hash = (password) => {
	return bcrypt.hashSync(password, salt);
};

module.exports.compare = (password, hashedPassword) => {
	return bcrypt.compareSync(password, hashedPassword);
};