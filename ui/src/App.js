import React, { Component } from "react";
import './App.css';

class Main extends Component {
	constructor(props) {
		super();
		this.state = {
			message: ""
		}
	}

	componentDidMount() {
		fetch("http://localhost:3001")
			.then(res => res.json())
			.then(data => {
				this.setState({ message: data.message });
			});
	};

	render() {
		return (
			<h1>{this.state.message}</h1>
		);
	}
}

export default class App extends Component {
	render() {
		return (
			<div class="main">

				<div class="header">
					<h1>Strange food shop</h1>
					<div class="flex nav wrap">
						<a class="button" href="/">Home</a>
					</div>
				</div>

				<Main />

				<div id="footer" class="flex">
					<span>
						<a href="/" class="link">Home</a>
						<a href="/commande" class="link">Commander</a>
					</span>
					<span>
						<p class="notimportant" id="copyright">© 2020 Valentin Fleurit</p>
					</span>
				</div>

				<noscript>You need to enable JavaScript to run this app.</noscript>
			</div>
		);
	};
};