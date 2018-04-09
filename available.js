import React from "react";

import Salesperson from "./salesperson";

class Available extends React.Component {
  render() {
    const style = {
      item: {
        padding: "10px"
      },
      available: {
        padding: "20px"
      }
    };

    let available;
    this.props.available.length === 0 ?
      available = (
        <p>None available.</p>
      ) : available = this.props.available.map(x =>
        <div key={x.id} style={style.item}>
          <Salesperson
            key={x.id}
            id={x.id}
            name={x.name}
            move={this.props.move}
            removeFromQueue={this.props.removeFromQueue}
          />
        </div>
      );

    return (
      <div style={style.available}>
        <h1>Available</h1>
        {available}
      </div>
    );
  }
}

export default Available;
