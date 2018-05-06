import React from "react";

import Customer from "./customer";

class Waiting extends React.Component {
  render() {
    let waiting;
    this.props.waiting.length === 0 ?
      waiting = (
        <p>None waiting.</p>
      ) : waiting = this.props.waiting.map(x =>
        <Customer
          key={x.id}
          id={x.id}
          name={x.name}
          salesperson={x.salesperson}
          description={x.description}
        />
      );

    return (
      <div>
        <h3 style={this.props.style.header}>Waiting</h3>
        {waiting}
      </div>
    );
  }
}

export default Waiting;
