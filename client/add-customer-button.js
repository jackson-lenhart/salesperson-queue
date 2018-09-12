import React from "react";

class AddCustomerButton extends React.Component {
  render() {
    const { style } = this.props

    return (
      <div>
        <button type="button" style={style.button} onClick={this.props.toggleCustomerForm}>
          <strong>Add Customer</strong>
        </button>
      </div>
    );
  }
}

export default AddCustomerButton;
