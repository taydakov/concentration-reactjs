/* Static dependencies */
import socialImg from '../../images/social_1.png';
import "../../stylesheets/components/actions.scss";

/* JS dependencies */
import React from "react";
import ActionsActionCreators from "../actions/ActionsActionCreators";
import DialogBox from "./DialogBox";

export default class Actions extends React.Component {

	constructor (...args) {
		super(...args);

		this.state = {
			selectedTweets:      [],
			uniqueSelectedUsers: [],
			buttonsUsed: {
				follow:   null,
				tweetTo:  null,
				favorite: null,
				message:  null,
				retweet:  null
			}
		};
	}

	render () {
		var tweetsAmount = this.state.selectedTweets.length;
		var usersAmount  = this.state.uniqueSelectedUsers.length;
		var tweetsModalProp = (tweetsAmount > 0) ? "modal" : "";
		var usersModalProp  = (usersAmount  > 0) ? "modal" : "";
		var dialogBoxes = null;

		console.log("Actions.render state = ", this.state);

		if (this.props.isPrimary) {
			dialogBoxes =
				<div>
					<DialogBox id="followSelected"
							   tag="follow"
							   isInput={ false }
							   actionName="Follow"
							   onAction={ this.handleFollowClick.bind(this) }>
						<h3>You’ve selected <span>{ usersAmount } users</span><br /><span className="reg_text">Are you sure you want to Follow all the users?</span></h3>
					</DialogBox>
					<DialogBox id="tweetToSelected"
							   tag="tweetTo"
							   isInput={ true }
							   isLimitedInput={ true }
							   actionName="Tweet"
							   onAction={ this.handleTweetClick.bind(this) }>
						<h3>You’ve selected <span>{ usersAmount } users</span><br /><span className="reg_text">Enter the message to Tweet To all the users:</span></h3>
					</DialogBox>
					<DialogBox id="favoriteSelected"
							   tag="favorite"
							   isInput={ false }
							   actionName="Favorite"
							   onAction={ this.handleFavoriteClick.bind(this) }>
						<h3>You’ve selected <span>{ tweetsAmount } tweets</span><br /><span className="reg_text">Are you sure you want to Favorite all the tweets?</span></h3>
					</DialogBox>
					<DialogBox id="directMessageToSelected"
							   tag="direct"
							   isInput={ true }
							   actionName="Direct Message"
							   onAction={ this.handleDirectMessageClick.bind(this) }>
						<h3>You’ve selected <span>{ usersAmount } users</span><br /><span className="reg_text">Enter the message to Direct Message to all the users:</span></h3>
					</DialogBox>
					<DialogBox id="retweetSelected"
							   tag="retweet"
							   isInput={ false }
							   actionName="Retweet"
							   onAction={ this.handleRetweetClick.bind(this) }>
						<h3>You’ve selected <span>{ tweetsAmount } tweets</span><br /><span className="reg_text">Are you sure you want to Retweet all the tweets?</span></h3>
					</DialogBox>
				</div>;
		}

		var followClass   = null;
		var tweetToClass  = null;
		var favoriteClass = null;
		var messageClass  = null;
		var retweetClass  = null;
		if (this.state.buttonsUsed.follow) {
			followClass = "group-action-used";
		}
		if (this.state.buttonsUsed.tweetTo) {
			tweetToClass = "group-action-used";
		}
		if (this.state.buttonsUsed.favorite) {
			favoriteClass = "group-action-used";
		}
		if (this.state.buttonsUsed.message) {
			messageClass = "group-action-used";
		}
		if (this.state.buttonsUsed.retweet) {
			retweetClass = "group-action-used";
		}

		return (
			<div className="duration_inner">
				<h2>Actions:</h2>
				<ul className="action_list">
					<li> <a className={ followClass } href="#" data-toggle={ usersModalProp } data-target="#followSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Follow</p>
					<span className="people">{ usersAmount } people</span> </a> </li>
					<li> <a className={ tweetToClass } href="#" data-toggle={ usersModalProp } data-target="#tweetToSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Tweet to</p>
					<span className="people">{ usersAmount } people</span> </a> </li>
					<li> <a className={ favoriteClass } href="#" data-toggle={ tweetsModalProp } data-target="#favoriteSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Favorite</p>
					<span className="people">{ tweetsAmount } tweets</span> </a> </li>
					<li> <a className={ messageClass } href="#" data-toggle={ usersModalProp } data-target="#directMessageToSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Message</p>
					<span className="people">{ usersAmount } people</span> </a> </li>
					<li> <a className={ retweetClass } href="#" data-toggle={ tweetsModalProp } data-target="#retweetSelected"> <i className="social_icon"><img src={ socialImg } alt="" /></i>
					<p>Retweet</p>
					<span className="people">{ tweetsAmount } tweets</span> </a> </li>
				</ul>
				{ dialogBoxes }
			</div>
		);
	}

	componentWillReceiveProps (nextProps) {
		console.log("Actions.componentWillReceiveProps nextProps = ", nextProps);

		var uniqueSelectedUsers = [];
		var selectedTweets      = [];
		nextProps.bucketData.tweets.forEach(function (tweet, i) {
			if (nextProps.bucketData.checkedTweets[i]) {
				selectedTweets.push(tweet);
				if (uniqueSelectedUsers.indexOf(tweet.username) === -1) {
					uniqueSelectedUsers.push(tweet.username);
				}
			}
		});

		this.setState({
			selectedTweets:      selectedTweets,
			uniqueSelectedUsers: uniqueSelectedUsers,
			buttonsUsed: {
				follow:   false,
				tweetTo:  false,
				favorite: false,
				message:  false,
				retweet:  false
			}
		});
	}

	/* Event Handlers */

	handleFollowClick () {
		this.setState({
			buttonsUsed: {
				follow: true
			}
		});
		var screenNames = [];
		this.state.uniqueSelectedUsers.forEach(function (username) {
			screenNames.push(username);
		});
		ActionsActionCreators.sendFollow(screenNames);
	}
	handleTweetClick (message) {
		this.setState({
			buttonsUsed: {
				tweetTo: true
			}
		});
		var screenNames = [];
		this.state.uniqueSelectedUsers.forEach(function (username) {
			screenNames.push(username);
		});
		ActionsActionCreators.sendTweet(screenNames, message);
	}
	handleFavoriteClick () {
		this.setState({
			buttonsUsed: {
				favorite: true
			}
		});
		var tweetIds = [];
		this.state.selectedTweets.forEach(function (tweet) {
			tweetIds.push(tweet.tweetId);
		});
		ActionsActionCreators.sendFavorite(tweetIds);
	}
	handleDirectMessageClick (message) {
		this.setState({
			buttonsUsed: {
				message: true
			}
		});
		var screenNames = [];
		this.state.uniqueSelectedUsers.forEach(function (username) {
			screenNames.push(username);
		});
		ActionsActionCreators.sendDirectMessage(screenNames, message);
	}
	handleRetweetClick () {
		this.setState({
			buttonsUsed: {
				retweet: true
			}
		});
		var tweetIds = [];
		this.state.selectedTweets.forEach(function (tweet) {
			tweetIds.push(tweet.tweetId);
		});
		ActionsActionCreators.sendRetweet(tweetIds);
	}

};

Actions.PropTypes = {
	isPrimary:  React.PropTypes.bool,
	bucketData: React.PropTypes.object.isRequired
}