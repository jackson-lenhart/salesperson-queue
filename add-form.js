import React from "react";

class AddForm extends React.Component {
  constructor() {
    super();
    this.clickWrapper = this.clickWrapper.bind(this);
  }

  clickWrapper() {
    this.props.addToQueue(this.props.currName);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.props.handleInput}
        />
        <button onClick={this.clickWrapper}>
          <strong>Add To Queue</strong>
        </button>
      </div>
    );
  }
}

export default AddForm;
