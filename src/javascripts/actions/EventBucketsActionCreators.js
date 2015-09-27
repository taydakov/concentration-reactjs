import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";
import BucketActionCreators from "../actions/BucketActionCreators";

export default {
	getEventBuckets (eventId, 
					 socialChannelId,
					 kloutScoreId,
					 sentimentId,
					 bucketId) {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.GET_EVENTBUCKETS_METADATA
		});

		VenyooWebUtils.getEventBucketsMetadata(eventId, 
											   socialChannelId, 
											   kloutScoreId, 
											   sentimentId,
											   bucketId);
	},

	changeBucketSelection (nextInterval,
						   nextBucketId,
						   nextEventId,
						   nextSocialChannelId,
						   nextKloutScoreId,
						   nextSentimentId) {
		AppDispatcher.dispatch({
			type:             VenyooConstants.ActionTypes.CHANGE_BUCKET_SELECTION,
			selectedBucketId: nextBucketId,
			selectedInterval: nextInterval
		});

		BucketActionCreators.getBucket(nextEventId,
									   nextBucketId,
									   nextSocialChannelId,
									   nextKloutScoreId,
									   nextSentimentId);
	}
}