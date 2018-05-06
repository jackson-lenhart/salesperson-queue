import React from "react";

class AddCustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      salesperson: "",
      description: ""
    };

    this.handleInput = props.handleInput.bind(this);
    this.clickWrapper = this.clickWrapper.bind(this);
  }

  clickWrapper(e) {
    e.preventDefault();
    this.props.addCustomer(this.state);
    e.target.reset();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.clickWrapper}>
          <p>Name:</p>
          <input type="text" name="name" onChange={this.handleInput} />
          <p>Salesperson:</p>
          <input type="text" name="nalesperson" onChange={this.handleInput} />
          <p>Description:</p>
          <input type="text" name="description" onChange={this.handleInput} />
          <br/><br/>
          <button type="submit">
            <strong>Add Customer</strong>
          </button>
        </form>
      </div>
    );
  }
}

export default AddCustomerForm;
