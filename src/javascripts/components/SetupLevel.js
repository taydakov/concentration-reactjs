/* Static dependencies */

/* JS dependencies */
import React from 'react';
import { Link, History } from 'react-router';
import Constants from '../constants/Constants';
/** Components **/
import MainTitle from './MainTitle';

export default class SetupLevel extends React.Component {

	constructor (...args) {
		super(...args);

		this.state = {
		}
	};

	render () {
		var self = this;

		var levels = [];
		Constants.UI.LEVELS.forEach(function (level, index) {
			levels.push(
				<li key={ index }>
					<Link to={ "/play/" + level.PAIRS_NUM }>
						<div className={"hard-level btn " + level.CLASS }>
							<span className="level-label">{ level.TITLE }</span>
							<span className="level-pairs">{ level.PAIRS_NUM } pairs</span>
						</div>
					</Link>
				</li>
			);
		});

		return (
			<div className="container">
				<MainTitle/>
				<div className="difficulty-selection">
					<span className="difficulty-label">Choose difficulty</span>
					<ul className="difficulty-levels">
						{ levels }
					</ul>
				</div>
			</div>
		);
	}

};

SetupLevel.propTypes = {
};