import React from "react";

import Salesperson from "./salesperson";

class WithClient extends React.Component {
  render() {
    const style = {
      item: {
        padding: "10px"
      },
      withClient: {
        padding: "20px"
      }
    };

    let withClient;
    this.props.withClient.length === 0 ?
      withClient = (
        <p>None with clients.</p>
      ) : withClient = this.props.withClient.map(x =>
        <div key={x.id} style={style.item}>
          <Salesperson
            key={x.id}
            id={x.id}
            name={x.name}
            removeFromQueue={this.props.removeFromQueue}
            move={this.props.move}
            parent={"withClient"}
          />
        </div>
      );

    return (
      <div style={style.withClient}>
        <h1>With Client</h1>
        {withClient}
      </div>
    );
  }
}

export default WithClient;
