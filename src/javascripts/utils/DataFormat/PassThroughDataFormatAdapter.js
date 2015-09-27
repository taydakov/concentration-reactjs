/*
 * Adapter that does not do any conversions in fact
 */

export default class PassThroughDataFormatAdapter {

	adjustFilters (originalFilters) {
		return originalFilters;
	}

	adjustEventBuckets (originalEventBuckets) {
		return originalEventBuckets;
	}

	adjustBucket (originalBucket) {
		return originalBucket;
	}

}