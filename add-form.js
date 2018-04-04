import React from "react";

import AddInput from "./add-input";
import AddButton from "./add-button";

class AddForm extends React.Component {
  render() {
    return (
      <div>
        <AddInput handleInput={this.props.handleInput} />
        <AddButton addToQueue={this.props.addToQueue} />
      </div>
    );
  }
}

export default AddForm;
