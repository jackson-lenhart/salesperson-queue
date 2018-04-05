import React from "react";

import Salesperson from "./salesperson";

class Queue extends React.Component {
  render() {
    const style = {
      item: {
        padding: "10px"
      },
      queue: {
        padding: "20px"
      }
    };

    let queue;
    this.props.queue.length === 0 ?
      queue = (
        <p>None in queue.</p>
      ) : queue = this.props.queue.map(x =>
        <div key={x.id} style={style.item}>
          <Salesperson
            key={x.id}
            id={x.id}
            name={x.name}
            removeFromQueue={this.props.removeFromQueue}
            moveToBottom={this.props.moveToBottom}
          />
        </div>
      );

    return (
      <div style={style.queue}>
        {queue}
      </div>
    );
  }
}

export default Queue;
