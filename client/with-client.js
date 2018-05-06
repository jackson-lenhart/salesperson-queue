import React from "react";

import Salesperson from "./salesperson";

class WithClient extends React.Component {
  render() {
    let withClient;
    this.props.withClient.length === 0 ?
      withClient = (
        <p>None with clients.</p>
      ) : withClient = this.props.withClient.map(x =>
        <div key={x.id} style={this.props.style.item}>
          <Salesperson
            key={x.id}
            id={x.id}
            name={x.name}
            removeSalesperson={this.props.removeFromQueue}
            moveSalesperson={this.props.moveSalesperson}
            moveToUnavailable={this.props.moveToUnavailable}
            mountUnavailableForm={this.props.mountUnavailableForm}
            unavailableFormMounted={this.props.unavailableFormMounted}
            currUnavailableReason={this.props.currUnavailableReason}
            handleInput={this.props.handleInput}
            from={"withClient"}
            to={"available"}
            msg={"No Longer With Customer"}
          />
        </div>
      );

    return (
      <div style={this.props.style.table}>
        <h3 style={this.props.style.header}>With Client</h3>
        {withClient}
      </div>
    );
  }
}

export default WithClient;
