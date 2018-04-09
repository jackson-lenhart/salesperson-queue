import React from "react";

class HelpedButton extends React.Component {
  constructor() {
    super();
    this.clickWrapper = this.clickWrapper.bind(this);
  }

  clickWrapper() {
    this.props.move(this.props.id, "queue", "withClient");
  }

  render() {
    return (
      <span style={this.props.style}>
        <button onClick={this.clickWrapper}>
          <strong>Helped A Customer</strong>
        </button>
      </span>
    );
  }
}

export default HelpedButton;
