/* Static dependencies */

/* JS dependencies */
import React from 'react';
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
		Constants.UI.LEVELS.forEach(function (level) {
			levels.push(
				<li ng-repeat="level in setup.levels">
					<div className={"hard-level btn " + level.CLASS } onClick={ self.handleLevelClick(level.PAIRS_NUM) }>
						<span className="level-label">{ level.TITLE }</span>
						<span className="level-pairs">{ level.PAIRS_NUM } pairs</span>
					</div>
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

	/* Event handlers */

	handleLevelClick (pairsNum) {
		console.log('handleLevelClick pairsNum = ', pairsNum);
	}

};

SetupLevel.propTypes = {
};