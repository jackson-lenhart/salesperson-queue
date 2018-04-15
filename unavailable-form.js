import React from "react";

class UnavailableForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currUnavailableReason: ""
    };

    this.clickWrapper = this.clickWrapper.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  clickWrapper() {
    this.props.moveToUnavailable(this.props.id, this.props.from, this.state.currUnavailableReason);
    this.props.toggleUnavailableForm();
  }

  cancel() {
    this.props.toggleUnavailableForm();
  }

  handleInput(event) {
    this.setState({
      currUnavailableReason: event.target.value
    });
  }

  render() {
    return (
      <div>
        <p>Reason for Unavailability:</p>
        <input
          type="text"
          onChange={this.handleInput}
        />
        <button onClick={this.clickWrapper}>
          <strong>OK</strong>
        </button>
        <button onClick={this.cancel}>Cancel</button>
      </div>
    );
  }
}

export default UnavailableForm
