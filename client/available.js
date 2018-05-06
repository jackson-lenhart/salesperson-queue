import React from "react";

import Salesperson from "./salesperson";

class Available extends React.Component {
  render() {
    let available;
    this.props.available.length === 0 ?
      available = (
        <p>None available.</p>
      ) : available = this.props.available.map(x =>
        <div key={x.id} style={this.props.style.item}>
          <Salesperson
            key={x.id}
            id={x.id}
            name={x.name}
            moveSalesperson={this.props.moveSalesperson}
            removeSalesperson={this.props.removeSalesperson}
            moveToUnavailable={this.props.moveToUnavailable}
            handleInput={this.props.handleInput}
            from={"available"}
            to={"withClient"}
            msg={"Helped A Customer"}
          />
        </div>
      );

    return (
      <div style={this.props.style.table}>
        <h3 style={this.props.style.header}>Available</h3>
        {available}
      </div>
    );
  }
}

export default Available;
