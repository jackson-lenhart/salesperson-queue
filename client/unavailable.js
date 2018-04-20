import React from "react";

import Salesperson from "./salesperson";

class Unavailable extends React.Component {
  render() {
    let unavailable;
    this.props.unavailable.length === 0 ?
      unavailable = (
        <p>None unavailable.</p>
      ) : unavailable = this.props.unavailable.map(x =>
        <div key={x.id} style={this.props.style.item}>
          <Salesperson
            key={x.id}
            id={x.id}
            name={x.name}
            move={this.props.move}
            removeFromQueue={this.props.removeFromQueue}
            handleInput={this.props.handleInput}
            unavailableReason={x.reason}
            from={"unavailable"}
            to={"available"}
            msg={"Mark As Available"}
          />
        </div>
      );

    return (
      <div style={this.props.style.table}>
        <h1>Unavailable</h1>
        {unavailable}
      </div>
    );
  }
}

export default Unavailable;
