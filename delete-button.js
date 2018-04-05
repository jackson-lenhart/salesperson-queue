import React from "react";

class DeleteButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() =>
          this.props.removeFromQueue(this.props.name)
        }>Delete</button>
      </div>
    );
  }
}

export default DeleteButton;
