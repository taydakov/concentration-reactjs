import AppDispatcher from "../AppDispatcher";
import VenyooConstants from "../constants/VenyooConstants";
import VenyooWebUtils from "../utils/VenyooWebUtils";
import EventBucketsActionCreators from "../actions/EventBucketsActionCreators";

export default {
	getFilters () {
		AppDispatcher.dispatch({
			type: VenyooConstants.ActionTypes.GET_FILTERS
		});

		VenyooWebUtils.getFilters();
	},

	changeFiltersSelection (nextEventId         = 1,
							nextSocialChannelId = 0,
							nextKloutScoreId    = 2,
							nextSentimentId     = 0,
							bucketId            = 0) {
		AppDispatcher.dispatch({
			type:     VenyooConstants.ActionTypes.CHANGE_FILTERS_SELECTION,
			selectedFilters: {
				eventId:         nextEventId,
				socialChannelId: nextSocialChannelId,
				kloutScoreId:    nextKloutScoreId,
				sentimentId:     nextSentimentId
			}
		});

		EventBucketsActionCreators.getEventBuckets(nextEventId,
												   nextSocialChannelId,
												   nextKloutScoreId,
												   nextSentimentId,
												   bucketId);
	}
};