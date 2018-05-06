import React from "react";

class Customer extends React.Component {
  render() {
    return (
      <div>
        <span>{this.props.name}</span>
      </div>
    );
  }
}

export default Customer;
