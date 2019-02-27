import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor() {
		super();
		// Description of app - these are the values thar are going to change!
		this.state = {
			robots: [],
			searchfield: ''
		};
	}

	//Fetches user information from a server
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => {
				this.setState({ robots: users });
			});
	}

	// Once this function is triggered it will change the value of the searchfield to whatever is the input of the html search element.
	onSearchChange = event => {
		this.setState({ searchfield: event.target.value });
	};

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		// Creates a loading element to give extra feedback to user
		return !robots.length ? (
			<h1>Loading</h1>
		) : (
				<div className="tc">
					<h1 className="f1">RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<CardList robots={filteredRobots} />
					</Scroll>
				</div>
			);
	}
}

export default App;
