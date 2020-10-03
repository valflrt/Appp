exports.alphanum = function (length) {
	let string = "";
	for( ; string.length < length; string += Math.random().toString(36).substr(2));
	return  string.substr(0, length);
};

exports.isEmail = (input) => {
	let email = input.split("@")
	if (email.length >= 2) {
		if (email[1].split(".").length >= 2) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};