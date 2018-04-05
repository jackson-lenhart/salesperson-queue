import React from "react";

import DeleteButton from "./delete-button";
import HelpedButton from "./helped-button";

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
        <HelpedButton
          moveToBottom={this.props.moveToBottom}
          id={this.props.id}
        />
        <DeleteButton
          removeFromQueue={this.props.removeFromQueue}
          name={this.props.name}
        />
      </div>
    );
  }
}

export default Salesperson;
