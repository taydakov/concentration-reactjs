/* Static dependencies */
import "../../stylesheets/components/dialogbox.scss";

/* JS dependencies */
import React from "react";

export default class DialogBox extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			message: ""
		};
	}

	render () {
		var inputElement      = null;
		var additionalClasses = "";
		var content           = null;

		if (this.props.isInput) {
			var maxlength = "";
			if (this.props.isLimitedInput) {
				maxlength = "140";
			}
			inputElement = <input 
								type="text"
								name=""
								className="input_field"
								value={ this.state.message }
								onChange={ this.handleMessageChange.bind(this) }
								maxLength={ maxlength } />;
		}

		if (this.props.isBig) {
			additionalClasses = "big_popup";
			content =
				<div className="wrapper">
					{ this.props.children }
				</div>
		} else {
			content = 
				<div className="entry_popup">
					{ this.props.children }
					{ inputElement }
					<div className="button_block">
						<button className="direct_msg" onClick={ this.handleClick.bind(this) }>{ this.props.actionName }</button>
						<button className="cancel_btn" data-dismiss="modal">Cancel</button>
					</div>
				</div>
		}

		return (
			<div className={ "modal fade custommodal " + additionalClasses } 
				 id={ this.props.id }
				 tabindex="-1" 
				 role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-body">
							{ content }
						</div>
					</div>
				</div>
			</div>
		);
	}

	handleMessageChange (e) {
		this.setState({
			message: e.target.value
		});
	}

	handleClick (e) {
		console.log("DialogBox.handleClick state.message = ", this.state.message);
		if (!this.props.isInput || this.state.message !== "") {
			$("#" + this.props.id).modal("hide");
			if (this.props.onAction) {
				this.props.onAction(this.state.message, this.props.tag);
			}
			this.setState({
				message: ""
			});
		}
	}
}

DialogBox.propTypes = {
	id:         React.PropTypes.string.isRequired,
	tag:        React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]),
	actionName:     React.PropTypes.string,
	isInput:        React.PropTypes.bool,
	isLimitedInput: React.PropTypes.bool,
	isBig:          React.PropTypes.bool,
	onAction:       React.PropTypes.func,
}