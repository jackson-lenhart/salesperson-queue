import React from "react";

class UnavailableButton extends React.Component {
  constructor() {
    super();
    this.clickWrapper = this.clickWrapper.bind(this);
  }

  clickWrapper() {
    this.props.toggleUnavailableForm();
  }

  render() {
    return (
      <span style={this.props.style}>
        <button onClick={this.clickWrapper}>
          Mark As Unavailable
        </button>
      </span>
    );
  }
}

export default UnavailableButton;
