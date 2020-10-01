import React, { Component } from "react";
import './App.css';

class Page extends Component {
	constructor(props) {
		super();
		this.setState({ title: props.title });
	};

	render() {
		return (
			<div>
				<h2>{this.state.title}</h2>
			</div>
		);
	};
};

export default class App extends Component {
	constructor() {
		super();
		this.setState({ data: {} });
	};

	componentDidMount() {
		fetch("http://localhost:8888/test")
			.then(res => res.json())
			.then(data => {
				this.setState({ data: data.data });
			});
	};

	render() {
		return (
			<div class="main">

				<div class="header">
					<h1>Strange food shop</h1>
					<div class="flex nav wrap">
						<a class="button" href="/">Home</a>
					</div>
				</div>

				<Page title={this.state.data} />

				<div id="footer" class="flex">
					<span>
						<p class="notimportant" id="copyright">© 2020 Valentin Fleurit</p>
					</span>
				</div>

				<noscript>You need to enable JavaScript to run this app.</noscript>
			</div>
		);
	};
};