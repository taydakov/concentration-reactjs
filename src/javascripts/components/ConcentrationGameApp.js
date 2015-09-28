/* Static dependencies */

/* JS dependencies */
import React from 'react';
import { Link } from 'react-router';
/** React Components **/
import MainTitle from './MainTitle';

export default class ConcentrationGameApp extends React.Component {

	render () {
		var self = this;

		return (
			<div className='container'>
				<MainTitle />
				{ self.props.children }
			</div>
		);
	}

};
