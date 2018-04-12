import React from "react";

class NlwcButton extends React.Component {
  constructor() {
    super();
    this.clickWrapper = this.clickWrapper.bind(this);
  }

  clickWrapper() {
    this.props.move(this.props.id, "withClient", "available");
  }

  render() {
    return (
      <span style={this.props.style}>
        <button onClick={this.clickWrapper}>
          <strong>No Longer With Customer</strong>
        </button>
      </span>
    );
  }
}

export default NlwcButton;
