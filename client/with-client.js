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
            removeFromQueue={this.props.removeFromQueue}
            move={this.props.move}
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
        <h1>With Client</h1>
        {withClient}
      </div>
    );
  }
}

export default WithClient;
