/* Static dependencies */

/* JS dependencies */
import React from 'react';
import { Link } from 'react-router';

export default class Results extends React.Component {

	constructor (...args) {
		super(...args);

		this.state = {
		};
	}

	render () {
		return (
			<div className="congratulations-container">
				<div className="congratulations-label">Victory!</div>
				<Link to="/" className="play-again-label btn btn-primary">Play again</Link>
			</div>
		);
	}

};

Results.propTypes = {
};