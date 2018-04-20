import React from "react";

class MoveButton extends React.Component {
  constructor() {
    super();
    this.clickWrapper = this.clickWrapper.bind(this);
  }

  clickWrapper() {
    this.props.move(this.props.id, this.props.from, this.props.to);
  }

  render() {
    return (
      <span style={this.props.style}>
        <button onClick={this.clickWrapper}>
          <strong>{this.props.msg}</strong>
        </button>
      </span>
    );
  }
}

export default MoveButton;
