/* Static dependencies */

/* JS dependencies */
import React from 'react';

export default class NoMatch extends React.Component {

	constructor (...args) {
		super(...args);

		this.state = {
		};
	}

	render () {
		return (
			<div class="text-center">
				<h4>Page Not Found</h4>
				<h1>404</h1>
			</div>
		);
	}

};

NoMatch.propTypes = {
};