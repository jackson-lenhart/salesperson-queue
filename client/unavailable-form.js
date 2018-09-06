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
    const {
      id,
      parent,
      moveToUnavailable,
      toggleUnavailableForm
    } = this.props;

    const { currReason } = this.state;

    moveToUnavailable(id, parent, currReason);
    toggleUnavailableForm();
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
