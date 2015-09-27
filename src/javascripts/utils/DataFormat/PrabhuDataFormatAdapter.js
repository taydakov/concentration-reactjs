/*
 * Adapter to convert Prabhu's data format to app's interval one
 */

import PassThroughDataFormatAdapter from "./PassThroughDataFormatAdapter";

export default class PrabhuDataFormatAdapter extends PassThroughDataFormatAdapter {

	adjustFilters (originalFilters) {
		console.log("PrabhuDataFormatAdapter.adjustFilters originalFilters=", originalFilters);

		var events      = [];
		var kloutScores = [];

		/* Assemble events */
		originalFilters.events.forEach(function (event) {
			events.push({
				id:        event.id,
				teamAway:  event.away_team,
				teamHome:  event.home_team,
				startTime: event.startTime,
				endTime:   event.endTime
			});
		});

		/* Assemble klout scores */
		originalFilters.klout_scores.forEach(function (kloutScore) {
			kloutScores.push({
				id:      kloutScore.id,
				caption: kloutScore.min_score + " - " + kloutScore.max_score
			});
		});

		return {
			events:         events,
			socialChannels: originalFilters.social,
			kloutScores:    kloutScores,
			sentiments:     originalFilters.sentiments
		};
	}

	adjustEventBuckets (originalEventBuckets) {
		var result = { buckets: [] };
		originalEventBuckets.bucket.forEach(function (bucket) {
			result.buckets.push({
				bucketId:     bucket.id,
				startTime:    bucket.start_time,
				endTime:      bucket.end_time,
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