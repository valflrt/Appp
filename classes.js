// response class used to generate a proper response (json)

module.exports.Connection = class Connection {
	constructor(props) {
		this.path = props.path || undefined;
		this.method = props.method || undefined;
		this.query = props.body || undefined;
		this.ip = props.ip.split(":").pop() || undefined;
	};
};