import React from "react";

import DeleteButton from "./delete-button";
import HelpedButton from "./helped-button";
import NlwcButton from "./nlwc-button";

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

    let moveButton;
    switch(this.props.parent) {
      case "available":
        moveButton = (
          <HelpedButton
            move={this.props.move}
            id={this.props.id}
            style={style.button}
          />
        );
        break;
      case "withClient":
        moveButton = (
          <NlwcButton
            move={this.props.move}
            removeFromQueue={this.props.removeFromQueue}
            id={this.props.id}
            style={style.button}
          />
        );
        break;
      default:
        console.error("Invalid parent:", this.props.parent);
    }

    return (
      <div>
        <span style={style.name}>{this.props.name}</span>
        {moveButton}
        <DeleteButton
          removeFromQueue={this.props.removeFromQueue}
          name={this.props.name}
          id={this.props.id}
          style={style.button}
        />
      </div>
    );
  }
}

export default Salesperson;
