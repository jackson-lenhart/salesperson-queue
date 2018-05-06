import React from "react";

class AddCustomerButton extends React.Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.toggleCustomerForm}>
          <strong>Add Customer</strong>
        </button>
      </div>
    );
  }
}

export default AddCustomerButton;
