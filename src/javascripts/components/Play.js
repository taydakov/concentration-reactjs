/* Static dependencies */

/* JS dependencies */
import React from 'react';
import ConcentrationGame from '../models/ConcentrationGame';

export default class Play extends React.Component {

	constructor (...args) {
		super(...args);

		this.state = {
			cards:       [],
			matchesLeft: null,
			progress:    0
		};
	}

	componentWillMount () {
		var self = this;

		var pairsNum = this.props.params ? this.props.params.pairsNum : 1;

		self.concentrationGame = new ConcentrationGame(pairsNum);
		/* Game Event Handlers */
		self.concentrationGame.on('cardsChanged', function (newCards) {
			self.setState({
				cards: newCards
			});
		});
		self.concentrationGame.on('matchFound', function (matchesLeft, progress) {
			console.log('matchFound');
			self.setState({
				matchesLeft: matchesLeft,
				progress:    progress
			});
		});
		self.concentrationGame.on('gameWon', function () {
			console.log('gameWon');
			// FIXME: replace with react router transition function
			window.location.replace('/#/results');
		});

		self.setState({
			cards: self.concentrationGame.cards
		});
	}

	render () {
		var self = this;

		var cards = [];
		this.state.cards.forEach(function (card, index) {
			var cardClassName = card.flipped ? 'flipped' : '';
			cards.push(
				<li className="flip-card" key={ index }>
					<div className={ "flip-container " + cardClassName } onClick={ self.handleCardClick.bind(self)(card) }>
						<div className="flipper">
							<div className="flip-card-front">
								<img className="flip-card-image" src="images/cards/hidden_card.png" />
							</div>
							<div className="flip-card-back">
								<img className="flip-card-image" src={ "images/cards/" + card.rank + "_of_" + card.suit + ".png" } />
							</div>
						</div>
					</div>
				</li>
			);			
		});

		return (
			<div className="container">
				<div className="flip-cards-container">
					<ul className="flip-cards-grid">
						{ cards }
					</ul>
				</div>
				<div className="progress">
					<div className="progress-bar" role="progressbar" aria-valuenow={ this.state.progress } aria-valuemin="0" aria-valuemax="100" style={{ width: this.state.progress + "%" }}>
						{ this.state.matchesLeft } pairs left
					</div>
				</div>
			</div>
		);
	}

	/* Event Handlers */
	handleCardClick(card) {
		var self = this;

		return function () {
			console.log('handleCardClick card = ', card);
			self.concentrationGame.flipCard(card.number);
		}
	}

};

Play.propTypes = {
};