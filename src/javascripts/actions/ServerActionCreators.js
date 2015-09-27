import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import EventBucketsActionCreators from "./EventBucketsActionCreators";
import BucketActionCreators from "./BucketActionCreators";
import FiltersStore from "../stores/FiltersStore";

var ActionTypes = VenyooConstants.ActionTypes;

export default {
	
	/* GET FILTERS */

	receiveFiltersSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_FILTERS_SENDING
		});
	},

	receiveFiltersSucceeded: function (urlParams, filters, response, body) {
		AppDispatcher.dispatch({
			type:    ActionTypes.RECEIVE_FILTERS_SUCCEEDED,
			filters: filters
		});

		var selectedFilters = FiltersStore.getState().selected;

		EventBucketsActionCreators.getEventBuckets(selectedFilters.eventId,
												   selectedFilters.socialChannelId,
												   selectedFilters.kloutScoreId,
												   selectedFilters.sentimentId);
	},

	receiveFiltersFailed: function (urlParams, error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_FILTERS_FAILED,
			error:    error,
			response: response
		});
	},

	/* GET EVENT BUCKETS METADATA */

	receiveEventBucketsMetadataSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_EVENTBUCKETS_SENDING
		});
	},

	receiveEventBucketsMetadataSucceeded: function (urlParams, eventBuckets, response, body) {
		AppDispatcher.dispatch({
			type:         ActionTypes.RECEIVE_EVENTBUCKETS_SUCCEEDED,
			eventBuckets: eventBuckets,
			bucketId:     urlParams.bucketId
		});

		BucketActionCreators.getBucket(urlParams.eventId, 
									   urlParams.bucketId,
									   urlParams.socialChannelId,
									   urlParams.kloutScoreId,
									   urlParams.sentimentId);
	},

	receiveEventBucketsMetadataFailed: function (urlParams, error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_EVENTBUCKETS_FAILED,
			error:    error,
			response: response
		});
	},

	/* GET BUCKET DATA */

	receiveBucketDataSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_BUCKET_SENDING
		});
	},

	receiveBucketDataSucceeded: function (urlParams, bucket, response, body) {
		AppDispatcher.dispatch({
			type:   ActionTypes.RECEIVE_BUCKET_SUCCEEDED,
			bucket: bucket
		});
	},

	receiveBucketDataFailed: function (urlParams, error, response, body) {
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_BUCKET_FAILED,
			error:    error,
			response: response
		});
	},

	/* SEND TWEET */

	sendTweetSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_TWEET_SENDING
		});
	},

	sendTweetSucceeded: function (urlParams, response, body) {
		console.log("ServerActionCreators.sendTweetSucceeded SUCCESS :) body = ", body);
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_TWEET_SUCCEEDED
		});
	},

	sendTweetFailed: function (urlParams, error, response, body) {
		console.log("ServerActionCreators.sendTweetSucceeded FAIL :( body = ", body);
		AppDispatcher.dispatch({
			type:     ActionTypes.SEND_TWEET_FAILED,
			error:    error,
			response: response
		});
	},

	/* SEND DIRECT MESSAGE */

	sendDirectMessageSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_DIRECT_MESSAGE_SENDING
		});
	},

	sendDirectMessageSucceeded: function (urlParams, response, body) {
		console.log("ServerActionCreators.sendDirectMessageSucceeded SUCCESS :) body = ", body);
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_DIRECT_MESSAGE_SUCCEEDED
		});
	},

	sendDirectMessageFailed: function (urlParams, error, response, body) {
		console.log("ServerActionCreators.sendDirectMessageFailed FAIL :( body = ", body);
		AppDispatcher.dispatch({
			type:     ActionTypes.SEND_DIRECT_MESSAGE_FAILED,
			error:    error,
			response: response
		});
	},

	/* SEND REPLY */

	sendReplySending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_REPLY_SENDING
		});
	},

	sendReplySucceeded: function (urlParams, response, body) {
		console.log("ServerActionCreators.sendReplySucceeded SUCCESS :) body = ", body);
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_REPLY_SUCCEEDED
		});
	},

	sendReplyFailed: function (urlParams, error, response, body) {
		console.log("ServerActionCreators.sendReplyFailed FAIL :( body = ", body);
		AppDispatcher.dispatch({
			type:     ActionTypes.SEND_REPLY_FAILED,
			error:    error,
			response: response
		});
	},

	/* SEND FAVORITE */

	sendFavoriteSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_FAVORITE_SENDING
		});
	},

	sendFavoriteSucceeded: function (urlParams, response, body) {
		console.log("ServerActionCreators.sendFavoriteSucceeded SUCCESS :) body = ", body);
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_FAVORITE_SUCCEEDED
		});
	},

	sendFavoriteFailed: function (urlParams, error, response, body) {
		console.log("ServerActionCreators.sendFavoriteSucceeded FAIL :( body = ", body);
		AppDispatcher.dispatch({
			type:     ActionTypes.SEND_FAVORITE_FAILED,
			error:    error,
			response: response
		});
	},

	/* SEND RETWEET */

	sendRetweetSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_RETWEET_SENDING
		});
	},

	sendRetweetSucceeded: function (urlParams, response, body) {
		console.log("ServerActionCreators.sendRetweetSucceeded SUCCESS :) body = ", body);
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_RETWEET_SUCCEEDED
		});
	},

	sendRetweetFailed: function (urlParams, error, response, body) {
		console.log("ServerActionCreators.sendRetweetSucceeded FAIL :( body = ", body);
		AppDispatcher.dispatch({
			type:     ActionTypes.SEND_RETWEET_FAILED,
			error:    error,
			response: response
		});
	},

	/* SEND FOLLOW */

	sendFollowSending: function (urlParams) {
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_FOLLOW_SENDING
		});
	},

	sendFollowSucceeded: function (urlParams, response, body) {
		console.log("ServerActionCreators.sendFollowSucceeded SUCCESS :) body = ", body);
		AppDispatcher.dispatch({
			type: ActionTypes.SEND_FOLLOW_SUCCEEDED
		});
	},

	sendFollowFailed: function (urlParams, error, response, body) {
		console.log("ServerActionCreators.sendFollowSucceeded FAIL :( body = ", body);
		AppDispatcher.dispatch({
			type:     ActionTypes.SEND_FOLLOW_FAILED,
			error:    error,
			response: response
		});
	},
}