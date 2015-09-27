import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";

export default {
	getBucket (eventId         = 1, 
			   bucketId        = 0,
			   socialChannelId = 0,
			   kloutScoreId    = 4,
			   sentimentId     = 0) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.GET_BUCKET_DATA
		});

		VenyooWebUtils.getBucketData(eventId, bucketId, socialChannelId, kloutScoreId, sentimentId);
	},

	changeTweetsSelection (nextCheckedTweets) {
		AppDispatcher.dispatch({
			type:          VenyooConstants.ActionTypes.CHANGE_TWEETS_SELECTION,
			checkedTweets: nextCheckedTweets
		});
	},

	replyToTweet (tweetNumber) {
		AppDispatcher.dispatch({
			type:        VenyooConstants.ActionTypes.REPLY_TO_TWEET,
			tweetNumber: tweetNumber
		});
	}
}