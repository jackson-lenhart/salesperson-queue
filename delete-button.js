import React from "react";

class DeleteButton extends React.Component {
  render() {
    return (
      <span>
        <button onClick={() =>
          this.props.removeFromQueue(this.props.name)
        }>Delete</button>
      </span>
    );
  }
}

export default DeleteButton;
