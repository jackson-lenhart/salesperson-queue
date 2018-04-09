import React from "react";

import DeleteButton from "./delete-button";
import HelpedButton from "./helped-button";

class Salesperson extends React.Component {
  render() {
    const style = {
      name: {
        padding: "10px"
      },
      button: {
        padding: "5px"
      }
    };

    return (
      <div>
        <span style={style.name}>{this.props.name}</span>
        <HelpedButton
          move={this.props.move}
          id={this.props.id}
          style={style.button}
        />
        <DeleteButton
          removeFromQueue={this.props.removeFromQueue}
          name={this.props.name}
          style={style.button}
        />
      </div>
    );
  }
}

export default Salesperson;
