/* Static dependencies */

/* JS dependencies */
import React from 'react';
import { Link } from 'react-router';
/** React Components **/
import MainTitle from './MainTitle';
// import ChooseLevel from './ChooseLevel';
/** Stores **/
// import FiltersStore from '../stores/FiltersStore';
/** Action creators **/
// import FiltersActionCreators from '../actions/FiltersActionCreators';

function getStoresState (ConcentrationGameAppObj) {
	return {
		// filters: FiltersStore.getState()
	};
}

export default class ConcentrationGameApp extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = getStoresState(this);
	}

	render () {
		var self = this;

		return (
			<div className='container'>
				<MainTitle />
				{ self.props.children }
			</div>
		);
	}

	/* Event handlers */

	handleFilterClicked (selectedFilters) {
		console.log('ConcentrationGameApp.handleFilterClicked selectedFilters=', selectedFilters);
	}

	_onChange () {
		var newState = getStoresState(this);
		this.setState(newState);
	}
};
