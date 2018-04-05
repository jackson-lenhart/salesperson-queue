import React from "react";
import { render } from "react-dom";
import shortid from "shortid";

import AddForm from "./add-form";
import Queue from "./queue";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      queue: [],
      currName: ""
    };

    this.addToQueue = this.addToQueue.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.moveToBottom = this.moveToBottom.bind(this);
  }

  addToQueue(name) {
    this.setState({
      queue: this.state.queue.concat({
        name: name,
        id: shortid.generate()
      })
    });
  }

  removeFromQueue(name) {
    this.setState({
      queue: this.state.queue.filter(x =>
        x.name !== name
      )
    });
  }

  moveToBottom(id) {
    let salespersonToMove = this.state.queue.filter(x =>
      x.id === id
    )[0];
    let queue = this.state.queue.filter(x =>
      x.id !== id
    );
    queue.push(salespersonToMove);
    this.setState({ queue });
  }

  handleInput(event) {
    this.setState({
      currName: event.target.value
    });
  }

  render() {
    return (
      <div>
        <AddForm
          addToQueue={this.addToQueue}
          handleInput={this.handleInput}
          currName={this.state.currName}
        />
        <Queue
          queue={this.state.queue}
          removeFromQueue={this.removeFromQueue}
          moveToBottom={this.moveToBottom}
        />
      </div>
    );
  }
}

render(
  <Main />,
  document.body
);
