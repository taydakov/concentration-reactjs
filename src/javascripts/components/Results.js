/* Static dependencies */

/* JS dependencies */
import React from 'react';

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
				<a href="#/" className="play-again-label btn btn-primary">Play again</a>
			</div>
		);
	}

};

Results.propTypes = {
};