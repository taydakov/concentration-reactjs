/*
 * Adapter to convert Sivaram's data format to app's interval one
 */

import PassThroughDataFormatAdapter from "./PassThroughDataFormatAdapter";

export default class SivaramDataFormatAdapter extends PassThroughDataFormatAdapter {

	adjustFilters (originalFilters) {
		var events = [];

		/* Assemble events */
		originalFilters.events.forEach(function (event) {
			events.push({
				id:        event.id,
				awayTeam:  event.away_team,
				homeTeam:  event.home_team,
				startTime: event.startTime,
				endTime:   event.endTime
			});
		});

		return {
			events:         events,
			socialChannels: originalFilters.social,
			kloutScores:    originalFilters.klout_scores,
			sentiments:     originalFilters.sentiments
		};
	}

	adjustEventBuckets (originalEventBuckets) {
		var result = { buckets: [] };
		originalEventBuckets.bucket.forEach(function (bucket) {
			result.buckets.push({
				bucketId:     bucket.id,
				bucketTime:   bucket.start_time,
				tweetsNumber: bucket.number_of_tweets
			});
		});
		return result;
	}

	adjustBucket (originalBucket) {
		var result = { tweets: [] };
		originalBucket.tweet_metadata.forEach(function (tweet) {
			result.tweets.push({
				tweetId:      tweet.tweet_id,
				lat:          tweet.latitude,
				lng:          tweet.longitude,
				email:        "",
				message:      tweet.tweet,
				username:     tweet.user,
				socialHandle: "@" + tweet.user,
				picUrl:       tweet.profile_image,
				mediaLink:    "",
				sentiment:    tweet.sentiment,
				follower:     "N",
				following:    "N",
				timeStamp:    tweet.time_stamp
			});
		});
		return result;
	}

}