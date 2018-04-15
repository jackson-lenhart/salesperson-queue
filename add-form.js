import React from "react";

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currName: ""
    };

    this.clickWrapper = this.clickWrapper.bind(this);
    this.handleInput = props.handleInput.bind(this);
  }

  clickWrapper() {
    this.props.addToQueue(this.state.currName);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="currName"
          onChange={this.handleInput}
        />
        <button onClick={this.clickWrapper}>
          <strong>Add To Queue</strong>
        </button>
      </div>
    );
  }
}

export default AddForm;
