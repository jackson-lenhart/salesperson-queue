import React from "react";

class AddSalespersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currName: ""
    };

    this.clickWrapper = this.clickWrapper.bind(this);
    this.handleInput = props.handleInput.bind(this);
  }

  clickWrapper() {
    this.props.addSalesperson(this.state.currName);
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
          <strong>Add Salesperson</strong>
        </button>
      </div>
    );
  }
}

export default AddSalespersonForm;
