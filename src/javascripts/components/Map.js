/* Static dependencies */
import '../../stylesheets/components/map.scss';
// import tweet_content from '../../tweet_content.html';

/* JS dependencies */
import React from 'react';
import jQuery from 'jquery';
import _ from "lodash";
import DialogBox from "./DialogBox";
import ActionsActionCreators from "../actions/ActionsActionCreators";

/* Constants */
const minZoomLevel = 2;
const replyPrefix         = "reply";
const tweetToPrefix       = "tweetTo";
const directMessagePrefix = "directMessage";
const followPrefix        = "followPrefix";
const favoritePrefix      = "favoritePrefix";
const retweetPrefix       = "retweetPrefix";

export default class Map extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			map:           null,
			oms:           null, // Overlapping Marker Spiderfier (Overlapping Marker Spiderfier)
			infowinLayout: null,
			infowins:      [],
			markers:       []
		};
	}

	render () {
		var replyPopups         = [];
		var tweetToPopups       = [];
		var directMessagePopups = [];
		var followPopups        = [];
		var favoritePopups      = [];
		var retweetPopups       = [];
		for (var i = 0; i < this.props.bucketData.tweets.length; i++) {
			var tweetData = this.props.bucketData.tweets[i];

			replyPopups.push(
				<DialogBox key={ i }
						   id={ replyPrefix + i }
						   isInput={ true }
						   isLimitedInput={ true }
						   actionName="Reply To"
						   onAction={ this.factoryHandleReply(tweetData.socialHandle, tweetData.tweetId).bind(this) }>
					<h3>Reply to: <span>{ tweetData.socialHandle }</span><br /><span className="reg_text">{ tweetData.message }</span></h3>
				</DialogBox>
			);
			
			tweetToPopups.push(
				<DialogBox key={ i }
						   id={ tweetToPrefix + i }
						   isInput={ true }
						   isLimitedInput={ true }
						   actionName="Tweet"
						   onAction={ this.factoryHandleTweetTo(tweetData.socialHandle).bind(this) }>
					<h3>Tweet to: <span>{ tweetData.socialHandle }</span><br /><span className="reg_text">{ tweetData.message }</span></h3>
				</DialogBox>
			);

			directMessagePopups.push(
				<DialogBox key={ i }
						   id={ directMessagePrefix + i }
						   isInput={ true }
						   isLimitedInput={ true }
						   actionName="Direct Message To"
						   onAction={ this.factoryHandleDirectMessage(tweetData.socialHandle).bind(this) }>
					<h3>Direct Message to: <span>{ tweetData.socialHandle }</span><br /><span className="reg_text">{ tweetData.message }</span></h3>
				</DialogBox>
			);

			followPopups.push(
				<DialogBox key={ i }
						   id={ followPrefix + i }
						   isInput={ false }
						   actionName="Follow"
						   onAction={ this.factoryHandleFollow(tweetData.socialHandle).bind(this) }>
					<h3>Follow <span>{ tweetData.socialHandle }</span><br /><span className="reg_text">{ tweetData.message }</span></h3>
				</DialogBox>
			);

			favoritePopups.push(
				<DialogBox key={ i }
						   id={ favoritePrefix + i }
						   isInput={ false }
						   actionName="Favorite"
						   onAction={ this.factoryHandleFavorite(tweetData.tweetId).bind(this) }>
					<h3>Favorite a tweet by <span>{ tweetData.socialHandle }</span><br /><span className="reg_text">{ tweetData.message }</span></h3>
				</DialogBox>
			);

			retweetPopups.push(
				<DialogBox key={ i }
						   id={ retweetPrefix + i }
						   isInput={ false }
						   actionName="Retweet"
						   onAction={ this.factoryHandleRetweet(tweetData.tweetId).bind(this) }>
					<h3>Retweet <span>{ tweetData.socialHandle }</span><br /><span className="reg_text">{ tweetData.message }</span></h3>
				</DialogBox>
			);
		}

		return (
			<div>
				<div ref="mapCanvas" className="map_canvas"></div>
				{ replyPopups }
				{ followPopups }
				{ favoritePopups }
				{ retweetPopups }
				{ tweetToPopups }
				{ directMessagePopups }
			</div>
		);
	}

	componentDidMount () {
		var self = this;
		var mapCanvas = React.findDOMNode(self.refs.mapCanvas);

		self.state.map = placeGoogleMaps(mapCanvas);
		self.state.oms = new OverlappingMarkerSpiderfier(this.state.map);

		function placeGoogleMaps (canvas) {
			var mapOptions = {
				center:           new google.maps.LatLng(38.6, 41.7),
				zoom:             2,
				scrollwheel:      false,
				disableDefaultUI: true,
				mapTypeControl:   false,
				scaleControl:     true,
				zoomControl:      true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE 
				},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(canvas, mapOptions);
			return map;
		}

		var mapAdjuster = function () {
			
			// if (strictBounds.contains(self.state.map.getCenter()))
			// 	return;

			// We're out of bounds - Move the map back within the bounds

			var center = self.state.map.getCenter(),
				lng    = center.lng(),
				lat    = center.lat(),
				zoom   = self.state.map.getZoom();

			if (zoom === 2 && lat > 44) lat = 44;
			if (zoom === 3 && lat > 72) lat = 72;
			if (zoom >=  4 && lat > 79) lat = 79;
			if (zoom === 2 && lat < -21) lat = -21;
			if (zoom === 3 && lat < -64) lat = -64;
			if (zoom >=  4 && lat < -77) lat = -77;
			self.state.map.setCenter(new google.maps.LatLng(lat, lng));

			if (zoom < minZoomLevel)
				self.state.map.setZoom(minZoomLevel);
		}

		google.maps.event.addListener(self.state.map, "drag",         mapAdjuster);
		google.maps.event.addListener(self.state.map, "zoom_changed", mapAdjuster);
	}

	componentWillReceiveProps (nextProps) {
		var self = this;

		if (!_.isEqual(nextProps.bucketData.tweets, this.props.bucketData.tweets)) {

			/* Remove old markers and infowins */
			self.state.oms.clearMarkers();
			self.state.markers.forEach(function (marker) {
				marker.infowin.setMap(null);
				marker.setMap(null);
			});
			self.state.markers = [];

			/* Load layout for infowindow and place markers and infowins upon completion */
			if (self.state.infowinLayout) {
				placeMarkersAndInfoWins(nextProps.bucketData.tweets, self.state.infowinLayout);
			} else {
				// Load info window content if it's not yet loaded
				jQuery.get('tweet_content.html', function (data) {
					if (data) {
						self.state.infowinLayout = data;
						placeMarkersAndInfoWins(nextProps.bucketData.tweets, self.state.infowinLayout);
					}
				});
			}

			function placeMarkersAndInfoWins (tweets, contentLayout) {
				tweets.forEach(function(tweet, i) {
					/* Prepare infowindow content */
					var content = contentLayout;
					content = content.replace('{{ infowin_username }}', tweet.username);
					content = content.replace('{{ infowin_handle }}',   tweet.socialHandle);
					content = content.replace('{{ infowin_picUrl }}',   tweet.picUrl);
					content = content.replace('{{ infowin_tweet }}',    tweet.message);
					content = content.replace('{{ infowin_reply_target }}',    "#" + replyPrefix + i);
					content = content.replace('{{ infowin_follow_target }}',   "#" + followPrefix + i);
					content = content.replace('{{ infowin_favorite_target }}', "#" + favoritePrefix + i);
					content = content.replace('{{ infowin_retweet_target }}',  "#" + retweetPrefix + i);
					content = content.replace('{{ infowin_direct_message_target }}', "#" + directMessagePrefix + i);
					content = content.replace('{{ infowin_tweet_to_target }}',       "#" + tweetToPrefix + i);

					/* Place marker */
					if (parseFloat(tweet.lat) === 0 && parseFloat(tweet.lng) === 0) {
						tweet.lat = 34.78;
						tweet.lng = -40.48;
					}
					var newMarker = new google.maps.Marker({
						position: new google.maps.LatLng(tweet.lat, tweet.lng),
						map:      self.state.map
					});
					self.state.markers.push(newMarker);
					self.state.oms.addMarker(newMarker);
					/* Create infowindow */
					var infowin = new google.maps.InfoWindow({
						content: content
					});
					self.state.infowins.push(infowin);
					newMarker.infowin = infowin;
					/* When user clicks on a marker close all the infowindows and open only one */
					self.state.oms.addListener('click', function(marker, event) {
						if (marker === newMarker) {
							self.state.infowins.forEach(function(infowin) {
								infowin.close();
							});
							infowin.open(self.state.map, marker);
						}
					});

					// google.maps.event.addListener(newMarker, 'click', function() {
					// 	self.state.infowins.forEach(function(infowin) {
					// 		infowin.close();
					// 	});
					// 	infowin.open(self.state.map, newMarker);
					// });
				});			
			}
		}
	}

	/* Event handlers */
	
	factoryHandleReply (username, tweetId) {
		return function (message) {
			console.log("Map.factoryHandleReply username = ", username, "tweetId = ", tweetId, ", message = ", message);
			ActionsActionCreators.sendReply([ username ], [ tweetId ], message);
		}
	}
	factoryHandleTweetTo (username) {
		return function (message) {
			console.log("Map.factoryHandleTweetTo username = ", username, ", message = ", message);
			ActionsActionCreators.sendTweet([username], message);
		}
	}
	factoryHandleDirectMessage (username) {
		return function (message) {
			console.log("Map.factoryHandleDirectMessage username = ", username, ", message = ", message);
			ActionsActionCreators.sendDirectMessage([username], message);
		}
	}
	factoryHandleFollow (screenName) {
		return function () {
			console.log("Map.factoryHandleFollow screenName = ", screenName);
			ActionsActionCreators.sendFollow([screenName]);
		}
	}
	factoryHandleFavorite (tweetId) {
		return function () {
			console.log("Map.factoryHandleFavorite tweetId = ", tweetId);
			ActionsActionCreators.sendFavorite([tweetId]);
		}
	}
	factoryHandleRetweet (tweetId) {
		return function () {
			console.log("Map.factoryHandleRetweet tweetId = ", tweetId);
			ActionsActionCreators.sendRetweet([tweetId]);
		}
	}

}

Map.propTypes = {
	bucketData: React.PropTypes.object
};