import React from "react";

class AddInput extends React.Component {
  render() {
    return (
      <div>
        <input type="text" onChange={this.props.handleInput} />
      </div>
    );
  }
}

export default AddInput;
