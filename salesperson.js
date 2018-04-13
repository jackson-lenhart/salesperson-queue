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
