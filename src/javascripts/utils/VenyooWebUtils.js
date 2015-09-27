import request from "request";
import ServerActionCreators from "../actions/ServerActionCreators";
import DataFormatAdapter from "./DataFormat/DataFormatAdapter";

class VenyooWebUtils {

	/* Getting data */

	getFilters () {
		var self = this;

		var urlParams = {}

		ServerActionCreators.receiveFiltersSending(urlParams);

		request({
			// Sivaram's endpoint
			// url: "http://52.24.255.84/metadata/",
			url: "http://52.24.69.13:5000/metadata/",
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveFiltersSucceeded(
					urlParams, 
					DataFormatAdapter.adjustFilters(JSON.parse(body)), 
					response, 
					body);
			} else {
				ServerActionCreators.receiveFiltersFailed(urlParams, error, response, body);
			}
		});
	}

	getEventBucketsMetadata (eventId, 
							 socialChannelId,
							 kloutScoreId,
							 sentimentId,
							 bucketId) {
		var self = this;

		var urlParams = {
			eventId:         eventId,
			socialChannelId: socialChannelId,
			kloutScoreId:    kloutScoreId,
			sentimentId:     sentimentId,
			bucketId:        bucketId
		};

		ServerActionCreators.receiveEventBucketsMetadataSending(urlParams);

		request({
			// Sivaram's endpoint
			// url: "http://52.24.255.84/bucket/?event_id=" + eventId,
			url: "http://52.24.69.13:5000/bucket/?event_id=" + eventId,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveEventBucketsMetadataSucceeded(
					urlParams, 
					DataFormatAdapter.adjustEventBuckets(JSON.parse(body)), 
					response, 
					body);
			} else {
				ServerActionCreators.receiveEventBucketsMetadataFailed(urlParams, error, response, body);
			}
		});
	}

	getBucketData (eventId, 
				   bucketId, 
				   socialChannelId, 
				   kloutScoreId, 
				   sentimentId) {
		var self = this;

		var urlParams = {
			eventId:         eventId,
			socialChannelId: socialChannelId,
			kloutScoreId:    kloutScoreId,
			sentimentId:     sentimentId,
			bucketId:        bucketId
		};

		ServerActionCreators.receiveBucketDataSending(urlParams);

		request({
			// Sivarams's
			// url: "http://52.24.255.84/filter/?bucket=" + bucketId + "&sentiment=" + sentimentId + "&klout_score=" + kloutScoreId + "&event_id=" + eventId + "&social_id=" + socialChannelId,
			url: "http://52.24.69.13:5000/filter/?bucket=" + bucketId + "&sentiment=" + sentimentId + "&klout_score=" + kloutScoreId + "&event_id=" + eventId + "&social_id=" + socialChannelId,
			withCredentials: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				ServerActionCreators.receiveBucketDataSucceeded(
					urlParams, 
					DataFormatAdapter.adjustBucket(JSON.parse(body)), 
					response, 
					body);
			} else {
				ServerActionCreators.receiveBucketDataFailed(urlParams, error, response, body);
			}
		});
	}

	/* Performing actions */

	sendTweet (screenNames, message) {
		var self = this;

		var urlParams = {
			screenNames: screenNames,
			message:     message
		};

		ServerActionCreators.sendTweetSending(urlParams);

		if (screenNames.length === 1) {
			request({
				// Sivaram's
				// url: "http://52.24.255.84/tweet/?screenname=" + encodeURIComponent(screenName) + "&message=" + encodeURIComponent(message),
				url: "http://52.24.69.13:5000/tweet/?screenname=" + encodeURIComponent(screenNames[0]) + "&message=" + encodeURIComponent(message),
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendTweetSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendTweetFailed(urlParams, error, response, body);
				}
			});
		} else {
			/* Multiple user tweet */

			var data = {
				accounts: [],
				message: message,
				type: 5
			};

			screenNames.forEach(function (screenName) {
				data.accounts.push({
					acc: screenName
				});
			});

			request({
				method: "POST",
				url: "http://52.24.69.13:5000/bulksendortweet/",
				body: data,
				json: true,
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendTweetSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendTweetFailed(urlParams, error, response, body);
				}
			});
		}
	}

	sendDirectMessage (screenNames, message) {
		var self = this;

		var urlParams = {
			screenNames: screenNames,
			message:     message
		};

		ServerActionCreators.sendDirectMessageSending(urlParams);

		if (screenNames.length === 1) {
			request({
				// Sivaram's
				// url: "http://52.24.255.84/send/?username=" + encodeURIComponent(screenNames[0]) + "&message=" + encodeURIComponent(message),
				url: "http://52.24.69.13:5000/send/?username=" + encodeURIComponent(screenNames[0]) + "&message=" + encodeURIComponent(message),
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendDirectMessageSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendDirectMessageFailed(urlParams, error, response, body);
				}
			});
		} else {
			/* Multiple user direct message */

			var data = {
				accounts: [],
				message:  message,
				type: 1
			};

			screenNames.forEach(function (screenName) {
				data.accounts.push({
					acc: screenName
				});
			});

			request({
				method: "POST",
				url: "http://52.24.69.13:5000/bulksendortweet/",
				body: data,
				json: true,
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendDirectMessageSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendDirectMessageFailed(urlParams, error, response, body);
				}
			});
		}
	}

	sendReply (screenNames, tweetIds, message) {
		var self = this;

		var urlParams = {
			screenNames: screenNames,
			tweetIds:    tweetIds,
			message:     message
		};

		ServerActionCreators.sendReplySending(urlParams);

		if (screenNames.length === 1) {
			request({
				url: "http://52.24.69.13:5000/reply/?screenname=" + encodeURIComponent(screenNames[0]) + "&message=" + encodeURIComponent(message) + "&tweet_id=" + encodeURIComponent(tweetIds[0]),
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendReplySucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendReplyFailed(urlParams, error, response, body);
				}
			});
		} else {
			/* There is no multiple reply API */
		}
	}

	sendFavorite (tweetIds) {
		var self = this;

		var urlParams = {
			tweetIds: tweetIds
		};

		ServerActionCreators.sendFavoriteSending(urlParams);

		if (tweetIds.length === 1) {
			request({
				// Sivaram's
				// url: "http://52.24.255.84/favorite/?tweet_id=" + tweetIds[0],
				url: "http://52.24.69.13:5000/favorite/?tweet_id=" + tweetIds[0],
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendFavoriteSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendFavoriteFailed(urlParams, error, response, body);
				}
			});
		} else {
			/* Multiple tweet favorite */

			var data = {
				tweetID: [],
				type: 2
			};

			tweetIds.forEach(function (screenName) {
				data.tweetID.push({
					id: screenName
				});
			});

			request({
				method: "POST",
				url: "http://52.24.69.13:5000/bulkfavouriteorretweet/",
				body: data,
				json: true,
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendFavoriteSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendFavoriteFailed(urlParams, error, response, body);
				}
			});
		}
	}

	sendRetweet (tweetIds) {
		var self = this;

		var urlParams = {
			tweetIds: tweetIds
		};

		ServerActionCreators.sendRetweetSending(urlParams);

		if (tweetIds.length === 1) {
			request({
				// Sivaram's
				// url: "http://52.24.255.84/retweet/?tweet_id=" + tweetId,
				url: "http://52.24.69.13:5000/retweet/?tweet_id=" + tweetIds[0],
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendRetweetSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendRetweetFailed(urlParams, error, response, body);
				}
			});
		} else {
			/* Multiple retweet */

			var data = {
				tweetID: [],
				type: 3
			};

			tweetIds.forEach(function (screenName) {
				data.tweetID.push({
					id: screenName
				});
			});

			request({
				method: "POST",
				url: "http://52.24.69.13:5000/bulkfavouriteorretweet/",
				body: data,
				json: true,
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendRetweetSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendRetweetFailed(urlParams, error, response, body);
				}
			});
		}
	}

	sendFollow (screenNames) {
		var self = this;

		var urlParams = {
			screenNames: screenNames
		};

		ServerActionCreators.sendFollowSending(urlParams);

		if (screenNames.length === 1) {
			request({
				// Sivaram's
				// url: "http://52.24.255.84/follow/?screenname=" + screenName,
				url: "http://52.24.69.13:5000/follow/?screenname=" + screenNames[0],
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendFollowSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendFollowFailed(urlParams, error, response, body);
				}
			});
		} else {
			/* Multiple user follow */

			var data = {
				accounts: [],
				type: 4
			};

			screenNames.forEach(function (screenName) {
				data.accounts.push({
					acc: screenName
				});
			});

			request({
				method: "POST",
				url: "http://52.24.69.13:5000/bulkfollow/",
				body: data,
				json: true,
				withCredentials: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					ServerActionCreators.sendFollowSucceeded(
						urlParams,
						response,
						body);
				} else {
					ServerActionCreators.sendFollowFailed(urlParams, error, response, body);
				}
			});
		}
	}
}

export default new VenyooWebUtils();