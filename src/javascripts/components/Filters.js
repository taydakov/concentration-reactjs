/* Static dependencies */

/* JS dependencies */
import React from "react";
import _ from "lodash";
import FiltersActionCreators from "../actions/FiltersActionCreators";

export default class Filters extends React.Component {

	constructor (...args) {
		super(...args);

		this.state = {
			selected: {}
		}
	}

	render () {
		if (this.props.filters.isLoading) {

			return (
				<div>
					{/* Loading bar */}
					<div className="event_sec" id="container2">
						<img src="http://sierrafire.cr.usgs.gov/images/loading.gif" />
					</div>
				</div>
			);

		} else {

			var self = this;

			/* Assemble functions (see below) will fill this variables */
			var currSocialChannelNumber = null;
			var currKloutScoreNumber    = null;
			var currSentimentNumber     = null;

			var events         = assembleEventOptions();
			var socialChannels = assembleSocialChannelRadios();
			var kloutScores    = assembleKloutScoreRadios();
			var sentiments     = assembleSentimentRadios();

			return (
				<div>
					{/* Event Sec */}
					<div className="event_sec" id="container2">
						{/* Event Select */}
						<div className="event_select">
							<div className="select-field">
								{/* React approach to change state on onChange event is not applicable cause onChange does not work here */}
								<select className="selectpicker">
									{events}
								</select>
							</div>
						</div>
						{/* Filter */}
						<div className="filter">
							{/* Collapse */}
							<div className="collapse_sec">
								<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
									
									<div className="panel panel-default">
										<div className="panel-heading" role="tab" id="headingOne">
											<h4 className="panel-title"> <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> Social Channel <span>({ this.props.filters.socialChannels[currSocialChannelNumber].caption })</span> </a> </h4>
										</div>
										<div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
											<div className="panel-body">
												<div className="check_detail">
													{socialChannels}
												</div>
											</div>
										</div>
									</div>
									<div className="panel panel-default">
										<div className="panel-heading" role="tab" id="headingTwo">
											<h4 className="panel-title">
												<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
													Klout Score <span>({ this.props.filters.kloutScores[currKloutScoreNumber].caption })</span>
												</a>
											</h4>
										</div>
										<div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
											<div className="panel-body">
												<div className="check_detail">
													{ kloutScores }
												</div>
											</div>
										</div>
									</div>
									<div className="panel panel-default">
										<div className="panel-heading" role="tab" id="headingfour">
											<h4 className="panel-title"> <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsefour" aria-expanded="false" aria-controls="collapsefour"> Sentiment <span>({ this.props.filters.sentiments[currSentimentNumber].caption })</span> </a> </h4>
										</div>
										<div id="collapsefour" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingfour">
											<div className="panel-body">
												<div className="check_detail">
													{ sentiments }
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);

			function assembleEventOptions () {
				var events = [];
				if (self.props.filters.events) {
					self.props.filters.events.forEach(function (event, index) {
						events.push(
							<option value={ event.id } key={index}>{event.teamHome + " vs " + event.teamAway}</option>
						);
					});
				}
				return events;
			}

			function assembleSocialChannelRadios () {
				var socialChannels = [];
				if (self.props.filters.socialChannels) {
					self.props.filters.socialChannels.forEach(function (socialChannel, index) {
						var checked = false;
						if (socialChannel.id === self.state.selected.socialChannelId) {
							currSocialChannelNumber = index;
							checked = true;
						}
						socialChannels.push(
							<label key={index}>
								<input type="radio" checked={ checked } name="socialChannel" data-id={ socialChannel.id } onClick={self.handleFilterChange.bind(self)} />
								<span className="lbl">{ socialChannel.caption }</span>
							</label>
						);
					});
				}
				return socialChannels;
			}

			function assembleKloutScoreRadios () {
				var kloutScores = [];
				if (self.props.filters.kloutScores) {
					self.props.filters.kloutScores.forEach(function (kloutScore, index) {
						var checked = false;
						if (kloutScore.id === self.state.selected.kloutScoreId) {
							currKloutScoreNumber = index;
							checked = true;
						}
						kloutScores.push(
							<label key={index}>
								<input type="radio" checked={ checked } name="kloutScore" data-id={ kloutScore.id } onClick={self.handleFilterChange.bind(self)} />
								<span className="lbl">{ kloutScore.caption }</span>
							</label>
						);
					});
				}
				return kloutScores;
			}

			function assembleSentimentRadios () {
				var sentiments = [];
				if (self.props.filters.sentiments) {
					self.props.filters.sentiments.forEach(function (sentiment, index) {
						var checked = false;
						if (sentiment.id === self.state.selected.sentimentId) {
							currSentimentNumber = index;
							checked = true;
						}
						sentiments.push(
							<label key={index}>
								<input type="radio" checked={ checked } name="sentiment" data-id={ sentiment.id } onClick={self.handleFilterChange.bind(self)} />
								<span className="lbl">{ sentiment.caption }</span>
							</label>
						);
					});
				}
				return sentiments;
			}
		}
	}

	componentWillMount () {
		/* React approach to change state on onChange event is not applicable cause onChange does not work for Bootstrap Selectpicker */
		window.eventFilterChangeHandler = this.handleEventChange.bind(this);
	}

	componentWillReceiveProps (nextProps) {
		console.log("Filters.componentWillReceiveProps nextProps = ", nextProps);

		this.state.selected = nextProps.filters.selected;
	}

	/* Event Handlers */

	handleEventChange (selectedEventId) {
		console.log("Filters.handleEventChange selectedEventId = ", selectedEventId);
		this.state.selected.eventId = selectedEventId;
		this.handleFilterChange.bind(this)();
	}

	handleFilterChange () {
		var socialChannels = document.getElementsByName("socialChannel");
		var kloutScores    = document.getElementsByName("kloutScore");
		var sentiments     = document.getElementsByName("sentiment");

		/* Get selected filters ids */
		var currSocialChannelId = parseInt(FindSelectedRadioElement(socialChannels).dataset.id);
		var currKloutScoreId    = parseInt(FindSelectedRadioElement(kloutScores).dataset.id);
		var currSentimentId     = parseInt(FindSelectedRadioElement(sentiments).dataset.id);

		console.log("Filters.handleFilterChange currSocialChannelId=", currSocialChannelId,
					", currKloutScoreId=", currKloutScoreId,
					", currSentimentId=", currSentimentId);

		var selectedFilters = {
			eventId:         this.state.selected.eventId,
			socialChannelId: currSocialChannelId,
			kloutScoreId:    currKloutScoreId,
			sentimentId:     currSentimentId
		};

		if (this.props.onFilterClick) {
			this.props.onFilterClick(selectedFilters);
		} else {
			this.setState({
				selected: selectedFilters
			});
		}

		function FindSelectedRadioElement (radioGroupNodeList) {
			for (var i = 0; i < radioGroupNodeList.length; i++) {
				if (radioGroupNodeList[i].checked) {
					return radioGroupNodeList[i];
				}
			}
			return null;
		}
	}
}

Filters.propTypes = {
	filters:       React.PropTypes.object.isRequired,
	onFilterClick: React.PropTypes.func
};