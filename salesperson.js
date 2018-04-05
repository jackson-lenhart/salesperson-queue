import React from "react";

import DeleteButton from "./delete-button";

class Salesperson extends React.Component {
  render() {
    const style = {
      name: {
        padding: "10px"
      }
    };

    return (
      <div>
        <span style={style.name}>{this.props.name}</span>
        <DeleteButton
          removeFromQueue={this.props.removeFromQueue}
          name={this.props.name}
        />
      </div>
    );
  }
}

export default Salesperson;
