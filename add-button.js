import React from "react";

class AddButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.addToQueue}>
          <strong>Add To Queue</strong>
        </button>
      </div>
    );
  }
}

export default AddButton;
