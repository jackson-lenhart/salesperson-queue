import React from "react";
import { render } from "react-dom";
import shortid from "shortid";

import AddForm from "./add-form";
import Queue from "./queue";
import WithClient from "./with-client";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      queue: [],
      withClient: [],
      unavailable: [],
      currName: ""
    };

    this.addToQueue = this.addToQueue.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.move = this.move.bind(this);
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

  move(id, from, to) {
    let salespersonToMove = this.state[from].find(x => x.id === id);
    this.setState({
      [from]: this.state[from].filter(x => x.id !== id),
      [to]: this.state[to].concat(salespersonToMove)
    });
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
          move={this.move}
          removeFromQueue={this.removeFromQueue}
        />
        <WithClient
          withClient={this.state.withClient}
          move={this.move}
          removeFromQueue={this.removeFromQueue}
        />
      </div>
    );
  }
}

render(
  <Main />,
  document.body
);
