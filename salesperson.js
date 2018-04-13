import React from "react";

import DeleteButton from "./delete-button";
import MoveButton from "./move-button";

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

    let markUnavailableButton = "";
    if (this.props.from === "available" || this.props.from === "withClient") {
      markUnavailableButton = (
        <MoveButton
          move={this.props.move}
          id={this.props.id}
          from={this.props.from}
          to={"unavailable"}
          msg={"Mark As Unavailable"}
          style={style.button}
        />
      );
    }

    return (
      <div>
        <span style={style.name}>{this.props.name}</span>
        <MoveButton
          move={this.props.move}
          id={this.props.id}
          from={this.props.from}
          to={this.props.to}
          msg={this.props.msg}
          style={style.button}
        />
        {markUnavailableButton}
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
