import React from "react";

import Salesperson from "./salesperson";

class Queue extends React.Component {
  render() {
    let queue;
    this.props.queue.length === 0 ?
      queue = (
        <p>None in queue.</p>
      ) : queue = this.props.queue.map(x =>
        <Salesperson
          key={x.id}
          name={x.name}
          removeFromQueue={this.props.removeFromQueue}
        />
      );

    return (
      <div>
        {queue}
      </div>
    );
  }
}

export default Queue;
