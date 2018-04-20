import React from "react";

class UnavailableForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currReason: ""
    };

    this.clickWrapper = this.clickWrapper.bind(this);
    this.handleInput = props.handleInput.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  clickWrapper() {
    this.props.moveToUnavailable(this.props.id, this.props.from, this.state.currReason);
    this.props.toggleUnavailableForm();
  }

  cancel() {
    this.props.toggleUnavailableForm();
  }

  render() {
    return (
      <div>
        <p>Reason for Unavailability:</p>
        <input
          type="text"
          name="currReason"
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
