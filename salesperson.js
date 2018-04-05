import React from "react";

import DeleteButton from "./delete-button";

class Salesperson extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <DeleteButton
          removeFromQueue={this.props.removeFromQueue}
          name={this.props.name}
        />
      </div>
    );
  }
}

export default Salesperson;
