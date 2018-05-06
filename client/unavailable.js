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
            moveSalesperson={this.props.moveSalesperson}
            removeSalesperson={this.props.removeSalesperson}
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
        <h3 style={this.props.style.header}>Unavailable</h3>
        {unavailable}
      </div>
    );
  }
}

export default Unavailable;
