import React from "react";

class DeleteButton extends React.Component {
  constructor() {
    super();
    this.clickWrapper = this.clickWrapper.bind(this);
  }

  clickWrapper() {
    this.props.toggleDeleteForm();
  }

  render() {
    return (
      <span style={this.props.style}>
        <button onClick={this.clickWrapper}>Delete</button>
      </span>
    );
  }
}

export default DeleteButton;
