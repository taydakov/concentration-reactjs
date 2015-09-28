/* Constants and Variables */
var maxPairsNum = 26;
var minPairsNum = 1;
var cardRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
var cardSuits = ['clubs', 'spades', 'diamonds', 'hearts'];

/* Game initialization */

var ConcentrationGame = function (pairsNum) {
	// Verification
	if (pairsNum > maxPairsNum) {
		pairsNum = maxPairsNum;
	} else if (pairsNum < minPairsNum) {
		pairsNum = minPairsNum;
	}
	this.pairsTotal   = pairsNum;
	this.matchesGoal  = pairsNum;
	this.matchesFound = 0;
	this.cards = [];
	this.generateCards(pairsNum);
};

ConcentrationGame.prototype.generateCards = function (pairsNum) {
	for (var i = 0; i < (this.pairsTotal * 2); i++) {
		this.cards.push({
			number: i,
			rank: cardRanks[parseInt(i / cardSuits.length)],
			suit: cardSuits[        (i % cardSuits.length)],
			flipped: false,
			matched: false
		});
	}
	shuffleArray(this.cards);
	emit(this, 'cardsChanged', [this.cards]);
};

/* Event handling */

var eventHandlers = {};

ConcentrationGame.prototype.on = function (eventName, cb) {
	eventHandlers[eventName] = cb;
};

function emit (thisArg, eventName, argsArray) {
	if (eventHandlers[eventName]) {
		eventHandlers[eventName].apply(thisArg, argsArray);
	}
}

/* Actions */

var isFlipped   = false; // is the new card has been flipped
var flippedCard = null;  // reference to the first flipped card in the current pair

ConcentrationGame.prototype.flipCard = function (cardNumber) {
	var card = findCard(this.cards, cardNumber);
	if (card) {
		// Exit if user clicked the same card twice
		if (flippedCard && (flippedCard === card)) {
			return;
		}

		if (!isFlipped && !flippedCard) {
			// Flip the first card in a pair
			card.flipped = true;
			
			isFlipped   = true;
			flippedCard = card;
		} else if (isFlipped && flippedCard) {
			// Flip the second card in a pair and check
			card.flipped = true;

			if ((card.rank === flippedCard.rank)
					&& hasSameColor(card, flippedCard)) {
				this.registerMatch(card, flippedCard);
			}

			isFlipped   = true;
			flippedCard = null;
		} else if (isFlipped && !flippedCard) {
			// Flip all the unmatched cards back and flip the current one
			this.cards.forEach(function (card) {
				if (!card.matched) {
					card.flipped = false;
				}
			});
			card.flipped = true;

			isFlipped   = true;
			flippedCard = card;
		}

		emit(this, 'cardsChanged', [this.cards]);
	}
}

ConcentrationGame.prototype.registerMatch = function (card1, card2) {
	card1.matched = true;
	card2.matched = true;

	this.matchesFound += 1;
	var matchesLeft = this.matchesGoal - this.matchesFound;
	var progress    = this.matchesFound / this.matchesGoal * 100.0;
	emit(this, 'matchFound', [matchesLeft, progress]);

	if (matchesLeft <= 0) {
		emit(this, 'gameWon');
	}
}

/* Helper functions */

function shuffleArray (o) {
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function findCard (cards, cardNumber) {
	var searchResults = cards.filter(function (card) {
		if (card.number === cardNumber) {
			return card;
		}
	});
	if (searchResults.length > 0) {
		return searchResults[0];
	} else {
		return null;
	}
}

function hasSameColor (card1, card2) {
	if (((card1.suit === 'clubs' || card1.suit === 'spades') && (card2.suit === 'clubs' || card2.suit === 'spades'))
			|| ((card1.suit === 'diamonds' || card1.suit === 'hearts') && (card2.suit === 'diamonds' || card2.suit === 'hearts'))){
		return true;
	} else {
		return false;
	}
}

module.exports = ConcentrationGame;
