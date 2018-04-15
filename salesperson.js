import React from "react";

import DeleteButton from "./delete-button";
import MoveButton from "./move-button";
import UnavailableButton from "./unavailable-button";
import UnavailableForm from "./unavailable-form";

class Salesperson extends React.Component {
  constructor() {
    super();
    this.state = {
      unavailableFormMounted: false
    };

    this.toggleUnavailableForm = this.toggleUnavailableForm.bind(this);
  }

  toggleUnavailableForm() {
    this.setState({
      unavailableFormMounted: !this.state.unavailableFormMounted
    });
  }

  render() {
    const style = {
      name: {
        padding: "10px"
      },
      button: {
        padding: "5px"
      },
      reason: {
        color: "red"
      }
    };

    let unavailableButton = "";
    let unavailableForm = "";
    if (this.props.from === "available" || this.props.from === "withClient") {
      unavailableButton = (
        <UnavailableButton
          toggleUnavailableForm={this.toggleUnavailableForm}
          style={style.button}
        />
      );

      if (this.state.unavailableFormMounted) {
        unavailableForm = (
          <UnavailableForm
            id={this.props.id}
            moveToUnavailable={this.props.moveToUnavailable}
            from={this.props.from}
            currUnavailableReason={this.props.currUnavailableReason}
            toggleUnavailableForm={this.toggleUnavailableForm}
            handleInput={this.props.handleInput}
          />
        );
      }
    }

    let unavailableReason = "";
    if (this.props.from === "unavailable") {
      unavailableReason = (
        <p style={style.reason}>{this.props.unavailableReason}</p>
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
        {unavailableButton}
        <DeleteButton
          removeFromQueue={this.props.removeFromQueue}
          name={this.props.name}
          id={this.props.id}
          style={style.button}
        />
        {unavailableForm}
        {unavailableReason}
      </div>
    );
  }
}

export default Salesperson;
